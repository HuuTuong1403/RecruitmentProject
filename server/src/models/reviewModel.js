const mongoose = require('mongoose');
const JobSeeker = require('./job-seekerModel');
const Employer = require('./employerModel');

const reviewSchema = new mongoose.Schema(
  {
    improvement: {
      type: String,
      trim: true,
    },
    interesting: {
      type: String,
      trim: true,
    },
    ot: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'JobSeeker',
      required: [true, 'Reivew phải tương ứng với một user'],
    },
    title: {
      type: String,
      required: [true, 'Bài review phải có tiêu đề'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
      required: [true, 'Reivew phải tương ứng với một công ty'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email username avatar fullname',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
