const express = require('express');

const jobController = require('./../controllers/jobController');
const authController = require('./../controllers/authController');
const jobRouter = express.Router({ mergeParams: true });

const customJobQuery = require('../middlewares/jobQuery');

const setCreateJob = require('./../middlewares/setCreateJob');
jobRouter
  .route('/')
  .get(customJobQuery.customJobQuery, jobController.getAllJob)
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    setCreateJob,
    jobController.createJob
  );
jobRouter.route('/:slug').get(jobController.getJob);

module.exports = jobRouter;
