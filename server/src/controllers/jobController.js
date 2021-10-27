const AppError = require('../utils/appError');
const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

class jobController {
  setCompany = (req, res, next) => {
    if (req.params.idCompany) req.query.company = req.params.idCompany;
    next();
  };
  getAllJob = factory.getAll(Job);
  getJob = factory.getOneUniqueField(
    Job,
    null,
    `-__v,-status,-candidate,-priorityLevel,-updatedAt`
  );
  createJob = factory.createOne(Job);
}
module.exports = new jobController();
