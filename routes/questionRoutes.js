const express = require("express");

const router = express.Router();

const {
  getCourseQuestions,
  submitCourseQuiz,
} = require("../controllers/questionController");

const {
  protect,
} = require("../middleware/protect");


// Get questions for a specific course
router.get(
  "/course/:courseId",
  protect,
  getCourseQuestions
);


// Submit quiz for a specific course
router.post(
  "/course/:courseId/submit",
  protect,
  submitCourseQuiz
);


module.exports = router;