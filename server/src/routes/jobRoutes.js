const express = require('express');

const jobController = require('./../controllers/jobController');
const authController = require('./../controllers/authController');
const jobRouter = express.Router({ mergeParams: true });

const customJobQuery = require('../middlewares/jobQuery');
const validator = require('./../middlewares/validator');
const setCreateJob = require('./../middlewares/setCreateJob');
const applicationRouter = require('./applicationRouter');

jobRouter.use('/:idJob/applications', applicationRouter);
jobRouter
  .route('/')
  .get(
    customJobQuery.customJobQuery,
    jobController.setCompany,
    jobController.getAllJob
  )
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    setCreateJob,
    jobController.createJob
  );
jobRouter.route('/:slug').get(jobController.getJob);

jobRouter.use(authController.protect);

jobRouter
  .route('/soft-delete/:id')
  .delete(
    authController.restrictTo('systemmanager', 'employer'),
    jobController.softDeleteJob
  );
jobRouter
  .route('/restore/:id')
  .patch(
    authController.restrictTo('systemmanager', 'employer'),
    jobController.restoreJob
  );
jobRouter
  .route('/soft-delete/trash')
  .get(
    authController.restrictTo('systemmanager', 'employer'),
    jobController.setCompany,
    jobController.getAllDeletedJob
  );
jobRouter
  .route('/soft-delete/trash/:id')
  .get(
    authController.restrictTo('systemmanager', 'employer'),
    jobController.getDeletedJob
  );

jobRouter
  .route('/view/all')
  .get(authController.restrictTo('systemmanager'), jobController.getAllJob);
jobRouter
  .route('/view/:id')
  .get(
    authController.restrictTo('systemmanager'),
    jobController.getJobAccrodingtoID
  );
jobRouter
  .route('/:id/approve')
  .patch(
    authController.restrictTo('systemmanager'),
    jobController.approveJob,
    jobController.updateJob
  );
jobRouter
  .route('/:id/deny')
  .patch(
    authController.restrictTo('systemmanager'),
    jobController.denyJob,
    jobController.updateJob
  );
jobRouter
  .route('/:id')
  .patch(
    authController.restrictTo('employer'),
    validator.checkStatusWhenUpdateJob,
    jobController.updateJob
  );
jobRouter
  .route('/hard-delete/:id')
  .delete(authController.restrictTo('systemmanager'), jobController.deleteJob);
module.exports = jobRouter;
