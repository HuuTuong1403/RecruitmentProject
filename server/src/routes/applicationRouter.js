const express = require('express');

const applicationRouter = express.Router({ mergeParams: true });

const applicationController = require('./../controllers/applicationController');

const uploadCV = require('./../middlewares/uploadCV');
const authController = require('./../controllers/authController');
const validator = require('./../middlewares/validator');

applicationRouter.use(authController.protect);
applicationRouter
  .route('/')
  .post(
    authController.restrictTo('jobseeker'),
    validator.checkApplicationUnique,
    uploadCV.uploadCV,
    uploadCV.uploadCVtoFirebase,
    applicationController.setBodyApplicationCreation,
    applicationController.createApplication
  )
  .get(
    authController.restrictTo('employer', 'jobseeker'),
    applicationController.setBodyApplicationView,
    applicationController.getAllApplication
  );
module.exports = applicationRouter;
