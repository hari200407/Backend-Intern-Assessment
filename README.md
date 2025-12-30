# Backend Intern Assessment

This repository contains a full-stack application developed as part of a Backend Intern assessment.  
The project includes a Node.js + Express backend with authentication and role-based access control, along with a simple frontend to consume the APIs.

---

## Features

### Backend
- User Signup & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Role-Based Access Control (Admin / User)
- MongoDB Atlas integration
- Clean modular architecture

### Frontend
- User Signup and Login UI
- JWT token handling
- Protected route access
- API integration with backend
- Basic form validation

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

### Frontend
- React
- Axios
- React Router DOM

---

## Project Structure

Backend-Intern-Assessment/
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # Request handling logic
│ │ ├── routes/ # API route definitions
│ │ ├── models/ # Mongoose models
│ │ ├── middleware/ # Authentication & RBAC middleware
│ │ ├── config/ # Database configuration
│ │ ├── app.js # Express app configuration
│ │ └── server.js # Server entry point
│ │
│ ├── .env # Environment variables (ignored)
│ ├── .gitignore
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login / Signup pages
│ │ ├── services/ # API service layer
│ │ ├── App.js
│ │ └── index.js
│ │
│ ├── package.json
│
└── README.md


---

## API Endpoints

### Authentication
- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get logged-in user (Protected)
- `GET /api/auth/users` – Get all users (Admin only)

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

> '.env' is excluded from version control for security reasons.

---

## How to Run the Project

### Backend

```bash
cd backend
npm install
npm start

Server will run on:
http://localhost:5000

### Frontend

cd frontend
npm install
npm start

Frontend will run on:
http://localhost:3000

---

### Authentication Flow

1. User signs up or logs in from frontend
2.Backend returns a JWT token
3.Token is stored on the client side
4.Protected routes send token via Authorization header
5.Backend validates token and role before allowing access

---

### Role-Based Access Control

1.Normal users can access their own profile
2.Admin users can access admin-only routes
3. Authorization is enforced using middleware

---

# Notes

1.Backend follows MVC-style folder separation
2.Frontend is kept minimal to demonstrate API integration
3.Commit history reflects incremental development
