const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema(
  {
    choice: String,
    contentChoice: String,
  },
  { _id: false }
);
const questionSchema = new mongoose.Schema(
  {
    correctAnswer: {
      type: [answerSchema],
    },
    idQuestion: {
      type: String,
      required: [true, 'Câu hỏi phải có ID'],
      unique: true,
      trim: true,
    },
    question: {
      type: String,
      required: [true, 'Nhập nội dung câu hỏi'],
    },
    point: {
      type: Number,
      required: [true, 'Câu hỏi phải có điểm'],
    },
    typeQuestion: {
      type: String,
    },
  },
  { _id: false }
);
const entryTestSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
    },
    description: {
      type: String,
      required: [true, 'Entry test phải có mô tả'],
      trim: true,
    },
    difficultLevel: {
      type: String,
      required: [true, 'Entry test phải có mức độ khó'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Entry test phải có duration'],
    },
    questions: {
      type: [questionSchema],
      required: [true, 'Entry test phải có danh sách câu hỏi'],
    },
    requiredPass: {
      type: Number,
      default: 70,
    },
    skills: [String],
    title: {
      type: String,
      required: [true, 'Entry test phải có title'],
      trim: true,
    },
    totalPoint: {
      type: Number,
      default: 0,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const EntryTest = mongoose.model('EntryTest', entryTestSchema);
module.exports = EntryTest;
