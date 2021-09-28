const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    Address: {
      City: {
        type: String,
      },
      Country: {
        type: String,
      },
      District: {
        type: String,
      },
      Street: {
        type: String,
        trim: true,
      },
      Ward: {
        type: String,
      },
    },
    Benifits: {
      type: String,
      required: [true, 'Job must have benifit'],
      trim: true,
    },
    Candidate: [String],
    Description: {
      type: String,
      required: [true, 'Job must have description'],
      trim: true,
    },
    JobTitle: {
      type: String,
      required: [true, 'Job must have Tttle'],
      trim: true,
    },
    Position: {
      type: String,
      trim: true,
    },
    PriorityLevel: {
      type: String,
      default: 'Normal',
    },
    Reason: {
      type: String,
      trim: true,
    },
    Requirements: {
      type: String,
      required: [true, 'Job must have requirements'],
      trim: true,
    },
    Responsibilities: {
      type: String,
      required: [true, 'Job must have requirements'],
      trim: true,
    },
    Salary: {
      type: {
        Max: {
          type: Number,
        },
        Min: {
          type: Number,
        },
        Type: {
          type: String,
          default: 'negotiation',
          trim: true,
        },
      },
    },
    Skills: [String],
    Status: {
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
