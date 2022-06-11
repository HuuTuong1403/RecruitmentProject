const paypal = require('paypal-rest-sdk');
const dateFormat = require('dateformat');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const Order = require('../models/orderModel');
const configuration = require('../configuration/paypalConfiguration');
const OrderService = require('./../services/order');
paypal.configure(configuration);

class orderController {
  createPaypalPayment = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.idOrder);
    if (!order) {
      return next(new AppError('Không tìm thấy đơn hàng với id này', 404));
    }
    const itemOrder = [];
    let totalAmount = 0;
    for (let i = 0; i < order.servicePackages.length; i++) {
      itemOrder.push({
        name: order.servicePackages[i].servicePackage.packageName,
        sku: '001',
        price: order.servicePackages[i].servicePackage.price.USD,
        currency: 'USD',
        quantity: 1,
      });
      totalAmount += order.servicePackages[i].servicePackage.price.USD;
    }
    console.log(itemOrder);
    const returnUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/employer/payment/paypal?idOrder=${req.params.idOrder}&user=${
      req.user.id
    }&totalAmount=${totalAmount}`;

    const cancelUrl = `${req.protocol}://${req.get('host')}/api/v1/`;

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
      transactions: [
        {
          item_list: {
            items: itemOrder,
          },
          amount: {
            currency: 'USD',
            total: totalAmount,
          },
          description: 'Do payment service packages of MST Company',
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        return next(
          new AppError(error.response.message, error.response.httpStatusCode)
        );
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.status(200).json({
              status: 'success',
              data: {
                data: payment.links[i].href,
              },
            });
          }
        }
      }
    });
  });
  getAvailableOrder = async (req, res, next) => {
    const orders = await Order.find({
      employer: req.user.id,
      status: 'Paid',
      servicePackages: {
        $elemMatch: {
          'servicePackage.extantQuantity': { $gt: 0 },
        },
      },
    });
    let servicePackages = [];
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].servicePackages.length; j++) {
        const index = servicePackages.findIndex((item) => {
          return (
            item.servicePackage._id.toString() ===
            orders[i].servicePackages[j].servicePackage._id.toString()
          );
        });
        if (index < 0) {
          servicePackages.push(orders[i].servicePackages[j]);
        } else {
          servicePackages[index].quantity =
            servicePackages[index].quantity +
            orders[i].servicePackages[j].quantity;
          servicePackages[index].servicePackage.extantQuantity =
            servicePackages[index].servicePackage.extantQuantity +
            orders[i].servicePackages[j].servicePackage.postQuantity;
          servicePackages[index].servicePackage.postQuantity;
          servicePackages[index].servicePackage.price.USD =
            servicePackages[index].servicePackage.price.USD +
            orders[i].servicePackages[j].servicePackage.price.USD;
          servicePackages[index].servicePackage.price.VND =
            servicePackages[index].servicePackage.price.VND +
            orders[i].servicePackages[j].servicePackage.price.VND;
          servicePackages[index].servicePackage.price.EUR =
            servicePackages[index].servicePackage.price.EUR +
            orders[i].servicePackages[j].servicePackage.price.EUR;
        }
      }
    }
    res.status(200).json({
      status: 'success',
      data: { data: servicePackages },
    });
  };
  updateOrder = async (req, res, next) => {
    const response = await OrderService.updateOrder(
      req.user.id,
      req.params.idServicePackage
    );
    if (response.statusCode == 200) {
      return res.status(200).json({
        status: 'success',
        data: { data: response.data.data },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  };
  executePaypalPayment = catchAsync(async (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const idOrder = req.query.idOrder;
    const user = req.query.user;
    const totalAmount = req.query.totalAmount;
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: totalAmount,
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async function (error, payment) {
        if (error) {
          const order = await Order.findByIdAndUpdate(
            idOrder,
            {
              status: 'Canceled',
              paymentMethods: 'Paypal',
            },
            { new: true, runValidators: true }
          );
          if (!order) {
            return next(
              new AppError('Không tìm thấy đơn hàng với id này', 404)
            );
          }
          res.status(400).json({
            status: 'failed',
            data: {
              message:
                'Thanh toán đơn hàng thất bại, có lỗi xảy ra trong quá trình thanh toán',
            },
          });
        } else {
          const order = await Order.findByIdAndUpdate(
            idOrder,
            {
              status: 'Paid',
              paymentMethods: 'Paypal',
            },
            { new: true, runValidators: true }
          );
          if (!order) {
            return next(
              new AppError('Không tìm thấy đơn hàng với id này', 404)
            );
          }
          res.status(201).json({
            status: 'success',
            data: { data: order },
          });
        }
      }
    );
  });
  createVNPayPayment = catchAsync(async (req, res, next) => {
    var ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const orderServicePackage = await Order.findById(req.params.idOrder);
    if (!orderServicePackage) {
      return next(new AppError('Không tìm thấy đơn hàng với id này', 404));
    }
    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var vnpUrl = process.env.VNP_URL;
    var vnpIpnUrl = `${req.protocol}://${req.get('host')}${
      process.env.VNP_IPNURL
    }`;
    var returnUrl = `${req.protocol}://${req.get('host')}${
      process.env.VNP_RETURNURL
    }`;

    var date = new Date();
    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');

    var amount = orderServicePackage.paidPrice.VND;
    var orderInfo =
      'Thực hiện thanh toán gói dịch vụ của công ty MST thông qua VNPay';
    var orderType = '250000';
    var locale = 'vn';
    var currCode = 'VND';

    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = 'NCB';
    //vnp_Params['servicePackage'] = servicePackage.id;
    // vnp_Params['user'] = req.user.id;
    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    vnpIpnUrl +=
      '?' +
      querystring.stringify(vnp_Params, { encode: false }) +
      `&idOrder=${req.params.idOrder}&user=${req.user.id}`;
    return res.status(200).json({
      status: 'success',
      data: {
        data: {
          returnUrl: vnpUrl,
          updateUrl: vnpIpnUrl,
        },
      },
    });
  });
  getVNPayPayment = catchAsync(async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
    var idOrder = vnp_Params['idOrder'];
    var user = vnp_Params['user'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    delete vnp_Params['idOrder'];
    delete vnp_Params['user'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.VNP_HASHSECRET;
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const order = await Order.findByIdAndUpdate(
        idOrder,
        {
          status: 'Paid',
          paymentMethods: 'VNPay',
        },
        { new: true, runValidators: true }
      );
      if (!order) {
        return next(new AppError('Không tìm thấy đơn hàng với id này', 404));
      }
      res.status(201).json({
        status: 'success',
        data: { data: order },
      });
    } else {
      const order = await Order.findByIdAndUpdate(
        idOrder,
        {
          status: 'Canceled',
          paymentMethods: 'VNPay',
        },
        { new: true, runValidators: true }
      );
      if (!order) {
        return next(new AppError('Không tìm thấy đơn hàng với id này', 404));
      }
      res.status(400).json({
        status: 'failed',
        data: {
          message:
            'Thanh toán đơn hàng thất bại, có lỗi xảy ra trong quá trình thanh toán',
        },
      });
    }
  });
  returnVNPayPayment = catchAsync(async (req, res, next) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res.status(200).json({ RspCode: '00', Message: 'success' });
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
  });
  createOrder = factory.createOne(Order);
  getAllOrder = factory.getAll(Order);
  getOrder = factory.getOne(Order);
  // getParticipantStat = catchAsync(async (req, res, next) => {
  //   const participant = await Participant.aggregate([
  //     {
  //       $lookup: {
  //         from: 'events', /// Name collection from database, not name from exported schema
  //         localField: 'event',
  //         foreignField: '_id',
  //         as: 'fromevent',
  //       },
  //     },
  //     {
  //       $unwind: '$fromevent',
  //     }, //
  //     {
  //       $match: {
  //         'fromevent.company': mongoose.Types.ObjectId(req.user.id),
  //       },
  //     },
  //     {
  //       $group: { _id: '$fromevent.eventName', count: { $sum: 1 } },
  //     },
  //   ]);
  //   res.status(200).json({
  //     status: 'success',
  //     lengh: participant.length,
  //     data: {
  //       data: participant,
  //     },
  //   });
  // });
  //updateOrder = factory.updateOne(Order);
}
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

module.exports = new orderController();
