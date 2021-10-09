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
    entryTest: [String],
    event: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    jobs: [String],
    logo: {
      type: String,
    },
    ot: {
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
    registeredServicePackages: [
      {
        servicePackageName: {
          type: String,
          required: [true, 'Tên gói dịch vụ là bắt buộc'],
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        postType: {
          type: String,
          required: [true, 'Gói dịch vụ phải có loại bài đăng'],
        },
        price: {
          type: Number,
        },
        paidPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        status: {
          type: String,
          default: 'Unpaid',
        },
      },
    ],
    reviews: [
      {
        Improvement: {
          type: String,
          trim: true,
        },
        Interesting: {
          type: String,
          trim: true,
        },
        OT: {
          type: String,
          trim: true,
        },
        Reviewer: {
          type: String,
          required: [true, 'Người review phải được gán'],
          trim: true,
        },
        Title: {
          type: String,
          required: [true, 'Bài review phải có tiêu đề'],
          trim: true,
        },
        Total: {
          type: Number,
        },
      },
    ],
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
const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;
