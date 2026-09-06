const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// @desc Get User Profile
// @route GET /api/users/profile
// ===============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// @desc Register User
// @route POST /api/users/register
// ===============================
const registerUser = async (req, res) => {
  try {
    // Role is intentionally NOT taken from req.body
    // Every new registered user will be a student
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      enrolledCourses: [],
      courseProgress: [],
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// @desc Login User
// @route POST /api/users/login
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Fixed admin email
    if (
      process.env.ADMIN_EMAIL &&
      email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()
    ) {
      if (user.role !== "admin") {
        user.role = "admin";
        await user.save();
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// @desc Get All Users
// @route GET /api/users
// ===============================
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// @desc Make User Admin
// @route PUT /api/users/:id/make-admin
// ===============================
const makeUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "User is already an admin",
      });
    }

    user.role = "admin";

    await user.save();

    res.status(200).json({
      message: "User has been promoted to admin successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// @desc Remove Admin Role
// @route PUT /api/users/:id/remove-admin
// ===============================
const removeUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from removing their own admin role
    if (req.user.id === id) {
      return res.status(400).json({
        message: "You cannot remove your own admin role",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Protect fixed admin account
    if (
      process.env.ADMIN_EMAIL &&
      user.email.toLowerCase() ===
      process.env.ADMIN_EMAIL.trim().toLowerCase()
    ) {
      return res.status(400).json({
        message: "The main admin account cannot be demoted",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        message: "User is not an admin",
      });
    }

    user.role = "student";

    await user.save();

    res.status(200).json({
      message: "Admin role removed successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// @desc Delete User
// @route DELETE /api/users/:id
// ===============================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Protect fixed admin account
    if (
      process.env.ADMIN_EMAIL &&
      user.email.toLowerCase() ===
      process.env.ADMIN_EMAIL.trim().toLowerCase()
    ) {
      return res.status(400).json({
        message: "The main admin account cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// @desc Get My Enrolled Courses
// @route GET /api/users/mycourses
// ===============================
const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("enrolledCourses")
      .select("enrolledCourses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// @desc Get My Course Progress
// @route GET /api/users/progress
// ===============================
const getMyProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("courseProgress.course")
      .select("courseProgress");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.courseProgress);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch progress",
      error: error.message,
    });
  }
};

// ===============================
// @desc Update Course Progress
// @route PUT /api/users/progress/:courseId
// ===============================
const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;

    // Validate progress
    if (progress === undefined) {
      return res.status(400).json({
        message: "Progress is required",
      });
    }

    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find course progress
    const courseProgress = user.courseProgress.find(
      (item) => item.course.toString() === courseId
    );

    if (!courseProgress) {
      return res.status(404).json({
        message: "Course progress not found",
      });
    }

    // Update progress
    courseProgress.progress = Number(progress);

    await user.save();

    res.status(200).json({
      message: "Progress updated successfully",
      progress: courseProgress.progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update progress",
      error: error.message,
    });
  }
};
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalMentors = await User.countDocuments({
      role: "mentor",
    });

    // Total enrollments across all students
    const enrollmentData = await User.aggregate([
      {
        $project: {
          enrolledCount: {
            $size: {
              $ifNull: ["$enrolledCourses", []],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalEnrollments: {
            $sum: "$enrolledCount",
          },
        },
      },
    ]);

    const totalEnrollments =
      enrollmentData.length > 0
        ? enrollmentData[0].totalEnrollments
        : 0;

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAdmins,
      totalMentors,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  makeUserAdmin,
  removeUserAdmin,
  deleteUser,
  getProfile,
  getMyCourses,
  getMyProgress,
  updateProgress,
  getAdminStats,
};