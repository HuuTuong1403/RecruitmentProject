const mongoose = require('mongoose');
const addressSchema = require('./addressModel');

const employerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Usename is duplicated. Let's try another username"],
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    address: {
      type: addressSchema,
    },
    companyName: {
      type: String,
      required: [true, 'You must fill out company name'],
      unique: [
        true,
        "Company name is duplicated. Let's try another company name",
      ],
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Account must have a email'],
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
    },
    entryTest: [String],
    event: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    jobs: [String],
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
    phone: {
      type: String,
      required: [true, 'Account must have a phone number'],
      unique: [
        true,
        "Phone number is duplicated. Let's try another phone number",
      ],
      trim: true,
    },
    registeredServicePackages: [
      {
        servicePackageName: {
          type: String,
          required: [true, 'Service package must have a name'],
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        postType: {
          type: String,
          required: [true, 'Service package must have a post type'],
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        status: {
          type: String,
          default: 'Unpaid',
        },
      },
    ],
    reviews: [
      {
        Improvement: {
          type: String,
          trim: true,
        },
        Interesting: {
          type: String,
          trim: true,
        },
        OT: {
          type: String,
          trim: true,
        },
        Reviewer: {
          type: String,
          required: [true, 'Reviewer must be assigned'],
          trim: true,
        },
        Title: {
          type: String,
          required: [true, 'Review must have a title'],
          trim: true,
        },
        Total: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      default: 'unapproval',
    },
    TIN: {
      type: String,
    },
    companyType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;
