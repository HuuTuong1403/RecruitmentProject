const express = require('express');
const employerRouter = express.Router({ mergeParams: true });

const employerController = require('./../controllers/employerController');

const authController = require('./../controllers/authController');
const uploadLogoCompany = require('./../middlewares/uploadLogoEmployer');
const getMe = require('./../middlewares/getMe');

const jobRoute = require('./jobRoutes');
const reviewRouter = require('./reviewRouter');
const applicationRouter = require('./applicationRouter');
const eventRouter = require('./eventRouter');
const participantRouter = require('./participantRouter');

employerRouter.use('/applications', applicationRouter);
employerRouter.use('/reviews', reviewRouter);
employerRouter.use(
  '/events',
  authController.protect,
  authController.restrictTo('employer'),
  eventRouter
);
employerRouter.use('/participants', participantRouter);
employerRouter.use(
  '/jobs',
  authController.protect,
  authController.restrictTo('employer'),
  jobRoute
);

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
employerRouter
  .route('/statistic/employer-comp')
  .get(
    authController.restrictTo('systemmanager', 'systemadmin'),
    employerController.getEmployerComp
  );
employerRouter
  .route('/statistic/employer-stat')
  .get(
    authController.restrictTo('systemmanager', 'systemadmin'),
    employerController.getEmployerStat
  );
employerRouter.use(authController.restrictTo('employer'));
employerRouter.use('/jobs', jobRoute);
employerRouter
  .route('/updatePassword')
  .patch(employerController.updateEmployerPassword);
employerRouter
  .route('/updateMe')
  .patch(
    uploadLogoCompany.uploadLogoCompany,
    uploadLogoCompany.uploadLogoToCloudinary,
    employerController.updateMe
  );

module.exports = employerRouter;
