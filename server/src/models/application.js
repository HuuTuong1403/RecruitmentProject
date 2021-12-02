const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job',
      required: [true, 'Đơn xin việc phải tương ứng với một công việc'],
    },
    jobSeeker: {
      type: mongoose.Schema.ObjectId,
      ref: 'JobSeeker',
      required: [true, 'Đơn xin việc phải thuộc về một người tìm việc'],
    },
    cvPath: {
      type: String,
      required: [true, 'Đơn xin việc phải có CV'],
    },
    fullName: {
      type: String,
      required: [true, 'Đơn xin việc phải có họ và tên'],
    },
    description: {
      type: String,
    },
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
    status: {
      type: String,
      default: 'NotSaved',
      enum: {
        values: ['NotSaved', 'Saved', 'Deleted'],
        message: 'Trạng thái hồ sơ gồm có: NotSaved, Saved, Deleted',
      },
    },
    isAnnounced: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
applicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'job',
    select:
      'logo jobTitle companyName salary location skills createdAt finishDate slug',
  });
  this.populate({
    path: 'jobSeeker',
    select: 'email username avatar DOB address',
  });
  next();
});
const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
