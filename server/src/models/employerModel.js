const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const addressSchema = require('./addressModel');

const employerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 32,
      select: false,
    },
    address: {
      type: addressSchema,
    },
    companyName: {
      type: String,
      required: [true, 'Hãy nhập tên công ty của bạn'],
      unique: [true, 'Tên công ty bị trùng. Vui lòng thử tên khác'],
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Hãy nhập email của bạn'],
      unique: [true, 'Email bị trùng. Hãy thử email khác'],
      trim: true,
      validate: [validator.isEmail, 'Hãy nhập email hợp lệ'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default: 'https://www.zodedi.com/public/uploads/testimonial-5.png',
    },
    OT: {
      type: Boolean,
      default: false,
    },
    scale: {
      type: String,
      default: 'Over 50',
    },
    phone: {
      type: String,
      required: [true, 'Hãy nhập số điện thoại của bạn'],
      unique: [true, 'Số điện thoại bị trùng. Hãy thử lại số điện thoại khác'],
      validate: {
        validator: function (val) {
          return val.match(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          );
        },
        message: 'Số điện thoại: {VALUE} không hợp lệ. Hãy thử nhập lại.',
      },
      trim: true,
    },
    description: {
      type: String,
    },
    welfare: {
      type: [String],
    },
    status: {
      type: String,
      default: 'unapproval',
    },
    TIN: {
      type: String,
    },
    companyType: {
      type: String,
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
employerSchema.virtual('role').get(function () {
  return 'employer';
});
employerSchema.virtual('jobs', {
  ref: 'Job',
  foreignField: 'company',
  localField: '_id',
});

employerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
employerSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});
employerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
employerSchema.methods.createAuthenToken = function () {
  const authenToken = crypto.randomBytes(23).toString('hex');

  this.authenToken = crypto
    .createHash('sha256')
    .update(authenToken)
    .digest('hex');

  this.authenTokenExpired = Date.now() + 10 * 60 * 1000;
  return authenToken;
};
employerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
employerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;
