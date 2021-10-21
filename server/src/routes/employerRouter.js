const express = require('express');
const employerRouter = express.Router();
const employerController = require('./../controllers/employerController');
const authController = require('./../controllers/authController');
const uploadLogoCompany = require('./../middlewares/uploadLogoEmployer');
employerRouter.route('/login').post(authController.loginEmployer);
employerRouter
  .route('/authentication/:token')
  .get(authController.confirmEmployerEmail);
employerRouter
  .route('/forgotPassword')
  .post(authController.forgotEmployerPassword);
employerRouter
  .route('/resetPassword/:token')
  .patch(authController.resetEmployerPassword);
employerRouter
  .route('/updatePassword')
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    employerController.updateEmployerPassword
  );
employerRouter
  .route('/updateMe')
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    uploadLogoCompany.uploadLogoCompany,
    uploadLogoCompany.uploadLogoToCloudinary,
    employerController.updateMe
  );
employerRouter
  .route('/')
  .post(employerController.sendInformation)
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    employerController.getEmployer
  );
module.exports = employerRouter;
