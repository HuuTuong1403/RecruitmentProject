const express = require('express');
const jobController = require('./../controllers/jobController');
const jobRouter = express.Router();
const customJobQuery = require('./../middlewares/customJobQuery');

jobRouter
  .route('/')
  .get(customJobQuery.customJobQuery, jobController.getAllJob);

module.exports = jobRouter;
