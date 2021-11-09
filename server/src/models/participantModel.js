const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const Event = require('./eventModel');
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
participantSchema.index({ event: 1, participant: 1 }, { unique: true });
participantSchema.statics.calcParticipantQuantity = async function (eventID) {
  const stats = await this.aggregate([
    {
      $match: { event: eventID },
    },
    {
      $group: {
        _id: '$event',
        nQuantity: { $sum: 1 },
      },
    },
  ]);
  if (stats.length > 0) {
    await Event.findByIdAndUpdate(eventID, {
      participantQuantity: stats[0].nQuantity,
    });
  } else {
    await Event.findByIdAndUpdate(eventID, {
      participantQuantity: 0,
    });
  }
};
participantSchema.post('save', async function () {
  this.constructor.calcParticipantQuantity(this.event);
});
participantSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'event',
    select:
      'company address eventName eventOrganizer imageCover location startTime status topic slug',
  });
  this.populate({
    path: 'participant',
    select: 'email username avatar DOB address',
  });
  next();
});
participantSchema.post(/^findOneAnd/, async function (doc) {
  // await this.findOne(); does NOT work here, query has already executed
  await doc.constructor.calcParticipantQuantity(this.event);
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
