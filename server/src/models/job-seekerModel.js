const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: [true, 'Account must have a email'],
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
    },
    Phone: {
      type: String,
      required: [true, 'Account must have a phone number'],
      unique: [
        true,
        "Phone number is duplicated. Let's try another phone number",
      ],
      trim: true,
    },
    FullName: {
      type: String,
      required: [true, 'Account must have a fullname'],
      trim: true,
    },
    Usename: {
      type: String,
      required: [true, 'Account must have a username'],
      unique: [true, "Usename is duplicated. Let's try another username"],
      trim: true,
    },
    Password: {
      type: String,
      required: [true, 'Account must have a password'],
      trim: true,
    },
    DOB: {
      type: Date,
    },
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
    Avartar: {
      type: String,
    },
    Google: {
      type: String,
    },
    Facebook: {
      type: String,
    },
    Applied: [String],
    EntryTests: [String],
    Event: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = JobSeeker;
