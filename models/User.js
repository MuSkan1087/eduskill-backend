const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },

    // Courses in which the user is enrolled
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    lessonProgress: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },

        moduleId: {
          type: Number,
        },

        lessonId: {
          type: Number,
        },

        completed: {
          type: Boolean,
          default: false,
        },

        completedAt: {
          type: Date,
        },
      },
    ],

    // Progress of enrolled courses
    courseProgress: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },

        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        completedLessons: [
          {
            moduleId: {
              type: Number,
            },

            lessonId: {
              type: Number,
            },

            completedAt: {
              type: Date,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);