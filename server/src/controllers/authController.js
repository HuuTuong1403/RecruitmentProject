const fs = require('fs');
const crypto = require('crypto');
const JobSeeker = require('./../models/job-seekerModel');
const SystemManager = require('./../models/system-managerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Token = require('./../services/token');
const Employer = require('./../models/employerModel');
const sendEmail = require('./../services/email');
const { findOne } = require('./../models/job-seekerModel');

var confirmEmailFiles = fs.readFileSync(
  `${__dirname}/../public/ConfirmEmail/ConfirmEmail.html`,
  'utf-8'
);

class authController {
  signUpJobSeeker = catchAsync(async (req, res, next) => {
    //1) Create job seeker
    const newJobSeeker = await JobSeeker.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    //2) Generate the random authen token
    const authenToken = newJobSeeker.createAuthenToken();
    await newJobSeeker.save({ validateBeforeSave: false });
    //3) Send it to job seeker's email
    const authenURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/job-seeker/authentication/${authenToken}`;
    const content = confirmEmailFiles.replace(/{%authenURL%}/g, authenURL);
    try {
      await sendEmail({
        email: newJobSeeker.email,
        subject:
          '[MST-Recuitment] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
        content,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          JobSeeker: newJobSeeker,
        },
      });
    } catch (err) {
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  confirmJobSeekerEmail = catchAsync(async (req, res, next) => {
    //1) Get job seeker based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    //2) If job seeker is not exists, return Error
    const jobSeeker = await JobSeeker.findOne({ authenToken: hashedToken });
    if (!jobSeeker) {
      return next(new AppError('Token không hợp lệ', 400));
    }
    //3) If token is expires
    if (jobSeeker.authenTokenExpired.getTime() <= Date.now()) {
      //2) Generate the random authen token
      const authenToken = jobSeeker.createAuthenToken();
      await jobSeeker.save({ validateBeforeSave: false });
      //3) Send it to job seeker's email
      const authenURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/job-seeker/authentication/${authenToken}`;
      const content = confirmEmailFiles.replace(/{%authenURL%}/g, authenURL);
      try {
        await sendEmail({
          email: jobSeeker.email,
          subject:
            '[MST-Recuitment] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
          content,
        });
        return next(
          new AppError(
            'Token đã hết hạn, vui lòng kiểm tra lại hộp thư email để nhận lại link xác nhận email mới nhất',
            400
          )
        );
      } catch (err) {
        return next(
          new AppError(
            'There was an error sending this email. Try again later!',
            500
          )
        );
      }
    }
    //4) Confirm email
    jobSeeker.isEmailVerified = true;
    jobSeeker.authenToken = undefined;
    jobSeeker.authenTokenExpired = undefined;
    await jobSeeker.save({ validateBeforeSave: false });
    res.redirect('https://mst-recruit.surge.sh/home/sign-in?isVerify=success');
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
  forgotJobSeekerPassword = catchAsync(async (req, res, next) => {
    //1) Get job seeker based on POST email
    const jobSeeker = await JobSeeker.findOne({ email: req.body.email });
    if (!jobSeeker) {
      return next(
        new AppError(`Không tìm thấy địa chỉ email trong hệ thống`, 404)
      );
    }
    //2) Generate the random reset token
    const resetToken = jobSeeker.createPasswordResetToken();
    await jobSeeker.save({ validateBeforeSave: false });
    //3) Send it to user's email
    const resetURL = `https://mst-recruit.surge.sh/home/forgot-pass/${resetToken}`;
  });
  loginEmployer = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    //Check if login information is exists
    if (!username || !password) {
      return next(new AppError('Please provide enough login information', 400));
    }
    //Check if login information is correct
    const employer = await Employer.findOne({ username }).select('+password');
    if (
      !employer ||
      !(await employer.correctPassword(password, employer.password))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }
    employer.password = undefined;
    const token = Token.signToken(employer._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        Employer: employer,
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
