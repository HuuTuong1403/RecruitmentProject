const express = require('express');

const jobController = require('./../controllers/jobController');
const authController = require('./../controllers/authController');
const jobRouter = express.Router({ mergeParams: true });

const customJobQuery = require('../middlewares/jobQuery');

const setCreateJob = require('./../middlewares/setCreateJob');

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

jobRouter.use(
  authController.protect,
  authController.restrictTo('systemmanager')
);
jobRouter.route('/view/all').get(jobController.getAllJob);
jobRouter.route('/view/:id').get(jobController.getJobAccrodingtoID);
jobRouter
  .route('/:id/approve')
  .patch(jobController.approveJob, jobController.updateJob);
jobRouter
  .route('/:id/deny')
  .patch(jobController.denyJob, jobController.updateJob);
module.exports = jobRouter;
