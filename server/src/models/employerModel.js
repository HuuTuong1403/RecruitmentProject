const mongoose = require('mongoose');
const validator = require('validator');
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
      required: [true, 'Please tell us your company name'],
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
      required: [true, 'Please provide your email'],
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
      validate: [validate.isEmail, 'Please provide your valid emal'],
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
      required: [true, 'Please provide your number phone'],
      unique: [
        true,
        "Phone number is duplicated. Let's try another phone number",
      ],
      validate: {
        validator: function (val) {
          return val.test(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          );
        },
        message: 'Number phone {VALUE} is invalid. Please try again.',
      },
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
        paidPrice: {
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
