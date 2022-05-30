const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Service = require('./serviceModel');
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
    services: {
      type: [{}],
      required: [true, 'Gói dịch vụ phải có ít nhất một dịch vụ'],
    },
    extantQuantity: {
      type: Number,
      required: [true, 'Gói dịch vụ phải có số lượng còn lại của bài đăng'],
    },
    postQuantity: {
      type: Number,
      required: [true, 'Gói dịch vụ phải có số lượng bài đăng'],
    },
  },
  {
    timestamps: true,
  }
);
servicePackageSchema.pre('save', async function (next) {
  const servicePromises = this.services.map(
    async (id) =>
      await Service.findById(id, {
        serviceName: 1,
        description: 1,
        price: 1,
        tags: 1,
      })
  );
  this.services = await Promise.all(servicePromises);
  next();
});
servicePackageSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
module.exports = ServicePackage;
