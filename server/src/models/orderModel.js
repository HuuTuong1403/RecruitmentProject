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
            default: 1,
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
orderSchema.pre('save', async function (next) {
  const servicePackagePromises = this.servicePackages.map(async (item) => {
    return {
      quantity: this.servicePackages.quantity,
      servicePackage: await ServicePackage.findById(item.servicePackage, {
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }),
    };
  });
  this.servicePackages = await Promise.all(servicePackagePromises);
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
