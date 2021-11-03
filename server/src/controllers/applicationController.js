const factory = require('./handleFactory');
const Application = require('./../models/application');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
class applicationController {
  setBodyApplicationCreation = (req, res, next) => {
    req.body.jobSeeker = req.user.id;
    req.body.job = req.params.idJob;
    req.body.createdAt = Date.now();
    next();
  };
  setQueryApplicationView = (req, res, next) => {
    if (req.params.idJob) {
      req.query.job = req.params.idJob;
    }
    if (req.user) {
      req.query.jobSeeker = req.user.id;
    }
    next();
  };
  createApplication = factory.createOne(Application);
  getAllApplication = factory.getAll(Application);
  setQueryApplicationManagement = (req, res, next) => {
    if (req.query.fullName) {
      req.query.fullName = { $regex: req.query.fullName, $options: 'si' };
    }
    if (req.query.startTime || req.query.endTime) {
      if (req.query.startTime && req.query.endTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
          lte: new Date(req.query.endTime),
        };
        req.query.startTime = undefined;
        req.query.endTime = undefined;
      }
      if (req.query.startTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
        };
        req.query.startTime = undefined;
      }
      if (req.query.endTime) {
        req.query.createdAt = {
          lte: new Date(req.query.endTime),
        };
        req.query.endTime = undefined;
      }
    }
    next();
  };
  getAllApplicationManagement = catchAsync(async (req, res, next) => {
    var isExpired = undefined;
    if (!req.query.status) {
      req.query.status = 'NotSaved';
    }
    if (req.query.isExpired) {
      isExpired = req.query.isExpired;
    }
    var filter = req.query;
    if (req.params.idJob) {
      filter = { job: req.params.idJob };
    }
    const features = new APIFeatures(Application.find(), filter)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let applications = await features.query;
    applications = applications.filter((application) => {
      if (application.job.company._id == req.user.id) {
        if (!isExpired) return application;
        if (application.job.isExpired.toString() == isExpired.toString()) {
          return application;
        }
      }
    });
    res.status(200).json({
      status: 'sucess',
      results: applications.length,
      data: {
        data: applications,
      },
    });
  });
  saveApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'Saved';
    next();
  });
  deleteApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'Deleted';
    next();
  });
  restoreApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'NotSaved';
    next();
  });
  getApplication = factory.getOne(Application);
  updateApplication = factory.updateOne(Application);
}
module.exports = new applicationController();
