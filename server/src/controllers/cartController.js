const factory = require('./handleFactory');
const ServicePackage = require('./../models/servicePackageModel');
const catchAsync = require('../utils/catchAsync');
const CartService = require('./../services/cart');
const AppError = require('./../utils/appError');

class CartController {
  getCart = catchAsync(async (req, res, next) => {
    const response = await CartService.getCart(req.user.id);
    if (response.statusCode == 200) {
      return res.status(200).json({
        status: 'success',
        data: { data: response.data.data },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  });
  createCart = catchAsync(async (req, res, next) => {
    const servicePackage = await ServicePackage.findById(
      req.params.idServicePackage,
      {
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    if (!servicePackage) {
      return next(new AppError('Không tìm thấy gói dịch vụ', 404));
    }
    const response = await CartService.createCart(
      req.user.id,
      servicePackage,
      req.body.paidPrice
    );
    if (response.statusCode == 201) {
      return res.status(201).json({
        status: 'success',
        data: { data: response.data.data },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  });
  updateCartItem = catchAsync(async (req, res, next) => {
    const response = await CartService.updateCartItem(
      req.user.id,
      req.params.idServicePackage,
      req.body.quantity
    );
    if (response.statusCode == 200) {
      return res.status(200).json({
        status: 'success',
        data: { data: response.data.data },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  });
  deleteCart = catchAsync(async (req, res, next) => {
    const response = await CartService.deleteCart(req.user.id);
    if (response.statusCode == 204) {
      return res.status(204).json({
        status: 'success',
        data: { data: response.messsage },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  });
  deleteCartItem = catchAsync(async (req, res, next) => {
    const response = await CartService.deleteCartItem(
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
  });
  checkoutCart = catchAsync(async (req, res, next) => {
    const response = await CartService.checkoutCart(req.user.id);
    if (response.statusCode == 201) {
      return res.status(201).json({
        status: 'success',
        data: { data: response.data.data },
      });
    }
    return next(new AppError(response.messsage, response.statusCode));
  });
}
module.exports = new CartController();
