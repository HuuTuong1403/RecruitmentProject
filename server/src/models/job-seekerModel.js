const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const addressSchema = require('./addressModel');

const jobSeekerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Hãy nhập email của bạn'],
      unique: [true, 'Email bị trùng. Vui lòng thử email khác'],
      trim: true,
      validate: [validator.isEmail, 'Vui lòng cung cấp email hợp lệ'],
    },
    phone: {
      type: String,
      required: [true, 'Hãy nhập số điện thoại'],
      unique: [true, 'Số điện thoại bị trùng. Vui lòng thử số điện thoại khác'],
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
    fullname: {
      type: String,
      required: [true, 'Hãy nhập họ và tên của bạn'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Vui lòng nhập username'],
      unique: [true, 'Username bị trùng. Vui lòng thử lại username khác'],
      trim: true,
      minlength: 8,
      maxlength: 32,
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập password của bạn'],
      trim: true,
      minlength: 8,
      maxlength: 32,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Vui lòng nhập lại password của bạn'],
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password không giống nhau',
      },
    },
    DOB: {
      type: Date,
    },
    address: {
      type: addressSchema,
    },
    avatar: {
      type: String,
      default: 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
    },
    google: {
      type: String,
    },
    facebook: {
      type: String,
    },
    applied: [String],
    entryTests: [String],
    event: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    authenToken: String,
    authenTokenExpired: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
jobSeekerSchema.virtual('role').get(function () {
  return 'jobseeker';
});
jobSeekerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Match the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
jobSeekerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});
jobSeekerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
jobSeekerSchema.methods.createAuthenToken = function () {
  const authenToken = crypto.randomBytes(23).toString('hex');

  this.authenToken = crypto
    .createHash('sha256')
    .update(authenToken)
    .digest('hex');

  this.authenTokenExpired = Date.now() + 10 * 60 * 1000;
  return authenToken;
};
jobSeekerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
jobSeekerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = JobSeeker;
