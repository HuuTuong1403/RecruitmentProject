const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

class jobController {
  getAllJob = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Job.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const jobs = await features.query;
    res.status(200).json({
      status: 'success',
      length: jobs.length,
      data: {
        job: jobs,
      },
    });
  });
  getJob = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Job.findOne(req.query), {
      fields: `-__v,-status,-candidate,-priorityLevel,-updatedAt`,
    }).limitFields();
    const job = await features.query;
    res.status(200).json({
      status: 'success',
      data: {
        job,
      },
    });
  });
}
module.exports = new jobController();
