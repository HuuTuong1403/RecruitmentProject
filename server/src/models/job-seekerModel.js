const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const addressSchema = require('./addressModel');

const jobSeekerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Tell us your email'],
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
      validate: [validator.isEmail, 'Please provide your valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Tell us your number phone'],
      unique: [
        true,
        "Phone number is duplicated. Let's try another phone number",
      ],
      trim: true,
      validate: {
        validator: function (val) {
          return val.match(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          );
        },
        message: 'Number phone {VALUE} is invalid. Please try again.',
      },
    },
    fullname: {
      type: String,
      required: [true, 'Please provide your fullname'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: [true, "Usename is duplicated. Let's try another username"],
      trim: true,
      minlength: 8,
      maxlength: 32,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      trim: true,
      minlength: 8,
      maxlength: 32,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'You must confirm your password'],
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password are not the same',
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
jobSeekerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = JobSeeker;
