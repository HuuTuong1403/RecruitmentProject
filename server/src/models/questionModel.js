const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const answerSchema = new mongoose.Schema(
  {
    choice: String,
    answer: {
      contentChoice: {
        type: String,
        required: [true, 'Nội dung câu trả lời không được trống'],
        trim: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  },
  { _id: false }
);
const questionSchema = new mongoose.Schema(
  {
    questionContent: {
      type: String,
      required: [true, 'Nội dung câu hỏi không được trống'],
      trim: true,
    },
    answers: [answerSchema],
    skills: [String],
    questionType: {
      type: String,
      default: 'Single',
      enum: {
        values: ['Single', 'Multi-choice'],
        message: 'Loại câu hỏi gồm: Single, Multi-choice',
      },
    },
    level: {
      type: String,
      required: [true, 'Câu hỏi phải có cấp độ khó'],
      enum: {
        values: ['Easy', 'Middle', 'Difficult'],
        message: 'Cấp độ khó là: Easy, Middle, Difficult',
      },
    },
    explanation: {
      type: String,
    },
    tips: {
      type: String,
    },
    score: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
questionSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
