const AppError = require('../utils/appError');
const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

class jobController {
  setCompany = (req, res, next) => {
    if (req.user && req.user.role == 'employer') {
      console.log(req.user);
      req.query.company = req.user.id;
    }

    next();
  };
  approveJob = (req, res, next) => {
    req.body.status = 'approval';
    next();
  };
  denyJob = (req, res, next) => {
    req.body.status = 'denied';
    next();
  };
  getAllJob = factory.getAll(Job);
  getJob = factory.getOneUniqueField(
    Job,
    null,
    `-__v,-status,-candidate,-priorityLevel,-updatedAt`
  );
  getJobAccrodingtoID = factory.getOne(Job);
  createJob = factory.createOne(Job);
  updateJob = factory.updateOne(Job);
}
module.exports = new jobController();
