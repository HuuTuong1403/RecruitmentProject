const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');
const currency = require('./../services/currency');
const ServicePackage = require('./../models/servicePackageModel');

class servicePackageController {
  setBodyServicePackage = async (req, res, next) => {
    if (req.body.VND) {
      const USD = await currency.VNDtoUSDExchange(req.body.VND);
      const EUR = await currency.VNDtoEURExchange(req.body.VND);
      req.body.price = {
        VND: req.body.VND,
        USD,
        EUR,
      };
      req.body.VND = undefined;
    }
    req.body.extantQuantity = req.body.postQuantity;
    next();
  };
  createServicePackage = factory.createOne(ServicePackage);
  updateServicePackage = factory.updateOne(ServicePackage);
  softDeleteServicePackage = factory.softDeleteOne(ServicePackage);
  getAllDeletedServicePackage = factory.getDeletedAll(ServicePackage);
  getDeletedServicePackage = factory.getDeletedOne(ServicePackage);
  restoreServicePackage = factory.restoreOne(ServicePackage);
  getAllServicePackage = factory.getAll(ServicePackage);
  getServicePackage = factory.getOne(ServicePackage);
  deleteServicePackage = factory.deleteOne(ServicePackage);
}
module.exports = new servicePackageController();
