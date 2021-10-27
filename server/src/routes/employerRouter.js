const express = require('express');
const employerRouter = express.Router();

const employerController = require('./../controllers/employerController');

const authController = require('./../controllers/authController');
const uploadLogoCompany = require('./../middlewares/uploadLogoEmployer');
const getMe = require('./../middlewares/getMe');

const jobRoute = require('./jobRoutes');

employerRouter.use('/jobs', jobRoute);
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
employerRouter.route('/:companyName').get(employerController.getEmployer);

employerRouter
  .route('/')
  .post(employerController.sendInformation)
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    getMe,
    employerController.getMe
  );

employerRouter.use(authController.protect);

employerRouter.use('/:idCompany/jobs', jobRoute);
employerRouter
  .route('/updatePassword')
  .patch(
    authController.restrictTo('employer'),
    employerController.updateEmployerPassword
  );
employerRouter
  .route('/updateMe')
  .patch(
    authController.restrictTo('employer'),
    uploadLogoCompany.uploadLogoCompany,
    uploadLogoCompany.uploadLogoToCloudinary,
    employerController.updateMe
  );

module.exports = employerRouter;
