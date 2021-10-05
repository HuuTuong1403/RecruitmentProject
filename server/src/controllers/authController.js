const JobSeeker = require('./../models/job-seekerModel');
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
    const { username, email, phone, password } = req.body;
    var jobSeeker = undefined;

    //Check if login information is exists
    if (!password || (!username && !email && !phone)) {
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
      !(await jobSeeker.correctPassword(password, jobSeeker.password))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }

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
}
module.exports = new authController();
