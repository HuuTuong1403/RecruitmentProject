const Employer = require('./../models/employerModel');
const JobSeeker = require('./../models/job-seekerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const FilterObject = require('./../utils/filterObject');

const SystemAdmin = require('./../models/system-adminModel');

class systemAdminController {
  updateSystemAdminPassword = catchAsync(async (req, res, next) => {
    //1) Get system Admin from collection
    const systemAdmin = await SystemAdmin.findById(req.user.id).select(
      '+password'
    );
    //2) Check if posted current password is correct
    if (
      !(await systemAdmin.correctPassword(
        req.body.currentPassword,
        systemAdmin.password
      ))
    ) {
      return next(new AppError('Password hiện tại không chính xác', 401));
    }
    //3) If so, update password
    systemAdmin.password = req.body.password;
    systemAdmin.passwordConfirm = req.body.passwordConfirm;
    await systemAdmin.save();
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
    const systemAdmin = await SystemAdmin.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    const filteredsystemAdmin = FilterObject(
      systemAdmin,
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
        systemAdmin: filteredsystemAdmin,
      },
    });
  });
  getSystemAdmin = catchAsync(async (req, res, next) => {
    const systemAdmin = await SystemAdmin.findById(req.user.id);
    const filteredsystemAdmin = FilterObject(
      systemAdmin,
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
        systemAdmin: filteredsystemAdmin,
      },
    });
  });
  getUserStat = catchAsync(async (req, res, next) => {
    const employers = await Employer.find({}, { createdAt: 1 });
    const jobSeekers = await JobSeeker.find({}, { createdAt: 1 });
    let users = employers.concat(jobSeekers);

    const now = new Date();
    const year = now.getFullYear();

    users = users.map((element) => {
      return {
        month: element.createdAt.getMonth(),
        year: element.createdAt.getFullYear(),
      };
    });

    let result = Array(12).fill(0);
    users.forEach((user) => {
      if (user.year == year) result[user.month] = result[user.month] + 1;
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
  getUserComp = catchAsync(async (req, res, next) => {
    const employers = await Employer.find({}, { createdAt: 1 });
    const jobSeekers = await JobSeeker.find({}, { createdAt: 1 });
    let users = employers.concat(jobSeekers);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    users = users.map((user, index) => {
      if (
        user.createdAt.getMonth() == month &&
        user.createdAt.getFullYear() == year
      ) {
        return { timeline: 'current' };
      } else {
        return { timeline: 'past' };
      }
    });
    let result = {
      past: 0,
      current: 0,
    };
    users.forEach((user) => {
      result[user.timeline] = result[user.timeline] + 1;
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
}
module.exports = new systemAdminController();
