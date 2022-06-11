const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const EntryTest = require('./entryTestModel');
const answerSheetServices = require('./../services/answerSheet');
const answerContentSchema = new mongoose.Schema(
  {
    idQuestion: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
    selectedChoice: [String],
    achievedScore: {
      default: 0,
      type: Number,
    },
    isCorrect: {
      type: Number,
      default: 0,
      enum: {
        values: [0, 1, 2],
      },
      message: '0 is wrong, 1 is partial correct, 2 is full correct ',
    },
  },
  { _id: false }
);
const answerSheetSchema = new mongoose.Schema(
  {
    entryTest: {},
    answerContents: [answerContentSchema],
    totalRightQuestion: {
      default: 0,
      type: Number,
    },
    achievedFullScore: {
      default: 0,
      type: Number,
    },
    duration: { default: 0, type: Number },
    jobSeeker: {
      type: mongoose.Schema.ObjectId,
      ref: 'JobSeeker',
      required: [true, 'Anseersheet phải có ứng viên'],
    },
  },
  {
    timestamps: true,
  }
);
answerSheetSchema.pre('save', async function (next) {
  this.entryTest = await EntryTest.findById(this.entryTest, {
    company: 1,
    description: 1,
    difficultLevel: 1,
    duration: 1,
    questions: 1,
    title: 1,
  });
  const resultData = await answerSheetServices.markAnswer(
    this.answerContents,
    this.entryTest.questions
  );
  this.totalRightQuestion = resultData.totalRightQuestion;
  this.achievedFullScore = resultData.achievedFullScore;
  this.answerContents = resultData.answerContents;
  next();
});
answerSheetSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const AnswerSheet = mongoose.model('AnswerSheet', answerSheetSchema);
module.exports = AnswerSheet;
