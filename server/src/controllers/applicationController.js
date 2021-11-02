const factory = require('./handleFactory');
const Application = require('./../models/application');
const catchAsync = require('../utils/catchAsync');
class applicationController {
  setBodyApplicationCreation = (req, res, next) => {
    req.body.jobSeeker = req.user.id;
    req.body.job = req.params.idJob;
    next();
  };
  setBodyApplicationView = (req, res, next) => {
    if (req.params.idJob) {
      req.query.job = req.params.idJob;
    }
    if (req.user && req.user.role == 'jobseeker') {
      req.query.jobSeeker = req.user.id;
    }
    next();
  };
  createApplication = factory.createOne(Application);
  getAllApplication = factory.getAll(Application);
}
module.exports = new applicationController();
