const fs = require('fs');

const Employer = require('./../models/employerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const FilterObject = require('./../utils/filterObject');
const getDayOfYear = require('./../utils/getDayOfYear');

const sendEmail = require('./../services/email');

const factory = require('./handleFactory');
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
      ot: req.body.ot,
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
        'scale',
        'companyWebsite',
        'address',
        'TIN',
        'companyType',
        'ot',
        'role'
      );
      return res.status(201).json({
        status: 'success',
        data: {
          Employer: filteredEmployer,
        },
      });
    } catch (err) {
      console.log(err);
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  //fields: `-isEmailVerified,-__v,-status,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`,
  getEmployer = factory.getOneUniqueField(
    Employer,
    {
      path: 'jobs',
      select: 'jobTitle salary location slug finishDate',
    },
    `-isEmailVerified,-__v,-status,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`
  );
  getMe = factory.getOne(
    Employer,
    {
      path: 'jobs',
      select: 'jobTitle salary location slug',
    },
    `-isEmailVerified,-__v,-status,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`
  );
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
      'welfare',
      'ot',
      'description',
      'scale',
      'phone',
      'TIN',
      'companyType'
    );
    //3) Update job seeker document
    const employer = await Employer.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
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
  getEmployerComp = catchAsync(async (req, res, next) => {
    let result = {
      past: 0,
      current: 0,
    };
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const employers = await Employer.aggregate([
      {
        $addFields: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
      {
        $addFields: {
          timeline: {
            $cond: {
              if: {
                $and: [{ $eq: ['$month', month] }, { $eq: ['$year', year] }],
              },
              then: 'current',
              else: 'past',
            },
          },
        },
      },
      {
        $group: { _id: '$timeline', count: { $sum: 1 } },
      },
    ]);
    for (var i = 0; i < employers.length; i++) {
      if (employers[i]._id == 'current') {
        result.current = employers[i].count;
      }
      if (employers[i]._id == 'past') {
        result.past = employers[i].count;
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
  getEmployerStat = catchAsync(async (req, res, next) => {
    let result = Array(12).fill(0);
    const now = new Date();
    const year = now.getFullYear();
    const employers = await Employer.aggregate([
      {
        $addFields: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $redact: {
          $cond: [
            {
              $eq: [{ $year: '$createdAt' }, year],
            },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      },
      {
        $group: { _id: '$month', count: { $sum: 1 } },
      },
    ]);
    for (var i = 0; i < employers.length; i++) {
      result[employers[i]._id - 1] = employers[i].count;
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
}
module.exports = new employerController();
