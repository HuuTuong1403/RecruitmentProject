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
orderSchema = new mongoose.Schema(
  {
    servicePackages: [
      new mongoose.Schema(
        {
          quantity: {
            type: Number,
          },
          servicePackage: {},
        },
        { _id: false }
      ),
    ],
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
    totalQuantity: {
      type: Number,
      default: 1,
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
