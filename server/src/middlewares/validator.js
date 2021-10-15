const Employer = require('../models/employerModel');
const SystemManager = require('../models/system-managerModel');
const SystemAdmin = require('../models/system-adminModel');
const AppError = require('../utils/appError');

exports.isEmployerUsernameUnique = async (req, res, next) => {
  if (req.body.username && req.params.id) {
    const employer = await Employer.findOne({
      username: req.body.username,
      _id: { $ne: req.params.id },
    });
    if (employer) {
      return next(
        new AppError('Username bị trùng, vui lòng sử dụng username khác', 400)
      );
    }
  }
  next();
};
exports.checkSystemManagerUnique = async (req, res, next) => {
  if (req.body.email && req.body.phone) {
    var systemManager = undefined;
    systemManager = await SystemManager.findOne({ email: req.body.email });
    if (systemManager) {
      return next(
        new AppError('Email bị trùng, vui lòng sử dụng email khác', 400)
      );
    }
    systemManager = await SystemManager.findOne({ phone: req.body.phone });
    if (systemManager) {
      return next(
        new AppError(
          'Số điện thoại bị trùng, vui lòng sử dụng số điện thoại khác',
          400
        )
      );
    }
  }
  next();
};
exports.checkSystemAdminUnique = async (req, res, next) => {
  var systemAdmin = undefined;
  if (req.body.email) {
    systemAdmin = await SystemAdmin.findOne({ email: req.body.email });
    if (systemAdmin) {
      return next(
        new AppError('Email bị trùng, vui lòng sử dụng email khác', 400)
      );
    }
  }
  if (req.body.phone) {
    systemAdmin = await SystemAdmin.findOne({ phone: req.body.phone });
    if (systemAdmin) {
      return next(
        new AppError(
          'Số điện thoại bị trùng, vui lòng sử dụng số điện thoại khác',
          400
        )
      );
    }
  }
  next();
};
