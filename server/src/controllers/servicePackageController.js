const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');
const currency = require('./../services/currency');
const ServicePackage = require('./../models/servicePackageModel');
const Service = require('./../models/serviceModel');
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
  setSerivesBody = async (req, res, next) => {
    if (req.body.services) {
      const servicePromises = req.body.services.map(
        async (id) =>
          await Service.findById(id, {
            serviceName: 1,
            description: 1,
            price: 1,
          })
      );
      req.body.services = await Promise.all(servicePromises);
      if (req.body.VND) {
        req.body.VND = 0;
        for (var item of req.body.services) {
          req.body.VND += item.price;
        }
      }
    }
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
