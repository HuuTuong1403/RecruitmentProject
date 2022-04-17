const express = require('express');
const bookingRouter = express.Router({ mergeParams: true });

const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

bookingRouter
  .route('/paypal/:idServicePackage')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    bookingController.createPaypalPayment
  );
bookingRouter
  .route('/paypal')
  .get(
    bookingController.setBodyPaidPrice,
    bookingController.executePaypalPayment
  );
bookingRouter
  .route('/vnpay/:idServicePackage')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    bookingController.createVNPayPayment
  );
bookingRouter.route('/vnpay').get(bookingController.returnVNPayPayment);
bookingRouter
  .route('/vnpay/vnpay_ipn')
  .get(bookingController.setBodyPaidPrice, bookingController.getVNPayPayment);
bookingRouter
  .route('/available')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    bookingController.setQueryAvailableBooking,
    bookingController.getAllBooking
  );
bookingRouter
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking);
bookingRouter
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getAllBooking);
module.exports = bookingRouter;
