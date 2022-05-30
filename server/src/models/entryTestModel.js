const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Question = require('./questionModel');

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
      enum: {
        values: ['Easy', 'Middle', 'Difficult'],
        message: 'Cấp độ khó là: Easy, Middle, Difficult',
      },
      required: [true, 'Entry test phải có mức độ khó'],
      trim: true,
    },
    duration: {
      type: Number,
    },
    questions: {
      type: [{}],
      required: [true, 'Entry test phải có danh sách câu hỏi'],
    },
    requiredPass: {
      type: Number,
      default: 0,
    },
    skills: [String],
    title: {
      type: String,
      required: [true, 'Entry test phải có title'],
      trim: true,
    },
    totalScore: {
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
entryTestSchema.pre('save', async function (next) {
  questionPromises = this.questions.map(async (idQuestion) => {
    return await Question.findById(idQuestion, {
      createdAt: 0,
      updatedAt: 0,
      deletedBy: 0,
      deleted: 0,
    });
  });
  const questions = await Promise.all(questionPromises);
  var totalScore = 0;
  var duration = 0;
  const totalQuestion = questions.length;
  for (var i = 0; i < questions.length; i++) {
    totalScore = totalScore + questions[i].score;
    duration = duration + questions[i].duration;
  }
  this.questions = questions;
  this.totalQuestion = totalQuestion;
  this.totalScore = totalScore;
  this.duration = duration;
  next();
});
entryTestSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const EntryTest = mongoose.model('EntryTest', entryTestSchema);
module.exports = EntryTest;
