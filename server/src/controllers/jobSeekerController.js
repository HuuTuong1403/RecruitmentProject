const JobSeeker = require('./../models/job-seekerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
class JobSeekerController {
  getJobSeeker = catchAsync(async (req, res, next) => {
    if (req.params.id) {
      const features = new APIFeatures(JobSeeker.findById(req.params.id), {
        fields: `-google,-facebook,-applied,-entryTests,-event,-isEmailVerified,-__v`,
      }).limitFields();
      const jobSeeker = await features.query;
      if (jobSeeker) {
        return res.status(200).json({
          status: 'success',
          data: {
            jobSeeker,
          },
        });
      } else {
        return next(new AppError('Id is invalid', 400));
      }
    }
    return next(new AppError('Id is required', 400));
  });
}
module.exports = new JobSeekerController();
