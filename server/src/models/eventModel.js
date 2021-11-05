const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const eventSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
    },
    address: {
      type: addressSchema,
    },
    briefDescription: {
      type: String,
      required: [true, 'Event must have brief description'],
      trim: true,
    },
    endTime: {
      type: Date,
      required: [true, 'Event must have finish time'],
    },
    eventContent: {
      type: String,
      required: [true, 'Event must have content'],
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event must have name'],
      trim: true,
    },
    eventOrganizer: {
      type: String,
      required: [true, 'Event must have organizer'],
      trim: true,
    },
    imageCover: String,
    images: [String],
    location: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Event must have start time'],
    },
    status: {
      type: String,
      default: 'NotYetOccur',
      enum: {
        values: ['NotYetOccur', 'Occurring', 'Pausing', 'Finish'],
        message:
          'Trạng thái hồ sơ gồm có: NotYetOccur, Occurring, Pausing, Finish ',
      },
    },
    topic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
