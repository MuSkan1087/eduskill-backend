const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUsers,
  makeUserAdmin,
  removeUserAdmin,
  deleteUser,
  loginUser,
  getProfile,
  getMyCourses,
  getMyProgress,
  updateProgress,
  getAdminStats,
  getCourseEnrollmentStats,
  completeLesson,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/protect");

// ==========================
// Public Routes
// ==========================

router.post("/register", registerUser);
router.post("/login", loginUser);

// ==========================
// Protected Routes
// ==========================

router.get("/profile", protect, getProfile);
router.get("/mycourses", protect, getMyCourses);
router.get("/progress", protect, getMyProgress);
router.put("/progress/:courseId", protect, updateProgress);
router.put(
  "/progress/:courseId/module/:moduleId/lesson/:lessonId",
  protect,
  completeLesson
);

// ==========================
// Admin Only
// ==========================

// Get all users
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

// Admin Statistics
router.get(
  "/admin-stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

router.get(
  "/course-enrollment-stats",
  protect,
  authorizeRoles("admin"),
  getCourseEnrollmentStats
);

// Make user admin
router.put(
  "/:id/make-admin",
  protect,
  authorizeRoles("admin"),
  makeUserAdmin
);

// Remove admin role
router.put(
  "/:id/remove-admin",
  protect,
  authorizeRoles("admin"),
  removeUserAdmin
);

// Delete user
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

router.put(
  "/progress/:courseId/module/:moduleId/lesson/:lessonId",
  protect,
  completeLesson
);
module.exports = router;