const express = require('express');
const orderRouter = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

orderRouter
  .route('/paypal/:idOrder')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    orderController.createPaypalPayment
  );
orderRouter.route('/paypal').get(orderController.executePaypalPayment);
orderRouter
  .route('/vnpay/:idOrder')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    orderController.createVNPayPayment
  );
orderRouter.route('/vnpay').get(orderController.returnVNPayPayment);
orderRouter.route('/vnpay/vnpay_ipn').get(orderController.getVNPayPayment);
orderRouter
  .route('/available')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    orderController.getAvailableOrder
  );
orderRouter
  .route('/available/:idServicePackage')
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    orderController.updateOrder
  );

orderRouter
  .route('/statistic/order-stats')
  .get(
    authController.protect,
    authController.restrictTo('systemmanager'),
    orderController.getOrderStat
  );
orderRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    orderController.getOrder
  )
  .patch(orderController.updateOrder);
orderRouter
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrder);
module.exports = orderRouter;
