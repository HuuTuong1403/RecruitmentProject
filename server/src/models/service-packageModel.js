const mongoose = require('mongoose');

const servicePackageSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Service package must have description'],
      trim: true,
    },
    postType: {
      type: String,
      default: 'Recruitment',
    },
    price: {
      type: Number,
      required: [true, 'Service package must have price'],
    },
    servicePackageCode: {
      type: String,
      required: [true, 'Service package must have a code'],
      trim: true,
      unique: true,
    },
    servicePackageType: {
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
