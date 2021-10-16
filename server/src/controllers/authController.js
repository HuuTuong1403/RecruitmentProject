const fs = require('fs');
const crypto = require('crypto');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Token = require('./../services/token');
const sendEmail = require('./../services/email');
const FilterObject = require('./../utils/filterObject');

const JobSeeker = require('./../models/job-seekerModel');
const SystemManager = require('./../models/system-managerModel');
const Employer = require('./../models/employerModel');
const SystemAdmin = require('./../models/system-adminModel');
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
      const filteredJobSeeker = FilterObject(
        newJobSeeker,
        'fullname',
        'username',
        'email',
        'phone',
        'avatar',
        'role'
      );
      return res.status(201).json({
        status: 'success',
        data: {
          JobSeeker: filteredJobSeeker,
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
    const filteredJobSeeker = FilterObject(
      jobSeeker,
      'fullname',
      'avatar',
      'role',
      'isEmailVerified'
    );
    //Everything ok, send token to client
    const token = Token.signToken(jobSeeker._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        JobSeeker: filteredJobSeeker,
      },
    });
  });
  forgotJobSeekerPassword = catchAsync(async (req, res, next) => {
    //1) Get job seeker based on POST email
    const jobSeeker = await JobSeeker.findOne({
      email: req.body.email,
      isEmailVerified: true,
    });
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
    const filteredemployer = FilterObject(
      employer,
      'companyName',
      'logo',
      'role'
    );
    const token = Token.signToken(employer._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        Employer: filteredemployer,
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
    const employer = await Employer.findOne({
      email: req.body.email,
      isEmailVerified: true,
    });
    if (!employer) {
      return next(
        new AppError(`Không tìm thấy địa chỉ email trong hệ thống`, 404)
      );
    }
    //2) Generate the random reset token
    const resetToken = employer.createPasswordResetToken();
    await employer.save({ validateBeforeSave: false });
    //3) Send it to employer's email
    const resetURL = `https://mst-recruit.surge.sh/employers/forgot-pass/${resetToken}`;
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
  resetEmployerPassword = catchAsync(async (req, res, next) => {
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
    newSystemManager.password = undefined;
    const filteredSystemManager = FilterObject(
      newSystemManager,
      'fullname',
      'username',
      'email',
      'avatar',
      'role'
    );
    res.status(201).json({
      status: 'success',
      data: {
        systemManager: filteredSystemManager,
      },
    });
  });
  loginSystemManager = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    //Check if login information is exists
    if (!username || !password) {
      return next(new AppError('Please provide enough login information', 400));
    }
    //Check if login information is correct
    const systemManager = await SystemManager.findOne({ username }).select(
      '+password'
    );
    if (
      !systemManager ||
      !(await systemManager.correctPassword(password, systemManager.password))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }
    systemManager.password = undefined;
    const filteredSystemManager = FilterObject(
      systemManager,
      'fullname',
      'avatar',
      'role'
    );
    const token = Token.signToken(systemManager._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        systemManager: filteredSystemManager,
      },
    });
  });
  signUpSystemAdmin = catchAsync(async (req, res, next) => {
    const newSysteAdmin = await SystemAdmin.create({
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      username: req.body.username,
    });
    newSysteAdmin.password = undefined;
    const filteredSystemAdmin = FilterObject(
      newSysteAdmin,
      'fullname',
      'username',
      'email',
      'avatar',
      'role'
    );
    res.status(201).json({
      status: 'success',
      data: {
        systemAdmin: filteredSystemAdmin,
      },
    });
  });
  loginSystemAdmin = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    //Check if login information is exists
    if (!username || !password) {
      return next(new AppError('Please provide enough login information', 400));
    }
    //Check if login information is correct
    const systemAdmin = await SystemAdmin.findOne({ username }).select(
      '+password'
    );
    if (
      !systemAdmin ||
      !(await systemAdmin.correctPassword(password, systemAdmin.password))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }
    systemAdmin.password = undefined;
    const filteredSystemAdmin = FilterObject(
      systemAdmin,
      'fullname',
      'avatar',
      'role'
    );
    console.log(filteredSystemAdmin);
    const token = Token.signToken(systemAdmin._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        systemAdmin: filteredSystemAdmin,
      },
    });
  });
  protect = catchAsync(async (req, res, next) => {
    let token;
    //1) Getting token and check of it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError(
          'Bạn không có quyền truy cập vào chức năng này. Vui lòng đăng nhập vào hệ thống',
          401
        )
      );
    }
    //2) Verification token
    const decoded = await Token.decodedToken(token);
    //3) Check if user still exit
    let freshUser = undefined;
    freshUser = await SystemAdmin.findById(decoded.id);
    if (freshUser) {
      //4) Check if user change password after the token is issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Pleae log in again',
            401
          )
        );
      }
      //GRANT ACCESS TO PROTECTED ROUTE
      req.user = freshUser;
      return next();
    }
    freshUser = await SystemManager.findById(decoded.id);
    if (freshUser) {
      //4) Check if user change password after the token is issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Pleae log in again',
            401
          )
        );
      }
      //GRANT ACCESS TO PROTECTED ROUTE
      req.user = freshUser;
      return next();
    }
    freshUser = await Employer.findById(decoded.id);
    if (freshUser) {
      //4) Check if user change password after the token is issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Pleae log in again',
            401
          )
        );
      }
      //GRANT ACCESS TO PROTECTED ROUTE
      req.user = freshUser;
      return next();
    }
    freshUser = await JobSeeker.findById(decoded.id);
    if (freshUser) {
      //4) Check if user change password after the token is issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Pleae log in again',
            401
          )
        );
      }
      //GRANT ACCESS TO PROTECTED ROUTE
      req.user = freshUser;
      return next();
    }
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  });
  restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action'),
          403
        );
      }
      next();
    };
  };
}
module.exports = new authController();
