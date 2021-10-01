const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const salarySchema = new mongoose.Schema(
  {
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    type: {
      type: String,
      default: 'negotiation',
      trim: true,
    },
  },
  { _id: false }
);
const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company must have a name'],
      trim: true,
    },
    companyType: {
      type: String,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
    },
    ot: {
      type: Boolean,
      default: false,
    },
    scale: {
      type: String,
      default: 'Over 50',
    },
    workingTime: {
      finish: {
        type: String,
      },
      start: {
        type: String,
      },
    },
    location: {
      type: addressSchema,
    },
    benifits: {
      type: String,
      required: [true, 'Job must have benifit'],
      trim: true,
    },
    candidate: [String],
    description: {
      type: String,
      required: [true, 'Job must have description'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job must have Tttle'],
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    priorityLevel: {
      type: String,
      default: 'Normal',
    },
    reason: {
      type: String,
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, 'Job must have requirements'],
      trim: true,
    },
    responsibilities: {
      type: String,
      trim: true,
    },
    salary: salarySchema,
    skills: [String],
    status: {
      type: String,
      default: 'unapproval',
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
