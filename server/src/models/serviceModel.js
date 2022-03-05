const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Tên dịch vụ không được trống'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Dịch vụ phải có mô tả'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Dịch vụ phải có giá'],
    },
  },
  {
    timestamps: true,
  }
);
serviceSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: true,
});
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
