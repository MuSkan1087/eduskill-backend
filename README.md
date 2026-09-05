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
- JavaScript
- MongoDB
- Mongoose
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
                    │       Server         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌────────────┐   ┌────────────┐
        │  Routes  │     │ Middleware │   │ Controllers│
        └────┬─────┘     └────────────┘   └─────┬──────┘
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
