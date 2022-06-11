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
    authController.restrictTo('jobseeker'),
    applicationController.setQueryApplicationView,
    applicationController.getAllApplication
  );
applicationRouter.use(authController.restrictTo('employer'));
applicationRouter
  .route('/management')
  .get(
    applicationController.setQueryApplicationManagement,
    applicationController.getAllApplicationManagement
  );
applicationRouter
  .route('/management/:id')
  .get(
    applicationController.setQueryApplicationManagement,
    applicationController.getAllApplicationManagement
  );
applicationRouter
  .route('/management/:id/save')
  .patch(
    applicationController.saveApplication,
    applicationController.updateApplication
  );
applicationRouter
  .route('/management/:id/delete')
  .delete(
    applicationController.deleteApplication,
    applicationController.updateApplication
  );
applicationRouter
  .route('/management/:id/restore')
  .patch(
    applicationController.restoreApplication,
    applicationController.updateApplication
  );
applicationRouter
  .route('/management/anounce-applicants')
  .post(applicationController.announceApplicants);
applicationRouter
  .route('/management/status/count')
  .get(applicationController.countAppicantsAccoridingToStatus);
applicationRouter
  .route('/management/status-job/count')
  .get(applicationController.countAppicantsAccoridingToStatusAndIdJob);
applicationRouter
  .route('/statistic/application-stat')
  .get(applicationController.getApplicationStas);
applicationRouter
  .route('/statistic/application-comp')
  .get(applicationController.getApplicationTodayYesterday);
module.exports = applicationRouter;
