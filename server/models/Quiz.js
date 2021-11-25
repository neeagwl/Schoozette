const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  option: {
    type: String,
    required: true
  }
});

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answers: [optionSchema],

    answer: {
      type: String,
      required: true
    },

}, {
    timestamps: true
});

const quizSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },

    instructions: {
        type: String,
        required: true
    },

    questions: [questionSchema],

    duration :{
      hours : {
        type : Number,
        default: 0
      },

      minutes : {
        type : Number,
        default: 0
      },

      seconds : {
        type : Number,
        default: 0
      }

    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }

  },
  {
    timestamps: true
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;