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
}
module.exports = new systemAdminController();
