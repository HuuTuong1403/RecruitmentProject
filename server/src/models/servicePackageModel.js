const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const priceSchema = new mongoose.Schema(
  {
    VND: {
      type: Number,
      default: 0,
    },
    USD: {
      type: Number,
      default: 0,
    },
    EUR: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);
const servicePackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, 'Gói dịch vụ phải có tên gói'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Gói dịch vụ phải có mô tả'],
      trim: true,
    },
    postType: {
      type: String,
      default: 'Recruitment',
      enum: {
        values: ['Recruitment', 'Event'],
        message: 'Các loại bài đăng là: Recruitment, Event',
      },
    },
    price: {
      type: priceSchema,
      required: [true, 'Gói dịch vụ phải có giá'],
    },
    servicePackageCode: {
      type: String,
      required: [true, 'Gói dịch vụ phải có mã code'],
      trim: true,
      unique: [true, 'Mã code không được trùng'],
    },
    servicePackageType: {
      type: String,
      default: 'Free',
      enum: {
        values: [
          'Free',
          'Basic',
          'ExtraBasic',
          'Premium',
          'ExtraPremium',
          'VIP',
        ],
        message:
          'Các loại gói dịch vụ là: Free, Basic, Extra Basic, Premium, Extra Premium hoặc VIP',
      },
    },
  },
  {
    timestamps: true,
  }
);
servicePackageSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
module.exports = ServicePackage;
