const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = require("../controllers/courseController");

const { protect, authorizeRoles } = require("../middleware/protect");

// Public Routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Student Enroll
router.post("/:id/enroll", protect, enrollCourse);

// Admin Only Routes
router.post("/", protect, authorizeRoles("admin"), addCourse);
router.put("/:id", protect, authorizeRoles("admin"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCourse);

module.exports = router;