const express = require('express');

const servicePackageController = require('./../controllers/servicePackageController');
const authController = require('./../controllers/authController');

const servicePackageRouter = express.Router({ mergeParams: true });

servicePackageRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('systemmanager'),
    servicePackageController.setBodyServicePackage,
    servicePackageController.createServicePackage
  )
  .get(servicePackageController.getAllServicePackage);
servicePackageRouter
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('systemmanager'),
    servicePackageController.setBodyServicePackage,
    servicePackageController.updateServicePackage
  )
  .delete(
    authController.protect,
    authController.restrictTo('systemmanager'),
    servicePackageController.deleteServicePackage
  )
  .get(servicePackageController.getServicePackage);
servicePackageRouter.use(
  authController.protect,
  authController.restrictTo('systemmanager')
);
servicePackageRouter
  .route('/soft-delete/:id')
  .delete(servicePackageController.softDeleteServicePackage);
servicePackageRouter
  .route('/soft-delete/trash')
  .get(servicePackageController.getAllDeletedServicePackage);
servicePackageRouter
  .route('/soft-delete/trash/:id')
  .get(servicePackageController.getDeletedServicePackage);
servicePackageRouter
  .route('/restore/:id')
  .patch(servicePackageController.restoreServicePackage);
module.exports = servicePackageRouter;
