const JobSeeker = require('./../models/job-seekerModel');
const SystemManager = require('./../models/system-managerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Token = require('./../services/token');

class authController {
  signUpJobSeeker = catchAsync(async (req, res, next) => {
    const newJobSeeker = await JobSeeker.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      status: 'success',
      data: {
        JobSeeker: newJobSeeker,
      },
    });
  });
  loginJobSeeker = catchAsync(async (req, res, next) => {
    const { username, email, phone, ...loginPassword } = req.body;
    var jobSeeker = undefined;
    //Check if login information is exists
    if (!loginPassword.password || (!username && !email && !phone)) {
      return next(new AppError('Please provide enough login information', 400));
    }

    //Check if login information is correct
    if (username) {
      jobSeeker = await JobSeeker.findOne({ username }).select('+password');
    }
    if (email) {
      jobSeeker = await JobSeeker.findOne({ email }).select('+password');
    }
    if (phone) {
      jobSeeker = await JobSeeker.findOne({ phone }).select('+password');
    }
    if (
      !jobSeeker ||
      !(await jobSeeker.correctPassword(
        loginPassword.password,
        jobSeeker.password
      ))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }
    jobSeeker.password = undefined;
    //Everything ok, send token to client
    const token = Token.signToken(jobSeeker._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        JobSeeker: jobSeeker,
      },
    });
  });
  signUpSystemManager = catchAsync(async (req, res, next) => {
    const newSystemManager = await SystemManager.create({
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      username: req.body.username,
    });
    res.status(201).json({
      status: 'success',
      data: {
        systemManager: newSystemManager,
      },
    });
  });
}
module.exports = new authController();
