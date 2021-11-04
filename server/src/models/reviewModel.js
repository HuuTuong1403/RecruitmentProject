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
      min: [1, 'Rating phải lớn hơn hoặc bằng 1'],
      max: [5, 'Rating phải bé hơn hoặc bằng 5'],
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
reviewSchema.index({ company: 1, user: 1 }, { unique: true });
reviewSchema.statics.calcAverageRatings = async function (employerID) {
  const stats = await this.aggregate([
    {
      $match: { company: employerID },
    },
    {
      $group: {
        _id: '$company',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Employer.findByIdAndUpdate(employerID, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Employer.findByIdAndUpdate(employerID, {
      ratingsAverage: 4,
      ratingsQuantity: 0,
    });
  }
};
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email username avatar fullname',
  });
  next();
});
reviewSchema.post('save', async function () {
  this.constructor.calcAverageRatings(this.company);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  // await this.findOne(); does NOT work here, query has already executed
  await doc.constructor.calcAverageRatings(doc.company);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
