const fs = require('fs');
const crypto = require('crypto');
const JobSeeker = require('./../models/job-seekerModel');
const SystemManager = require('./../models/system-managerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Token = require('./../services/token');
const Employer = require('./../models/employerModel');
const sendEmail = require('./../services/email');

var confirmEmailFiles = fs.readFileSync(
  `${__dirname}/../public/ConfirmEmail/ConfirmEmail.html`,
  'utf-8'
);
var resetPasswordFiles = fs.readFileSync(
  `${__dirname}/../public/ResetPassword/ResetPassword.html`,
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
        subject: '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
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
            '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
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
    const { username, password } = req.body;
    var jobSeeker = undefined;
    //Check if login information is exists
    if (!password || !username) {
      return next(new AppError('Please provide enough login information', 400));
    }

    //Check if login information is correct
    jobSeeker = await JobSeeker.findOne({
      $or: [{ username: username }, { email: username }, { phone: username }],
    }).select('+password');
    if (
      !jobSeeker ||
      !(await jobSeeker.correctPassword(password, jobSeeker.password))
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
    const content = resetPasswordFiles.replace(/{%resetURL%}/g, resetURL);
    try {
      await sendEmail({
        email: jobSeeker.email,
        subject:
          '[MST-Company] Khôi phục mật khẩu của bạn (Hợp lệ trong vòng 10 phút)',
        content,
      });
      res.status(200).json({
        status: 'success',
        message: 'Đã gửi yêu cầu khôi phục mật khẩu thành công',
      });
    } catch (err) {
      jobSeeker.passwordResetToken = undefined;
      jobSeeker.passwordResetExpires = undefined;
      await jobSeeker.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  resetJobSeekerPassword = catchAsync(async (req, res, next) => {
    //1. Get job seeker base on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const jobSeeker = await JobSeeker.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    //If the token has not expired, and there is job seeker, set new password
    if (!jobSeeker) {
      return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 400));
    }
    jobSeeker.password = req.body.password;
    jobSeeker.passwordConfirm = req.body.passwordConfirm;
    jobSeeker.passwordResetToken = undefined;
    jobSeeker.passwordResetExpires = undefined;
    await jobSeeker.save();
    res.status(200).json({
      status: 'success',
      message: 'Khôi phục mật khẩu thành công',
    });
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
  confirmEmployerEmail = catchAsync(async (req, res, next) => {
    //1) Get job seeker based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const employer = await Employer.findOne({ authenToken: hashedToken });
    if (!employer) {
      return next(new AppError('Token không hợp lệ', 400));
    }
    //3) If token is expires
    if (employer.authenTokenExpired.getTime() < Date.now()) {
      //2) Generate the random authen token
      const authenToken = employer.createAuthenToken();
      await employer.save({ validateBeforeSave: false });
      //3) Send it to employer's email
      const authenURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/employer/authentication/${authenToken}`;
      const content = confirmEmailFiles.replace(/{%authenURL%}/g, authenURL);
      try {
        await sendEmail({
          email: employer.email,
          subject:
            '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
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
    employer.isEmailVerified = true;
    employer.authenToken = undefined;
    employer.authenTokenExpired = undefined;
    await employer.save({ validateBeforeSave: false });
    res.redirect('https://mst-recruit.surge.sh/employers');
  });
  forgotEmployerPassword = catchAsync(async (req, res, next) => {
    //1) Get employer based on POST email
    const employer = await Employer.findOne({ email: req.body.email });
    if (!employer) {
      return next(
        new AppError(`Không tìm thấy địa chỉ email trong hệ thống`, 404)
      );
    }
    //2) Generate the random reset token
    const resetToken = employer.createPasswordResetToken();
    await employer.save({ validateBeforeSave: false });
    //3) Send it to employer's email
    const resetURL = `https://mst-recruit.surge.sh/home/forgot-pass/${resetToken}`;
    const content = resetPasswordFiles.replace(/{%resetURL%}/g, resetURL);
    try {
      await sendEmail({
        email: employer.email,
        subject:
          '[MST-Company] Khôi phục mật khẩu của bạn (Hợp lệ trong vòng 10 phút)',
        content,
      });
      res.status(200).json({
        status: 'success',
        message: 'Đã gửi yêu cầu khôi phục mật khẩu thành công',
      });
    } catch (err) {
      employer.passwordResetToken = undefined;
      employer.passwordResetExpires = undefined;
      await employer.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  reseEmployerPassword = catchAsync(async (req, res, next) => {
    if (req.body.password != req.body.passwordConfirm) {
      return next(
        new AppError('Password và xác nhận password không giống nhau', 400)
      );
    }
    //1. Get job seeker base on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const employer = await Employer.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    //If the token has not expired, and there is job seeker, set new password
    if (!employer) {
      return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 400));
    }
    employer.password = req.body.password;
    employer.passwordConfirm = req.body.passwordConfirm;
    employer.passwordResetToken = undefined;
    employer.passwordResetExpires = undefined;
    await employer.save();
    res.status(200).json({
      status: 'success',
      message: 'Khôi phục mật khẩu thành công',
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
