const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema(
  {
    choice: String,
    contentChoice: String,
  },
  { _id: false }
);
const answerSheetSchema = new mongoose.Schema(
  {
    isCorrect: {
      type: String,
      default: false,
    },
    point: {
      type: Number,
      default: 0,
    },
    questionID: {
      type: String,
      required: [true, 'Câu trả lời phải tương ứng với IDQuestion'],
    },
    selectedAnswer: {
      type: [answerSchema],
    },
  },
  { _id: false }
);
const submissionSchema = mongoose.Schema(
  {
    entryTest: {
      type: mongoose.Schema.ObjectId,
      ref: 'EntryTest',
      required: [true, 'Bài nộp phải tương ứng với một entry test'],
    },
    answerSheet: [answerSheetSchema],
    candidate: {
      type: mongoose.Schema.ObjectId,
      ref: 'JobSeeker',
      required: [true, 'Bài nộp phải có người nộp'],
    },
    point: {
      type: Number,
      default: 0,
    },
    result: {
      type: String,
      default: 'Fail',
    },
    status: {
      type: String,
      default: 'NotGraded',
    },
  },
  {
    timestamps: true,
  }
);
const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
