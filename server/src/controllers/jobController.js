const AppError = require('../utils/appError');
const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

class jobController {
  setCompany = (req, res, next) => {
    if (req.user && req.user.role == 'employer') {
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
  getAllDeletedJob = factory.getDeletedAll(Job);
  getDeletedJob = factory.getDeletedOne(Job);
  getAllJob = factory.getAll(Job, 'Job');
  getJob = factory.getOneUniqueField(
    Job,
    null,
    `-__v,-status,-candidate,-priorityLevel,-updatedAt`
  );
  getJobAccrodingtoID = factory.getOne(Job);
  createJob = factory.createOne(Job);
  updateJob = factory.updateOne(Job);
  softDeleteJob = factory.softDeleteOne(Job);
  restoreJob = factory.restoreOne(Job);
  deleteJob = factory.deleteOne(Job);
}
module.exports = new jobController();
