const Employer = require('../models/employerModel');
const SystemManager = require('../models/system-managerModel');
const SystemAdmin = require('../models/system-adminModel');
const Application = require('./../models/application');
const Review = require('./../models/reviewModel');
const Event = require('./../models/eventModel');
const Job = require('./../models/JobModel');
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
    systemManager = await SystemManager.findOne({
      email: req.body.email,
    });
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
    systemAdmin = await SystemAdmin.findOne({
      email: req.body.email,
    });
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
exports.checkUpdateSytemManager = async (req, res, next) => {
  if (req.body.email && req.body.phone) {
    var systemManager = undefined;
    systemManager = await SystemManager.findOne({
      email: req.body.email,
      _id: { $ne: req.user.id },
    });
    if (systemManager) {
      return next(
        new AppError('Email bị trùng, vui lòng sử dụng email khác', 400)
      );
    }
    systemManager = await SystemManager.findOne({
      phone: req.body.phone,
      _id: { $ne: req.user.id },
    });
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
exports.checkUpdateSytemAdmin = async (req, res, next) => {
  if (req.body.email && req.body.phone) {
    var systemAdmin = undefined;
    systemAdmin = await SystemAdmin.findOne({
      email: req.body.email,
      _id: { $ne: req.user.id },
    });
    if (systemAdmin) {
      return next(
        new AppError('Email bị trùng, vui lòng sử dụng email khác', 400)
      );
    }
    systemAdmin = await SystemAdmin.findOne({
      phone: req.body.phone,
      _id: { $ne: req.user.id },
    });
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
exports.checkApplicationUnique = async (req, res, next) => {
  const application = await Application.findOne({
    job: req.params.idJob,
    jobSeeker: req.user.id,
  });
  if (application) {
    return next(new AppError('Bạn đã nộp đơn cho công việc này rồi', 400));
  }
  next();
};
exports.checkReviewExists = async (req, res, next) => {
  const review = await Review.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!review) {
    return next(
      new AppError(`Review này không phải của ${req.user.fullname}`, 400)
    );
  }
  next();
};
exports.checkParticipantQuantityEvent = async (req, res, next) => {
  const event = await Event.findById(req.body.event);
  if (event) {
    if (event.participantMax <= event.participantQuantity) {
      return next(
        new AppError(`Sự kiện đã đủ số lượng thành viên đăng ký tham gia`, 400)
      );
    }
  } else {
    return next(new AppError(`Không tìm thấy sự kiện`, 404));
  }
  next();
};
exports.checkStatusWhenUpdateJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (job.status == 'approval') {
    return next(
      new AppError(
        `Không thể chỉnh sửa tin tuyển dụng khi đã được phê duyệt`,
        400
      )
    );
  }
  next();
};
