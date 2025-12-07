# Liventa Authentication System

## Overview
Complete authentication system with MongoDB, JWT tokens, and secure password hashing.

## Servers Running
1. **Authentication Server** - Port 3000 (Login/Signup)
2. **Payment Gateway Server** - Port 5000 (Razorpay)

## Features Implemented

### Backend (`Server/server.js`)
- ✅ User registration with validation
- ✅ Secure password hashing with bcrypt
- ✅ JWT token generation
- ✅ Login authentication
- ✅ Protected routes with JWT middleware
- ✅ User profile retrieval
- ✅ MongoDB integration

### Frontend
- ✅ **Login Page** (`Client/login.html`)
  - Email and password authentication
  - Remember me functionality
  - Token storage (localStorage/sessionStorage)
  - Automatic redirect after login
  
- ✅ **Signup Page** (`Client/signin.html`)
  - Multi-field registration form
  - Password strength indicator
  - Password confirmation validation
  - Automatic login after signup

## API Endpoints

### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+62 812-3456-7890",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+62 812-3456-7890"
  }
}
```

### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+62 812-3456-7890"
  }
}
```

### GET `/api/auth/profile`
Get user profile (Protected route - requires JWT token).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+62 812-3456-7890",
    "createdAt": "2024-12-07T..."
  }
}
```

## Starting the Servers

### Authentication Server
```bash
cd Server
node server.js
```
Server will start on `http://localhost:3000`

### Payment Gateway Server
```bash
cd Server
node paygate.js
```
Server will start on `http://localhost:5000`

## Testing the Authentication

1. **Sign Up**:
   - Open `Client/signin.html` in browser
   - Fill in all fields
   - Password must be at least 8 characters
   - Click "Create Account"
   - You'll be automatically logged in and redirected

2. **Login**:
   - Open `Client/login.html` in browser
   - Enter email and password
   - Check "Remember me" to persist login
   - Click "Login"
   - You'll be redirected to home page

3. **Logout**:
   - Token is stored in localStorage or sessionStorage
   - To logout, clear the token from browser storage

## Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Email uniqueness validation
- ✅ Password strength requirements
- ✅ Protected API routes
- ✅ CORS enabled for cross-origin requests

## Environment Variables

Required in `.env`:
```env
AUTH_PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

## Database Schema

**User Model:**
- firstName (String, required)
- lastName (String, required)
- email (String, required, unique)
- phone (String, required)
- password (String, required, hashed)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

## Next Steps

To integrate authentication with the main site:
1. Check for token on page load
2. Display user name in navbar if logged in
3. Show logout button instead of login
4. Protect certain features for logged-in users only
5. Add password reset functionality
6. Implement email verification

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB URI is correct in `.env`
- Check if IP is whitelisted in MongoDB Atlas
- Verify network connection

**CORS Error:**
- Server has CORS enabled
- Make sure both servers are running
- Check browser console for specific errors

**Token Errors:**
- Clear browser localStorage/sessionStorage
- Check if JWT_SECRET matches on server
- Verify token hasn't expired (7 days)
