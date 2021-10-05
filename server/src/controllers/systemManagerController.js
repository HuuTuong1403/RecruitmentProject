const Employer = require('./../models/employerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
class systemManagerController {
  getAllEmployer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Employer.find(), {
      status: 'unapproval',
    })
      .sort()
      .limitFields();
    const employers = await features.query;
    res.status(200).json({
      status: 'success',
      length: employers.length,
      data: {
        employer: employers,
      },
    });
  });
  getEmployer = catchAsync(async (req, res, next) => {
    if (req.params.id) {
      const features = new APIFeatures(
        Employer.findById(req.params.id),
        {}
      ).limitFields();
      const employer = await features.query;
      if (!employer) {
        return next(new AppError('No employer found with id', 404));
      }
      if (employer) {
        return res.status(200).json({
          status: 'success',
          data: {
            employer,
          },
        });
      }
    }
    return next(new AppError('Invalid ID', 400));
  });
  issueEmployer = catchAsync(async (req, res, next) => {
    const modifiedEmployer = {
      username: req.body.username,
      password: req.body.password,
      status: 'approval',
    };
    console.log(modifiedEmployer);
    const employer = await Employer.findByIdAndUpdate(
      req.params.id,
      modifiedEmployer,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!employer) {
      return next(new AppError('No employer found with id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        employer,
      },
    });
  });
}

module.exports = new systemManagerController();
