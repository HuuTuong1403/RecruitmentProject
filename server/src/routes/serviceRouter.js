const express = require('express');

const ServiceController = require('./../controllers/serviceController');
const authController = require('./../controllers/authController');

const ServiceRouter = express.Router({ mergeParams: true });
ServiceRouter.use(
  authController.protect,
  authController.restrictTo('systemmanager')
);
ServiceRouter.route('/')
  .post(ServiceController.createService)
  .get(ServiceController.getAllService);
ServiceRouter.route('/:id')
  .patch(ServiceController.updateService)
  .get(ServiceController.getService)
  .delete(ServiceController.deleteService);

ServiceRouter.route('/soft-delete/:id').delete(
  ServiceController.softDeleteService
);
ServiceRouter.route('/soft-delete/trash').get(
  ServiceController.getAllDeletedService
);
ServiceRouter.route('/soft-delete/trash/:id').get(
  ServiceController.getDeletedService
);
ServiceRouter.route('/restore/:id').patch(ServiceController.restoreService);
module.exports = ServiceRouter;
