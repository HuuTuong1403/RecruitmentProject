const mongoose = require('mongoose');

const servicePackageSchema = new mongoose.Schema(
  {
    Company: {
      type: [
        {
          IDEmployer: {
            type: String,
            required: [true, 'Employer has to be assigned'],
          },
          RegisteredTime: {
            type: Date,
            default: Date.now(),
          },
          Status: {
            type: String,
            default: 'Unpaid',
          },
        },
      ],
    },
    Description: {
      type: String,
      required: [true, 'Service package must have description'],
      trim: true,
    },
    PostType: {
      type: String,
      default: 'Recruitment',
    },
    Price: {
      type: Number,
      required: [true, 'Service package must have price'],
    },
    Price: {
      type: Number,
      required: [true, 'Service package must have quantity'],
    },
    ServicePackageCode: {
      type: String,
      required: [true, 'Service package must have a code'],
      trim: true,
      unique: true,
    },
    ServicePackageType: {
      type: String,
      default: 'Basic',
    },
  },
  {
    timestamps: true,
  }
);
const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
module.exports = ServicePackage;
