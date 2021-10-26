const mongoose = require('mongoose');
const JobSeeker = require('./job-seekerModel');
const Employer = require('./employerModel');

const reviewSchema = new mongoose.Schema({
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
  },
  title: {
    type: String,
    required: [true, 'Bài review phải có tiêu đề'],
    trim: true,
  },
  rating: {
    type: Number,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employer',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
