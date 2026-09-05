# 🚀 EntreSkill Hub — Backend

### RESTful API for a Modern Learning Platform

EntreSkill Hub Backend is a RESTful API built with Node.js, Express.js, and MongoDB.

It provides authentication, authorization, course management, course enrollment, user profiles, and learning progress functionality for the EntreSkill Hub learning platform.

---

## 🌐 Live API

https://eduskill-backend.onrender.com

### Frontend

https://eduskill-frontend.vercel.app

### GitHub Repositories

**Frontend:**  
https://github.com/MuSkan1087/eduskill-frontend

**Backend:**  
https://github.com/MuSkan1087/eduskill-backend

---

## ✨ Features

### 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- Bearer Token Authentication
- Role-Based Authorization
- Logout support through frontend token management

### 📚 Course Management

- Get all courses
- Get course details
- Add new courses
- Update courses
- Delete courses
- Course categories
- Course levels
- Course duration
- Course pricing
- Course image support
- Course skills

### 🎓 Student Features

- Enroll in courses
- View enrolled courses
- Track learning progress
- Update course progress
- Course completion tracking
- View user profile

### 👨‍💼 Admin Features

- Add courses
- Edit courses
- Delete courses
- Manage course information
- Role-based access control

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- JWT
- bcryptjs
- CORS
- dotenv

### Tools & Deployment

- Git
- GitHub
- VS Code
- MongoDB Atlas
- Render
- Postman

---

## 🏗️ Backend Architecture

```text
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │  Vite + Tailwind CSS │
                    └──────────┬───────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Express.js API     │
                    │      Server          │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌────────────┐   ┌───────────┐
        │  Routes  │     │Middleware  │   │Controllers│
        └────┬─────┘     └────────────┘   └─────┬─────┘
             │                                   │
             └─────────────────┬─────────────────┘
                               ▼
                       ┌───────────────┐
                       │   Mongoose    │
                       └───────┬───────┘
                               │
                               ▼
                       ┌───────────────┐
                       │ MongoDB Atlas │
                       └───────────────┘

🔐 Authentication Flow

User
  │
  ▼
Register / Login
  │
  ▼
Express API
  │
  ▼
User Verification
  │
  ▼
Password Validation
  │
  ▼
JWT Token Generated
  │
  ▼
Frontend Stores Token
  │
  ▼
Axios Authorization Header
  │
  ▼
Protected Backend Routes

.

👥 User Roles

The backend supports role-based access control.

| Role    | Access                           |
| ------- | -------------------------------- |
| Student | Browse, enroll and track courses |
| Admin   | Add, update and delete courses   |
| Mentor  | Supported user role              |


📡 API Endpoints

🔐 User APIs

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| POST   | `/api/users/register`           | Register a new user        |
| POST   | `/api/users/login`              | Login user                 |
| GET    | `/api/users/profile`            | Get logged-in user profile |
| GET    | `/api/users/mycourses`          | Get enrolled courses       |
| GET    | `/api/users/progress`           | Get learning progress      |
| PUT    | `/api/users/progress/:courseId` | Update course progress     |

📚 Course APIs

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/api/courses`            | Get all courses    |
| GET    | `/api/courses/:id`        | Get course details |
| POST   | `/api/courses`            | Add a new course   |
| PUT    | `/api/courses/:id`        | Update a course    |
| DELETE | `/api/courses/:id`        | Delete a course    |
| POST   | `/api/courses/:id/enroll` | Enroll in a course |


🗂️ Project Structure

eduskill-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── courseController.js
│   └── userController.js
│
├── middleware/
│   └── protect.js
│
├── models/
│   ├── Course.js
│   └── User.js
│
├── routes/
│   ├── courseRoutes.js
│   └── userRoutes.js
│
├── utils/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env.example
