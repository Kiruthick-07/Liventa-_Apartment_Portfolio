// Property data
const properties = [
    {
        title: "Penthouse - Tower A",
        description:
            "Experience comfortable city living in this stylish penthouse, offering essential luxury and stunning views.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
        price: "₹45,000/month",
        priceValue: 45000, // Monthly rent in rupees
    },
    {
        title: "Penthouse - Tower B",
        description:
            "Indulge in minimalist elegance within this expansive penthouse, featuring modern amenities and a seamless open-plan design.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
        price: "₹50,000/month",
        priceValue: 50000,
    },
    {
        title: "Penthouse - Tower C",
        description:
            "Discover unparalleled luxury in this sophisticated penthouse, boasting premium smart home technology, high-end finishes, and breathtaking panoramic vistas.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
        price: "₹55,000/month",
        priceValue: 55000,
    },
]

// Offers data
const offers = [
    {
        title: "1 Bedroom - Tower A",
        description: "Enjoy a stylish and comfortable living space with essential amenities and a pleasant view of Kediri.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
        price: "₹12,000/month",
        originalPrice: "₹15,000/month",
        priceValue: 12000,
    },
    {
        title: "1 Bedroom - Tower B",
        description:
            "Experience modern living in this well-appointed apartment, featuring elegant finishes and a touch of luxury.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80",
        price: "₹16,000/month",
        originalPrice: "₹20,000/month",
        priceValue: 16000,
    },
    {
        title: "1 Bedroom - Tower C",
        description:
            "Indulge in upscale urban living within this sophisticated apartment, offering premium comfort and exclusive features.",
        discount: "10% Discount",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
        price: "₹18,000/month",
        originalPrice: "₹20,000/month",
        priceValue: 18000,
    },
    {
        title: "2 Bedroom - Tower A",
        description: "Enjoy a stylish and comfortable living space with essential amenities and a pleasant view of Kediri.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
        price: "₹20,000/month",
        originalPrice: "₹25,000/month",
        priceValue: 20000,
    },
    {
        title: "2 Bedroom - Tower B",
        description:
            "Experience modern living in this well-appointed apartment, featuring elegant finishes and a touch of luxury.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
        price: "₹24,000/month",
        originalPrice: "₹30,000/month",
        priceValue: 24000,
    },
    {
        title: "2 Bedroom - Tower C",
        description:
            "Indulge in upscale urban living within this sophisticated apartment, offering premium comfort and exclusive features.",
        discount: "10% Discount",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80",
        price: "₹27,000/month",
        originalPrice: "₹30,000/month",
        priceValue: 27000,
    },
]

// DOM Elements
const propertyGrid = document.getElementById("propertyGrid")
const offersGrid = document.getElementById("offersGrid")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const mobileNavOverlay = document.getElementById("mobileNavOverlay")
const header = document.querySelector("header")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

// Render property cards
function renderProperties() {
    if (!propertyGrid) return

    propertyGrid.innerHTML = properties
        .map(
            (property, index) => `
    <div class="property-card">
      <img src="${property.image}" alt="${property.title}" loading="lazy">
      <div class="details-btn">Details</div>
      <div class="property-info">
        <div class="property-text">
          <h3>${property.title}</h3>
          <p>${property.description}</p>
        </div>
        <div class="property-actions">
          <div class="property-price">${property.price}</div>
          <button class="btn-buy-now" data-type="property" data-index="${index}" data-title="${property.title}" data-price="${property.priceValue}" data-display-price="${property.price}">Buy Now</button>
        </div>
      </div>
    </div>
  `,
        )
        .join("")

    // Add event listeners to Buy Now buttons
    attachBuyNowListeners()
}

// Render offer cards
function renderOffers() {
    if (!offersGrid) return

    offersGrid.innerHTML = offers
        .map(
            (offer, index) => `
    <div class="offer-card">
      <img src="${offer.image}" alt="${offer.title}" loading="lazy">
      <div class="discount-badge">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
        ${offer.discount}
      </div>
      <div class="offer-info">
        <div class="offer-text">
          <h3>${offer.title}</h3>
          <p>${offer.description}</p>
        </div>
        <div class="offer-actions">
          <div class="offer-pricing">
            <div class="offer-price">${offer.price}</div>
            <div class="offer-original-price">${offer.originalPrice}</div>
          </div>
          <button class="btn-buy-now" data-type="offer" data-index="${index}" data-title="${offer.title}" data-price="${offer.priceValue}" data-display-price="${offer.price}">Buy Now</button>
        </div>
      </div>
    </div>
  `,
        )
        .join("")

    // Add event listeners to Buy Now buttons
    attachBuyNowListeners()
}

// Scroll properties carousel
function scrollProperties(direction) {
    if (!propertyGrid) return

    const scrollAmount = 350
    if (direction === "left") {
        propertyGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
        propertyGrid.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
    mobileNavOverlay.classList.toggle("active")
    document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : ""
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenuBtn.classList.remove("active")
    mobileNav.classList.remove("active")
    mobileNavOverlay.classList.remove("active")
    document.body.style.overflow = ""
}

// Header scroll effect
function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add("scrolled")
    } else {
        header.classList.remove("scrolled")
    }
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href")
            if (href === "#") return

            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                closeMobileMenu()
                target.scrollIntoView({ behavior: "smooth" })
            }
        })
    })
}

// Event Listeners
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMobileMenu)
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => scrollProperties("left"))
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => scrollProperties("right"))
}

window.addEventListener("scroll", handleScroll)

// Close mobile menu on window resize (if switching to desktop)
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMobileMenu()
    }
})

// Payment Gateway Integration
const RAZORPAY_KEY_ID = "rzp_test_RMKz5sso9Q16ay" // Your Razorpay Key ID

// Attach event listeners to Buy Now buttons
function attachBuyNowListeners() {
    const buyNowButtons = document.querySelectorAll(".btn-buy-now")
    buyNowButtons.forEach((button) => {
        button.addEventListener("click", handleBuyNow)
    })
}

// Handle Buy Now button click
async function handleBuyNow(e) {
    const button = e.target
    const title = button.getAttribute("data-title")
    const price = parseInt(button.getAttribute("data-price"))
    const displayPrice = button.getAttribute("data-display-price")

    // Show loading state
    button.disabled = true
    button.textContent = "Processing..."

    try {
        // Create order on backend
        const order = await createOrder(price, title)

        // Initialize Razorpay payment
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Liventa Residence",
            description: `Purchase of ${title}`,
            order_id: order.id,
            handler: function (response) {
                handlePaymentSuccess(response, title, displayPrice)
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            theme: {
                color: "#1a1a1a",
            },
            modal: {
                ondismiss: function () {
                    button.disabled = false
                    button.textContent = "Buy Now"
                },
            },
        }

        const razorpay = new Razorpay(options)
        razorpay.on("payment.failed", function (response) {
            handlePaymentFailure(response)
            button.disabled = false
            button.textContent = "Buy Now"
        })

        razorpay.open()
    } catch (error) {
        console.error("Error initiating payment:", error)
        alert("Failed to initiate payment. Please try again.")
        button.disabled = false
        button.textContent = "Buy Now"
    }
}

// Create order on backend
async function createOrder(amount, description) {
    try {
        const response = await fetch("http://localhost:5000/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            }),
        })

        if (!response.ok) {
            throw new Error("Failed to create order")
        }

        const order = await response.json()
        return order
    } catch (error) {
        console.error("Error creating order:", error)
        throw error
    }
}

// Handle successful payment
function handlePaymentSuccess(response, title, price) {
    console.log("Payment successful:", response)
    alert(
        `Payment Successful!\n\nProperty: ${title}\nMonthly Rent: ${price}\n\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your payment! Your rental booking has been confirmed.`
    )
    // You can add additional logic here, such as:
    // - Sending confirmation email
    // - Updating database
    // - Redirecting to booking confirmation page
}

// Handle failed payment
function handlePaymentFailure(response) {
    console.error("Payment failed:", response)
    alert(
        `Payment Failed!\n\nReason: ${response.error.description}\n\nPlease try again or contact support.`
    )
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    console.log("Contact form submitted:", data)

    // Show success message
    alert(
        `Thank you for contacting us!\n\nWe have received your message and will get back to you shortly.\n\nName: ${data.name}\nEmail: ${data.email}`
    )

    // Reset form
    form.reset()

    // Here you can add logic to send the form data to your backend
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
}

// Authentication Functions
function checkAuthState() {
    const token = localStorage.getItem('liventaToken') || sessionStorage.getItem('liventaToken');
    const userStr = localStorage.getItem('liventaUser') || sessionStorage.getItem('liventaUser');

    // Desktop elements
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    // Mobile elements
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileUserMenu = document.getElementById('mobileUserMenu');
    const mobileUserName = document.getElementById('mobileUserName');

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            const fullName = `${user.firstName} ${user.lastName}`;

            // User is logged in - Desktop
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = fullName;

            // User is logged in - Mobile
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (mobileUserMenu) mobileUserMenu.style.display = 'flex';
            if (mobileUserName) mobileUserName.textContent = fullName;
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Clear invalid data
            clearAuthData();
        }
    } else {
        // User is not logged in - Desktop
        if (loginBtn) loginBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';

        // User is not logged in - Mobile
        if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
        if (mobileUserMenu) mobileUserMenu.style.display = 'none';
    }
}

function clearAuthData() {
    localStorage.removeItem('liventaToken');
    localStorage.removeItem('liventaUser');
    sessionStorage.removeItem('liventaToken');
    sessionStorage.removeItem('liventaUser');
}

function handleLogout() {
    // Clear authentication data
    clearAuthData();

    // Show success message
    alert('You have been logged out successfully!');

    // Reload page to update UI
    window.location.reload();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderProperties()
    renderOffers()
    initSmoothScroll()
    handleScroll() // Check initial scroll position

    // Add contact form listener
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactForm)
    }

    // Check authentication state
    checkAuthState()

    // Add logout button listeners (desktop and mobile)
    const logoutBtn = document.getElementById('logoutBtn')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout)
    }

    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn')
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout)
    }
})
