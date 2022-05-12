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
      required: [true, 'Entry test phải có mức độ khó'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Entry test phải có duration'],
    },
    questions: {
      type: [mongoose.Schema.ObjectId],
      required: [true, 'Entry test phải có danh sách câu hỏi'],
    },
    requiredPass: {
      type: Number,
      default: 0,
      validate: {
        validator: function (el) {
          return el <= this.totalPoint;
        },
        message: 'Điểm pass phải bé hơn điềm tổng của bài',
      },
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
servicePackageSchema.pre('save', async function (next) {
  questionPromises = this.questions.map(idQuestion => {
    await Question.findById(idQuestion)
  })
  questions = await questionPromises()

  next();
});
entryTestSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const EntryTest = mongoose.model('EntryTest', entryTestSchema);
module.exports = EntryTest;
