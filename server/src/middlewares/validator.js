const Employer = require('../models/employerModel');
const SystemManager = require('../models/system-managerModel');
const SystemAdmin = require('../models/system-adminModel');
const AppError = require('../utils/appError');

exports.isEmployerUsernameUnique = async (req, res, next) => {
  const employer = Employer.findOne({ username: req.body.username });
  if (employer) {
    return next(
      new AppError('Username bị trùng, vui lòng sử dụng username khác')
    );
  }
  next();
};
exports.checkSystemManagerUnique = async (req, res, next) => {
  var systemManager = undefined;
  systemManager = SystemManager.findOne({ email: req.body.email });
  if (systemManager) {
    return next(new AppError('Email bị trùng, vui lòng sử dụng email khác'));
  }
  systemManager = SystemManager.findOne({ phone: req.body.phone });
  if (systemManager) {
    return next(
      new AppError(
        'Số điện thoại bị trùng, vui lòng sử dụng số điện thoại khác'
      )
    );
  }
  next();
};
exports.checkSystemAdminUnique = async (req, res, next) => {
  var systemAdmin = undefined;
  systemAdmin = SystemAdmin.findOne({ email: req.body.email });
  if (systemAdmin) {
    return next(new AppError('Email bị trùng, vui lòng sử dụng email khác'));
  }
  systemAdmin = SystemAdmin.findOne({ phone: req.body.phone });
  if (systemAdmin) {
    return next(
      new AppError(
        'Số điện thoại bị trùng, vui lòng sử dụng số điện thoại khác'
      )
    );
  }
  next();
};
