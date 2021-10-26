const AppError = require('../utils/appError');
const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

class jobController {
  getAllJob = factory.getAll(Job);
  getJob = factory.getOneUniqueField(
    Job,
    null,
    `-__v,-status,-candidate,-priorityLevel,-updatedAt`
  );
  createJob = factory.createOne(Job);
}
module.exports = new jobController();
