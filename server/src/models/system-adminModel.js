const mongoose = require('mongoose');

const systemAdminSchema = new mongoose.Schema(
  {
    Avartar: {
      type: String,
    },
    Email: {
      type: String,
      unique: [true, "Email is duplicated. Let's try another email"],
      trim: true,
    },
    FullName: {
      type: String,
      required: [true, 'Account must have a fullname'],
      trim: true,
    },
    Password: {
      type: String,
      required: [true, 'Account must have a password'],
      trim: true,
    },
    Phone: {
      type: String,
      unique: [
        true,
        "Phone number is duplicated. Let's try another phone number",
      ],
      trim: true,
    },
    Usename: {
      type: String,
      required: [true, 'Account must have a username'],
      unique: [true, "Usename is duplicated. Let's try another username"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const SystemAdmin = mongoose.model('SystemAdmin', systemAdminSchema);
module.exports = SystemAdmin;
