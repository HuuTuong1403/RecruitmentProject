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
      required: [true, 'Sự kiến phải có mô tả vắn tắt'],
      trim: true,
    },
    endTime: {
      type: Date,
      required: [true, 'Sự kiện phải có thời gian kết thúc'],
    },
    eventContent: {
      type: String,
      required: [true, 'Sự kiện phải có nội dung'],
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, 'Sự kiện phải có tên sự kiện'],
      trim: true,
    },
    eventOrganizer: {
      type: String,
      required: [true, 'Sự kiện phải có đơn vị tổ chức'],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Sự kiện phải có hình ảnh cover'],
    },
    images: [String],
    location: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Sự kiện phải có thời gian bắt đầu'],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
