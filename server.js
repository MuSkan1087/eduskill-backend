const dns = require("dns");
dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");


app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 EntreSkill Hub Backend is Running Successfully!"
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});