const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("../"));

// Log environment variables (without exposing secrets)
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? "✓ Loaded" : "✗ Missing");
console.log("Razorpay Secret Key:", process.env.RAZORPAY_SECRET_KEY ? "✓ Loaded" : "✗ Missing");

app.post("/order", async (req, res) => {
    try {
        console.log("Received order request:", req.body);

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const { amount, currency, receipt } = req.body;

        // Validate amount
        if (!amount || amount <= 0) {
            console.error("Invalid amount:", amount);
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        console.log("Creating order with options:", options);

        const order = await razorpay.orders.create(options);

        console.log("Order created successfully:", order.id);

        if (!order) {
            return res.status(500).json({ error: "Error creating order" });
        }

        res.json(order);
    } catch (err) {
        console.error("Razorpay Error Details:", {
            message: err.message,
            description: err.description,
            statusCode: err.statusCode,
            error: err.error,
        });
        res.status(500).json({
            error: "Error creating payment order",
            message: err.message,
            description: err.description
        });
    }
});

app.listen(PORT, () => {
    console.log("Payment gateway server listening on port", PORT);
});