const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// @desc Get all courses
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// @desc Get single course
// @route GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    // Remove accidental quotes from course ID
    const courseId = req.params.id.replace(/^["']|["']$/g, "");

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.log("GET COURSE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

// @desc Add new course
// @route POST /api/courses
const addCourse = async (req, res) => {
  try {
    console.log("COURSE DATA:", req.body);

    const {
      title,
      category,
      description,
      duration,
      level,
      price,
      image,
      skills,
    } = req.body;

    const course = await Course.create({
      title: title?.trim(),
      category: category?.trim(),
      description: description?.trim(),
      duration: duration?.trim(),
      level: level?.trim(),
      price: Number(price),
      image: image?.trim(),
      skills: skills || [],
    });

    console.log("COURSE CREATED:", course);

    res.status(201).json(course);
  } catch (error) {
    console.log("ADD COURSE ERROR:", error);

    res.status(400).json({
      message: "Failed to add course",
      error: error.message,
    });
  }
};

// @desc Update course
// @route PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// @desc Delete course
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

// @desc Enroll in a course
// @route POST /api/courses/:id/enroll
const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    // Add course to enrolled courses
    user.enrolledCourses.push(courseId);

    // Create progress for this course
    user.courseProgress.push({
      course: courseId,
      progress: 0,
    });

    await user.save();

    res.status(200).json({
      message: "Enrolled successfully",
      enrolledCourses: user.enrolledCourses,
      courseProgress: user.courseProgress,
    });
  } catch (error) {
    console.log("ENROLL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
};