const mongoose = require('mongoose');

const entryTestSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      required: [true, 'Entry test must have description'],
      trim: true,
    },
    DifficultLevel: {
      type: String,
      required: [true, 'Entry test must have level'],
      trim: true,
    },
    Duration: {
      type: Number,
      required: [true, 'Entry test must have duration'],
    },
    Questions: {
      type: [
        {
          Answer: {
            type: [
              {
                Choice: String,
                ContentChoice: String,
              },
            ],
            required: [true, 'Question must have answer'],
          },
          CorrectAnswer: {
            type: [
              {
                Choice: String,
                ContentChoice: String,
              },
            ],
            required: [true, 'Question must have correct answer'],
          },
          IDQuestion: {
            type: String,
            required: [true, 'Question must have correct ID'],
            unique: true,
            trim: true,
          },
          Point: {
            type: Number,
            required: [true, 'Question must have point'],
          },
          TypeQuestion: {
            type: String,
          },
        },
      ],
      required: [true, 'Entry test must have questions'],
    },
    RequiredPass: {
      type: Number,
      default: 70,
    },
    Skills: [String],
    Submission: {
      type: [
        {
          Ansersheet: [
            {
              IsCorrect: {
                type: String,
                default: false,
              },
              Point: {
                type: Number,
                default: 0,
              },
              QuestionID: {
                type: String,
                required: [true, 'Answer must have questionID'],
              },
              SelectedAnswer: {
                type: [
                  {
                    Choice: String,
                    ContentChoice: String,
                  },
                ],
              },
            },
          ],
          Candidate: {
            type: String,
            required: [true, 'Submission must be assigned candidate'],
          },
          Point: {
            type: Number,
            default: 0,
          },
          Result: {
            type: String,
            default: 'Fail',
          },
          Status: {
            type: String,
            default: 'NotGraded',
          },
        },
      ],
    },
    Title: {
      type: String,
      required: [true, 'Entry test must have title'],
      trim: true,
    },
    TotalPoint: {
      type: Number,
      default: 0,
    },
    TotalQuestion: {
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
