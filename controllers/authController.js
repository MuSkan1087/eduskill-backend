const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Register User
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Login User
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  res.json({
    message: "Login API (JWT next step)",
  });
};

module.exports = {
  registerUser,
  loginUser,
};