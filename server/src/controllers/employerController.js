const fs = require('fs');
const Employer = require('./../models/employerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const sendEmail = require('./../services/email');
const FilterObject = require('./../utils/filterObject');

var confirmEmailFiles = fs.readFileSync(
  `${__dirname}/../public/ConfirmEmail/ConfirmEmail.html`,
  'utf-8'
);
class employerController {
  sendInformation = catchAsync(async (req, res, next) => {
    const newEmployer = await Employer.create({
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      scale: req.body.scale,
      companyWebsite: req.body.companyWebsite,
      address: {
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        street: req.body.street,
      },
      TIN: req.body.TIN,
      companyType: req.body.companyType,
      OT: req.body.OT,
    });
    //2) Generate the random authen token
    const authenToken = newEmployer.createAuthenToken();
    await newEmployer.save({ validateBeforeSave: false });
    //3) Send it to employer's email
    const authenURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/employer/authentication/${authenToken}`;
    const content = confirmEmailFiles.replace(/{%authenURL%}/g, authenURL);
    try {
      await sendEmail({
        email: newEmployer.email,
        subject: '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
        content,
      });
      const filteredEmployer = FilterObject(
        newEmployer,
        'companyName',
        'email',
        'phone',
        'logo',
        'scale',
        'companyWebsite',
        'address',
        'TIN',
        'companyType',
        'OT',
        'role'
      );
      return res.status(201).json({
        status: 'success',
        data: {
          Employer: filteredEmployer,
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
  getEmployer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Employer.findById(req.user.id), {
      fields: `-isEmailVerified,-__v,-entryTest,-event,-jobs,-registeredServicePackages,-reviews,-status,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`,
    }).limitFields();
    const employer = await features.query;
    if (!employer) {
      return next(new AppError('ID không hợp lệ', 400));
    }
    res.status(200).json({
      status: 'success',
      data: {
        Employer: employer,
      },
    });
  });
  updateEmployerPassword = catchAsync(async (req, res, next) => {
    if (req.body.password != req.body.passwordConfirm) {
      return next(
        new AppError('Mật khẩu và xác nhận mật khẩu không giống nhau', 400)
      );
    }
    //1) Get job seeker from collection
    const employer = await Employer.findById(req.user.id).select('+password');
    //2) Check if posted current password is correct
    if (
      !(await employer.correctPassword(
        req.body.currentPassword,
        employer.password
      ))
    ) {
      return next(new AppError('Password hiện tại không chính xác', 401));
    }
    //3) If so, update password
    employer.password = req.body.password;
    employer.passwordConfirm = req.body.passwordConfirm;
    await employer.save();
    //4) Announce
    res.status(204).json({
      status: 'success',
      message: 'Đổi mật khẩu thành công',
    });
  });
  updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password update. Please use /updateMyPassword',
          400
        )
      );
    }
    //2) Filtered out unwanted fields that are not allowed to be update
    const filteredBody = FilterObject(
      req.body,
      'address',
      'companyName',
      'companyWebsite',
      'logo',
      'ot',
      'description',
      'scale',
      'phone',
      'TIN',
      'companyType'
    );
    //3) Update job seeker document
    var employer;
    if (!req.body.welfare && !req.body.delWelfare) {
      employer = await Employer.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
      });
    } else {
      employer = await Employer.findByIdAndUpdate(
        req.user.id,
        {
          filteredBody,
          $set: { welfare: req.body.welfare },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    const filteredEmployer = FilterObject(
      employer,
      'username',
      'email',
      'address',
      'companyName',
      'companyWebsite',
      'description',
      'logo',
      'ot',
      'scale',
      'phone',
      'welfare',
      'TIN',
      'companyType',
      'createdAt',
      'updatedAt',
      'role'
    );
    res.status(200).json({
      status: 'success',
      data: {
        employer: filteredEmployer,
      },
    });
  });
}
module.exports = new employerController();
