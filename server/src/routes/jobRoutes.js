const express = require('express');
const jobController = require('./../controllers/jobController');
const jobRouter = express.Router();
const customJobQuery = require('../middlewares/jobQuery');

jobRouter
  .route('/')
  .get(customJobQuery.customJobQuery, jobController.getAllJob);
jobRouter.route('/:id').get(jobController.getJob);

module.exports = jobRouter;
