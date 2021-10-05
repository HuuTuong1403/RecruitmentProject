const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const systemManagerSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
    },
    email: {
      type: String,
      unique: [true, 'Email bị trùng. Vui lòng thử email khác'],
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
    username: {
      type: String,
      required: [true, 'Vui lòng nhập username'],
      unique: [true, 'Usename bị trùng. Vui lòng thử lại username khác'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
systemManagerSchema.virtual('role').get(function () {
  return 'systemAdmin';
});
systemManagerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Match the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
systemManagerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const SystemManager = mongoose.model('SystemManager', systemManagerSchema);
module.exports = SystemManager;
