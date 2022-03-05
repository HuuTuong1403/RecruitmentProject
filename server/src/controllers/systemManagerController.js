const fs = require('fs');

const Employer = require('./../models/employerModel');
const SystemManager = require('./../models/system-managerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const email = require('./../services/email');
const FilterObject = require('./../utils/filterObject');

class systemManagerController {
  getAllEmployer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Employer.find(), {
      isEmailVerified: 'true',
      fields: `-isEmailVerified,-__v,-entryTest,-event,-jobs,-registeredServicePackages,-reviews,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`,
    })
      .filter()
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
      const features = new APIFeatures(Employer.findById(req.params.id), {
        fields: `-isEmailVerified,-__v,-entryTest,-event,-jobs,-registeredServicePackages,-reviews,-updatedAt,-authenToken,-authenTokenExpired,-passwordChangeAt,-passwordResetToken,-passwordResetExpires`,
      }).limitFields();
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
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return next(new AppError('Không tìm thấy doanh nghiệp', 404));
    }
    if (!employer.isEmailVerified) {
      return next(new AppError('Doanh nghiệp chưa xác thực email', 404));
    }
    employer.username = req.body.username;
    employer.password = req.body.password;
    employer.status = 'approval';

    await employer.save();

    try {
      await new email(employer, null).sendIssueAccountEmail(req.body.password);
      employer.password = undefined;
      res.status(200).json({
        status: 'success',
        data: {
          employer,
        },
      });
    } catch (err) {
      employer.username = undefined;
      employer.password = undefined;
      employer.status = 'unapproval';

      await employer.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  updateSystemManagerPassword = catchAsync(async (req, res, next) => {
    //1) Get system manager from collection
    const systemManager = await SystemManager.findById(req.user.id).select(
      '+password'
    );
    //2) Check if posted current password is correct
    if (
      !(await systemManager.correctPassword(
        req.body.currentPassword,
        systemManager.password
      ))
    ) {
      return next(new AppError('Password hiện tại không chính xác', 401));
    }
    //3) If so, update password
    systemManager.password = req.body.password;
    systemManager.passwordConfirm = req.body.passwordConfirm;
    await systemManager.save();
    //4) Announce
    res.status(204).json({
      status: 'success',
      message: 'Đổi mật khẩu thành công',
    });
  });
  updateMe = catchAsync(async (req, res, next) => {
    //1) Create error if user post password data
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
      'fullname',
      'phone',
      'email',
      'avatar'
    );
    //3) Update job seeker document
    const systemManager = await SystemManager.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    const filteredsystemManager = FilterObject(
      systemManager,
      'fullname',
      'phone',
      'avatar',
      'email',
      'username',
      'createdAt',
      'updatedAt',
      'role'
    );
    res.status(200).json({
      status: 'success',
      data: {
        systemManager: filteredsystemManager,
      },
    });
  });
  getSystemManager = catchAsync(async (req, res, next) => {
    const systemManager = await SystemManager.findById(req.user.id);
    const filteredsystemManager = FilterObject(
      systemManager,
      'fullname',
      'phone',
      'avatar',
      'email',
      'username',
      'createdAt',
      'updatedAt',
      'role'
    );
    res.status(200).json({
      status: 'success',
      data: {
        systemManager: filteredsystemManager,
      },
    });
  });
}

module.exports = new systemManagerController();
