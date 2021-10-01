const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema(
  {
    Usename: {
      type: String,
      unique: [true, "Usename is duplicated. Let's try another username"],
      trim: true,
    },
    Password: {
      type: String,
      trim: true,
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
    CompanyName: {
      type: String,
      required: [true, 'You must fill out company name'],
      unique: [
        true,
        "Company name is duplicated. Let's try another company name",
      ],
      trim: true,
    },
    CompanyWebsite: {
      type: String,
      trim: true,
    },
    Email: {
      type: String,
      required: [true, 'Account must have a email'],
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
    },
    EntryTest: [String],
    Event: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    Jobs: [String],
    Logo: {
      type: String,
    },
    OT: {
      type: Boolean,
      default: false,
    },
    Scale: {
      type: String,
      default: 'Over 50',
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
    RegisteredServicePackages: [
      {
        ServicePackageName: {
          type: String,
          required: [true, 'Service package must have a name'],
          trim: true,
        },
        Description: {
          type: String,
          trim: true,
        },
        PostType: {
          type: String,
          required: [true, 'Service package must have a post type'],
        },
        Price: {
          type: Number,
        },
        Quantity: {
          type: Number,
        },
        Status: {
          type: String,
          default: 'Unpaid',
        },
      },
    ],
    Reviews: [
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
    Status: {
      type: String,
      default: 'unapproval',
    },
    TIN: {
      type: String,
    },
    CompanyType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;
