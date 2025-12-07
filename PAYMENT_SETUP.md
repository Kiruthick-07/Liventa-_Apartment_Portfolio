# Liventa Apartment Portfolio - Payment Gateway Setup

## Prerequisites
- Node.js installed
- Razorpay account (test credentials already configured)

## Starting the Payment Server

1. Navigate to the Server directory:
```bash
cd Server
```

2. Install dependencies (if not already installed):
```bash
npm install express razorpay cors dotenv
```

3. Start the payment gateway server:
```bash
node paygate.js
```

The server will start on `http://localhost:5000`

## Testing the Payment Gateway

1. Make sure the payment server is running on port 5000
2. Open `Client/index.html` in your browser
3. Click any "Buy Now" button on the apartment cards
4. The Razorpay payment modal will open
5. Use test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

## Environment Variables

The `.env` file contains:
- `RAZORPAY_KEY_ID`: Your Razorpay test key
- `RAZORPAY_SECRET_KEY`: Your Razorpay secret key
- `PORT`: Server port (default: 5000)

## Features

- ✅ Razorpay payment integration
- ✅ Order creation on backend
- ✅ Secure payment processing
- ✅ Success/failure handling
- ✅ Mobile responsive
- ✅ All prices in Indian Rupees (₹)
