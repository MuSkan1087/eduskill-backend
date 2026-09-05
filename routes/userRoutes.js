const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUsers,
  makeUserAdmin,
  loginUser,
  getProfile,
  getMyCourses,
  getMyProgress,
  updateProgress,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/protect");

// ==========================
// Public Routes
// ==========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// ==========================
// Protected Routes
// ==========================

// User Profile
router.get("/profile", protect, getProfile);

// My Enrolled Courses
router.get("/mycourses", protect, getMyCourses);

// My Course Progress
router.get("/progress", protect, getMyProgress);

// Update Course Progress
router.put("/progress/:courseId", protect, updateProgress);


// ==========================
// Admin Only
// ==========================

// Get All Users
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

// Make User Admin
router.put(
  "/:id/make-admin",
  protect,
  authorizeRoles("admin"),
  makeUserAdmin
);


module.exports = router;