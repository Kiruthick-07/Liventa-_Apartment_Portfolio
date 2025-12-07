const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.AUTH_PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✓ MongoDB connected successfully"))
    .catch((err) => console.error("✗ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    try {
        // bcryptjs hash with salt rounds
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        console.error("Password hashing error:", error);
        throw error;
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

// ==================== ROUTES ====================

// Health Check
app.get("/", (req, res) => {
    res.json({ message: "Liventa Authentication API is running" });
});

// Sign Up Route
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        res.status(500).json({
            success: false,
            message: "Error creating account",
            error: error.message,
        });
    }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message,
        });
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token required",
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
        req.user = user;
        next();
    });
};

// Get User Profile (Protected Route)
app.get("/api/auth/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message,
        });
    }
});

// Logout Route (Client-side token removal)
app.post("/api/auth/logout", (req, res) => {
    res.json({
        success: true,
        message: "Logged out successfully",
    });
});

// Contact Form Route
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
                        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #1a1a1a; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
                        This email was sent from the Liventa contact form.
                    </p>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Contact form email sent successfully to:", process.env.EMAIL_TO);

        res.json({
            success: true,
            message: "Your message has been sent successfully! We'll get back to you soon.",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
            error: error.message,
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Authentication server listening on port ${PORT}`);
});
