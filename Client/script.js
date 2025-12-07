// Property data
const properties = [
    {
        title: "Penthouse - Tower A",
        description:
            "Experience comfortable city living in this stylish penthouse, offering essential luxury and stunning views.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
        price: "₹7.1 Cr",
    },
    {
        title: "Penthouse - Tower B",
        description:
            "Indulge in minimalist elegance within this expansive penthouse, featuring modern amenities and a seamless open-plan design.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
        price: "₹10 Cr",
    },
    {
        title: "Penthouse - Tower C",
        description:
            "Discover unparalleled luxury in this sophisticated penthouse, boasting premium smart home technology, high-end finishes, and breathtaking panoramic vistas.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
        price: "₹15.5 Cr",
    },
]

// Offers data
const offers = [
    {
        title: "1 Bedroom - Tower A",
        description: "Enjoy a stylish and comfortable living space with essential amenities and a pleasant view of Kediri.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
        price: "₹2.7 Cr",
        originalPrice: "₹3.3 Cr",
    },
    {
        title: "1 Bedroom - Tower B",
        description:
            "Experience modern living in this well-appointed apartment, featuring elegant finishes and a touch of luxury.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80",
        price: "₹3.3 Cr",
        originalPrice: "₹4.2 Cr",
    },
    {
        title: "1 Bedroom - Tower C",
        description:
            "Indulge in upscale urban living within this sophisticated apartment, offering premium comfort and exclusive features.",
        discount: "10% Discount",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
        price: "₹4.5 Cr",
        originalPrice: "₹5 Cr",
    },
    {
        title: "2 Bedroom - Tower A",
        description: "Enjoy a stylish and comfortable living space with essential amenities and a pleasant view of Kediri.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
        price: "₹4 Cr",
        originalPrice: "₹5 Cr",
    },
    {
        title: "2 Bedroom - Tower B",
        description:
            "Experience modern living in this well-appointed apartment, featuring elegant finishes and a touch of luxury.",
        discount: "20% Discount",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
        price: "₹5.3 Cr",
        originalPrice: "₹6.7 Cr",
    },
    {
        title: "2 Bedroom - Tower C",
        description:
            "Indulge in upscale urban living within this sophisticated apartment, offering premium comfort and exclusive features.",
        discount: "10% Discount",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80",
        price: "₹6.8 Cr",
        originalPrice: "₹7.5 Cr",
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
            (property) => `
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
          <button class="btn-buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  `,
        )
        .join("")
}

// Render offer cards
function renderOffers() {
    if (!offersGrid) return

    offersGrid.innerHTML = offers
        .map(
            (offer) => `
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
          <button class="btn-buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  `,
        )
        .join("")
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderProperties()
    renderOffers()
    initSmoothScroll()
    handleScroll() // Check initial scroll position
})
