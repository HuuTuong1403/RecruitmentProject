const mongoose = require('mongoose');

addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    country: {
      type: String,
      default: 'Việt Nam',
    },
    district: {
      type: String,
    },
    street: {
      type: String,
      trim: true,
    },
    ward: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = addressSchema;
