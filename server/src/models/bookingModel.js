const mongoose = require('mongoose');
const ServicePackage = require('./servicePackageModel');
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
bookingSchema = new mongoose.Schema(
  {
    servicePackage: {
      type: {},
      require: [true, 'Đơn hàng phải có gói dịch vụ'],
    },
    employer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
      require: [true, 'Nhà tuyển dụng không được trống'],
    },
    price: {
      type: priceSchema,
      require: [true, 'Đơn giá không được để trống'],
    },
    paidPrice: {
      type: priceSchema,
      require: [true, 'Thành tiền không được để trống'],
    },
    status: {
      type: String,
      default: 'NotPaid',
      enum: {
        values: ['NotPaid', 'Paid', 'Canceled', 'Fail'],
        message: 'Các trạng thái thanh toán là: NotPaid, Paid, Canceled, Fail',
      },
    },
    paymentMethods: {
      type: String,
      enum: {
        values: ['Paypal', 'VNPay'],
        message: 'Các phương thức thanh toán là: Paypal, VNPay',
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
bookingSchema.pre('save', async function (next) {
  const embededServicePackage = await ServicePackage.findById(
    this.servicePackage
  );
  this.servicePackage = embededServicePackage;
  next();
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
