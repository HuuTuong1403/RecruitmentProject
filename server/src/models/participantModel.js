const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const participantSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
    address: { type: addressSchema },
    status: { type: String, default: 'Not participate' },
    participant: { type: mongoose.Schema.ObjectId, ref: 'JobSeeker' },
    phone: {
      type: String,
      required: [true, 'Hãy nhập số điện thoại'],
      trim: true,
      validate: {
        validator: function (val) {
          return val.match(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          );
        },
        message: 'Số điện thoại {VALUE} là không hợp lệ. Vui lòng thử lại.',
      },
    },
    fullName: {
      type: String,
      required: [true, 'Hãy nhập họ và tên'],
      trim: true,
    },
    interestingField: [String],
    linkCV: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
