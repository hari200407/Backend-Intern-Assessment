# Backend Intern Assessment – Full Stack Application

This repository contains a full-stack application developed as part of a Backend Intern assessment. 
The project includes a Node.js + Express backend with authentication, role-based access control, and user management, along with a React frontend that consumes and demonstrates all backend APIs.

-----

##  Features

### Authentication
-> User signup with full name, email, and password
-> Email format and password strength validation
-> JWT-based authentication
-> User login with credential verification
-> Logout functionality
-> Endpoint to fetch current logged-in user

### User Management (User)
-> View own profile
-> Update full name and email
-> Change password
-> Protected routes for authenticated users

### User Management (Admin)
-> View all users in a paginated table (10 users per page)
-> Activate user accounts
-> Deactivate user accounts
-> Admin-only access enforcement

### Security
-> Password hashing using bcrypt
-> JWT authentication
-> Role-based access control (admin / user)
-> Input validation on all endpoints
-> Centralized error handling
-> Environment variables for sensitive data

-----

#### Tech Stack

### Backend
-> Node.js
-> Express.js
-> MongoDB (Atlas)
-> Mongoose
-> bcryptjs
-> JSON Web Tokens (JWT)
-> dotenv

### Frontend
-> React
-> React Router DOM
-> Axios
-> Context API (auth state management)

-----

### Project Structure

Backend-Intern-Assessment/
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # Route logic
│ │ ├── routes/ # API routes
│ │ ├── models/ # Mongoose schemas
│ │ ├── middleware/ # Auth, RBAC, error handling
│ │ ├── utils/ # Token helpers
│ │ ├── app.js
│ │ └── server.js
│ │
│ ├── .env # Environment variables (ignored)
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # Login, Signup, Profile, Admin dashboard
│ │ ├── components/ # Navbar
│ │ ├── routes/ # Protected & Admin routes
│ │ ├── context/ # Auth context
│ │ ├── services/ # Axios API client
│ │ └── App.js
│ │
│ ├── package.json
│
└── README.md

-----

### API Endpoints

### Authentication
->`POST /api/auth/signup` – Register a new user
->`POST /api/auth/login` – Login user
->`POST /api/auth/logout` – Logout user
->`GET /api/auth/me` – Get current user (Protected)
->`PUT /api/auth/profile` – Update profile (Protected)
->`PUT /api/auth/change-password` – Change password (Protected)

### Admin
-> `GET /api/admin/users?page=1&limit=10` – View users (Admin only)
-> `PATCH /api/admin/users/:id/activate` – Activate user (Admin only)
-> `PATCH /api/admin/users/:id/deactivate` – Deactivate user (Admin only)

-----

## Database Design

### User Collection
-> fullName (String, required)
-> email (String, unique, required)
-> password (String, hashed using bcrypt)
-> role (String: admin/user)
-> status (String: active/inactive)
-> lastLogin (Date)
-> createdAt / updatedAt (auto-managed)

MongoDB Atlas is used as the cloud database.

-----

### Frontend Pages

-> Signup Page
-> Login Page
-> User Profile Page (view & edit profile, change password)
-> Admin Dashboard (user table with pagination & actions)
-> Navigation bar with role-based links
-> Protected routes for authenticated users
-> Admin-only route protection

-----

### Environment Variables

Create a `.env` file inside the `backend/` directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

-> `.env` is excluded from version control for security reasons.

-----

###  How to Run the Project

### Backend

```bash
cd backend
npm install
npm start

### Server runs on:
http://localhost:5000

### Frontend

cd frontend
npm install
npm start

### Frontend runs on:
http://localhost:3000

### Authentication Flow

1.User signs up or logs in
2.Backend returns JWT token
3.Token is stored in browser storage
4.Protected routes attach token via Authorization header
5.Backend validates token and user role

### Testing
Backend APIs were tested manually using Postman.
Automated Jest tests were partially implemented.

### Notes

1.Backend follows a clean modular structure
2.Frontend is intentionally minimal to demonstrate functionality
3.Commit history reflects incremental and structured development
4.Dockerization and automated tests can be added as future enhancements


