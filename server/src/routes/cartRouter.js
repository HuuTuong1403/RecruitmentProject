const express = require('express');
const cartRouter = express.Router({ mergeParams: true });

const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

cartRouter
  .route('/:idServicePackage')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    cartController.createCart
  )
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    cartController.updateCartItem
  )
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    cartController.deleteCartItem
  );
cartRouter
  .route('/')
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    cartController.deleteCart
  );
module.exports = cartRouter;
