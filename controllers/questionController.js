const Question = require("../models/Question");

// Get questions for a specific course
const getCourseQuestions = async (req, res) => {
  try {
    const { courseId } = req.params;

    const questions = await Question.find({
      courseId: courseId,
    }).select("-correctAnswer");

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Submit course quiz
const submitCourseQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        message: "Answers are required",
      });
    }

    const questions = await Question.find({
      courseId: courseId,
    });

    if (!questions.length) {
      return res.status(404).json({
        message: "No questions found for this course",
      });
    }

    let score = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[index];

      if (
        userAnswer !== undefined &&
        Number(userAnswer) === question.correctAnswer
      ) {
        score++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions,
      percentage,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getCourseQuestions,
  submitCourseQuiz,
};