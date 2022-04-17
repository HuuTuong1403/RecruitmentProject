// const paypal = require('paypal-rest-sdk');
// const dateFormat = require('dateformat');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const factory = require('./handleFactory');
// const Booking = require('./../models/bookingModel');
// const ServicePackage = require('./../models/servicePackageModel');
// const configuration = require('./../configuration/paypalConfiguration');
// const currency = require('./../services/currency');
// const createBooking = require('./../utils/createBooking');
// paypal.configure(configuration);

// class bookingController {
//   createPaypalPayment = catchAsync(async (req, res, next) => {
//     const servicePackage = await ServicePackage.findById(
//       req.params.idServicePackage
//     );

//     const returnUrl = `${req.protocol}://${req.get(
//       'host'
//     )}/api/v1/employer/payment/paypal?servicePackage=${servicePackage.id}&USD=${
//       req.body.paidPrice.USD
//     }&user=${req.user.id}`;

//     const cancelUrl = `${req.protocol}://${req.get('host')}/api/v1/`;

//     const create_payment_json = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: returnUrl,
//         cancel_url: cancelUrl,
//       },
//       transactions: [
//         {
//           item_list: {
//             items: [
//               {
//                 name: servicePackage.packageName,
//                 sku: '001',
//                 price: servicePackage.price.USD,
//                 currency: 'USD',
//                 quantity: 1,
//               },
//             ],
//           },
//           amount: {
//             currency: 'USD',
//             total: req.body.paidPrice.USD,
//           },
//           description: servicePackage.description,
//         },
//       ],
//     };

//     paypal.payment.create(create_payment_json, function (error, payment) {
//       if (error) {
//         throw error;
//       } else {
//         for (let i = 0; i < payment.links.length; i++) {
//           if (payment.links[i].rel === 'approval_url') {
//             return res.status(200).json({
//               status: 'success',
//               data: {
//                 data: payment.links[i].href,
//               },
//             });
//           }
//         }
//       }
//     });
//   });
//   setBodyPaidPrice = async (req, res, next) => {
//     if (req.query.USD) {
//       const VND = await currency.USDtoVNDExchange(req.query.USD);
//       const EUR = await currency.USDtoEURExchange(req.query.USD);
//       req.body.paidPrice = {
//         VND,
//         USD: req.query.USD,
//         EUR,
//       };
//       req.query.USD = undefined;
//     }
//     if (req.query.VND) {
//       const USD = await currency.VNDtoUSDExchange(req.body.VND);
//       const EUR = await currency.VNDtoEURExchange(req.body.VND);
//       req.body.price = {
//         VND: req.body.VND,
//         USD,
//         EUR,
//       };
//       req.query.VND = undefined;
//     }
//     next();
//   };
//   setQueryAvailableBooking = async (req, res, next) => {
//     req.query.employer = req.user.id;
//     req.query.status = 'Paid';
//     req.query['servicePackage.extantQuantity'] = { gt: 0 };
//     next();
//   };
//   executePaypalPayment = catchAsync(async (req, res, next) => {
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId;
//     const paidPrice = req.body.paidPrice;
//     const idServicePackage = req.query.servicePackage;
//     const user = req.query.user;

//     const execute_payment_json = {
//       payer_id: payerId,
//       transactions: [
//         {
//           amount: {
//             currency: 'USD',
//             total: paidPrice.USD,
//           },
//         },
//       ],
//     };
//     paypal.payment.execute(
//       paymentId,
//       execute_payment_json,
//       async function (error, payment) {
//         if (error) {
//           throw error;
//         } else {
//           const servicePackage = await ServicePackage.findById(
//             idServicePackage
//           );
//           const booking = await createBooking(
//             user,
//             servicePackage,
//             paidPrice,
//             'Paypal'
//           );
//           res.status(201).json({
//             status: 'success',
//             data: { data: booking },
//           });
//         }
//       }
//     );
//   });
//   createVNPayPayment = catchAsync(async (req, res, next) => {
//     var ipAddr =
//       req.headers['x-forwarded-for'] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress;

//     const servicePackage = await ServicePackage.findById(
//       req.params.idServicePackage
//     );

//     var tmnCode = process.env.VNP_TMNCODE;
//     var secretKey = process.env.VNP_HASHSECRET;
//     var vnpUrl = process.env.VNP_URL;
//     var vnpIpnUrl = `${req.protocol}://${req.get('host')}${
//       process.env.VNP_IPNURL
//     }`;
//     var returnUrl = `${req.protocol}://${req.get('host')}${
//       process.env.VNP_RETURNURL
//     }`;

//     var date = new Date();
//     var createDate = dateFormat(date, 'yyyymmddHHmmss');
//     var orderId = dateFormat(date, 'HHmmss');

//     var amount = req.body.paidPrice.VND;
//     var orderInfo = servicePackage.description;
//     var orderType = '250000';
//     var locale = 'vn';
//     var currCode = 'VND';

//     var vnp_Params = {};
//     vnp_Params['vnp_Version'] = '2.1.0';
//     vnp_Params['vnp_Command'] = 'pay';
//     vnp_Params['vnp_TmnCode'] = tmnCode;
//     vnp_Params['vnp_Locale'] = locale;
//     vnp_Params['vnp_CurrCode'] = currCode;
//     vnp_Params['vnp_TxnRef'] = orderId;
//     vnp_Params['vnp_OrderInfo'] = orderInfo;
//     vnp_Params['vnp_OrderType'] = orderType;
//     vnp_Params['vnp_Amount'] = amount * 100;
//     vnp_Params['vnp_ReturnUrl'] = returnUrl;
//     vnp_Params['vnp_IpAddr'] = ipAddr;
//     vnp_Params['vnp_CreateDate'] = createDate;
//     vnp_Params['vnp_BankCode'] = 'NCB';
//     //vnp_Params['servicePackage'] = servicePackage.id;
//     // vnp_Params['user'] = req.user.id;
//     vnp_Params = sortObject(vnp_Params);

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require('crypto');
//     var hmac = crypto.createHmac('sha512', secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
//     vnp_Params['vnp_SecureHash'] = signed;
//     vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
//     vnpIpnUrl +=
//       '?' +
//       querystring.stringify(vnp_Params, { encode: false }) +
//       `&servicePackage=${servicePackage.id}&user=${req.user.id}&VND=${req.body.paidPrice.VND}`;
//     return res.status(200).json({
//       status: 'success',
//       data: {
//         data: {
//           returnUrl: vnpUrl,
//           updateUrl: vnpIpnUrl,
//         },
//       },
//     });
//   });
//   getVNPayPayment = catchAsync(async (req, res, next) => {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params['vnp_SecureHash'];
//     var idServicePackage = vnp_Params['servicePackage'];
//     var user = vnp_Params['user'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];
//     delete vnp_Params['servicePackage'];
//     delete vnp_Params['user'];
//     delete vnp_Params['VND'];

//     vnp_Params = sortObject(vnp_Params);
//     var secretKey = process.env.VNP_HASHSECRET;
//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require('crypto');
//     var hmac = crypto.createHmac('sha512', secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

//     if (secureHash === signed) {
//       const paidPrice = req.body.paidPrice;
//       const servicePackage = await ServicePackage.findById(idServicePackage);
//       const booking = await createBooking(
//         user,
//         servicePackage,
//         paidPrice,
//         'VNPay'
//       );
//       res.status(201).json({
//         status: 'success',
//         data: { data: booking },
//       });
//     } else {
//       res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
//     }
//   });
//   returnVNPayPayment = catchAsync(async (req, res, next) => {
//     var vnp_Params = req.query;

//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);

//     var tmnCode = process.env.VNP_TMNCODE;
//     var secretKey = process.env.VNP_HASHSECRET;

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require('crypto');
//     var hmac = crypto.createHmac('sha512', secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
//     if (secureHash === signed) {
//       //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
//       res.status(200).json({ RspCode: '00', Message: 'success' });
//     } else {
//       res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
//     }
//   });
//   createBooking = factory.createOne(Booking);
//   getAllBooking = factory.getAll(Booking);
//   getBooking = factory.getOne(Booking);
//   updateBooking = factory.updateOne(Booking);
// }
// function sortObject(obj) {
//   var sorted = {};
//   var str = [];
//   var key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       str.push(encodeURIComponent(key));
//     }
//   }
//   str.sort();
//   for (key = 0; key < str.length; key++) {
//     sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
//   }
//   return sorted;
// }

// module.exports = new bookingController();
