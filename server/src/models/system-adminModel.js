const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const systemAdminSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
    },
    email: {
      type: String,
      trim: true,
      validate: [validator.isEmail, 'Vui lòng cung cấp email hợp lệ'],
    },
    fullname: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Vui lòng nhập lại password'],
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password không giống nhau',
      },
    },
    phone: {
      type: String,
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
    username: {
      type: String,
      required: [true, 'Vui lòng nhập username'],
      unique: [true, 'Usename bị trùng. Vui lòng thử lại username khác'],
      trim: true,
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
systemAdminSchema.virtual('role').get(function () {
  return 'systemadmin';
});
systemAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Match the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
systemAdminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
systemAdminSchema.methods.createAuthenToken = function () {
  const authenToken = crypto.randomBytes(23).toString('hex');

  this.authenToken = crypto
    .createHash('sha256')
    .update(authenToken)
    .digest('hex');

  this.authenTokenExpired = Date.now() + 10 * 60 * 1000;
  return authenToken;
};
systemAdminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
systemAdminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const SystemAdmin = mongoose.model('SystemAdmin', systemAdminSchema);
module.exports = SystemAdmin;
