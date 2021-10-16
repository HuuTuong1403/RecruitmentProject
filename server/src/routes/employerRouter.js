const express = require('express');
const employerRouter = express.Router();
const employerController = require('./../controllers/employerController');
const authController = require('./../controllers/authController');

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
  .route('/')
  .post(employerController.sendInformation)
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    employerController.getEmployer
  );
module.exports = employerRouter;
