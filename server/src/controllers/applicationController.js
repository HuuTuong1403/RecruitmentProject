const mongoose = require('mongoose');

const factory = require('./handleFactory');

const Application = require('./../models/application');

const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

const email = require('./../services/email');
const getDayOfYear = () => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
};
class applicationController {
  setBodyApplicationCreation = (req, res, next) => {
    req.body.jobSeeker = req.user.id;
    req.body.job = req.params.idJob;
    req.body.createdAt = Date.now();
    next();
  };
  setQueryApplicationView = (req, res, next) => {
    if (req.params.idJob) {
      req.query.job = req.params.idJob;
    }
    if (req.user) {
      req.query.jobSeeker = req.user.id;
    }
    next();
  };
  createApplication = factory.createOne(Application);
  getAllApplication = factory.getAll(Application);
  setQueryApplicationManagement = (req, res, next) => {
    if (req.query.fullName) {
      req.query.fullName = { $regex: req.query.fullName, $options: 'si' };
    }
    if (req.query.startTime || req.query.endTime) {
      if (req.query.startTime && req.query.endTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
          lte: new Date(req.query.endTime),
        };
        req.query.startTime = undefined;
        req.query.endTime = undefined;
      }
      if (req.query.startTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
        };
        req.query.startTime = undefined;
      }
      if (req.query.endTime) {
        req.query.createdAt = {
          lte: new Date(req.query.endTime),
        };
        req.query.endTime = undefined;
      }
    }
    next();
  };
  getAllApplicationManagement = catchAsync(async (req, res, next) => {
    var isExpired = undefined;
    if (!req.query.status) {
      req.query.status = 'NotSaved';
    }
    if (req.query.isExpired) {
      isExpired = req.query.isExpired;
    }
    var filter = req.query;
    if (req.params.idJob) {
      filter = { job: req.params.idJob };
    }
    const features = new APIFeatures(Application.find(), filter)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let applications = await features.query;
    applications = applications.filter((application) => {
      if (application.job?.company.id == req.user.id) {
        if (!isExpired) return application;
        if (application.job.isExpired.toString() == isExpired.toString()) {
          return application;
        }
        return application;
      }
    });
    res.status(200).json({
      status: 'sucess',
      results: applications.length,
      data: {
        data: applications,
      },
    });
  });
  saveApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'Saved';
    next();
  });
  deleteApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'Deleted';
    next();
  });
  restoreApplication = catchAsync(async (req, res, next) => {
    req.body.status = 'NotSaved';
    next();
  });
  getApplication = factory.getOne(Application);
  updateApplication = factory.updateOne(Application);
  announceApplicants = catchAsync(async (req, res, next) => {
    let application = await Application.updateMany(
      { _id: { $in: req.body.id } },
      { isAnnounced: true }
    );
    application = await Application.find({ _id: { $in: req.body.id } });
    await Promise.all(
      application.map(async (el) => {
        try {
          const user = {
            email: el.jobSeeker.email,
            application: el,
          };
          await new email(user, null).sendPassedCVAnnouncementEmail();
        } catch (err) {
          return next(
            new AppError(
              `Có lỗi xảy ra trong quá trình gửi mail cho ${el.fullName}! Vui lòng thử lại sau`,
              500
            )
          );
        }
      })
    );
    return res.status(200).json({
      status: 'success',
      message: 'Đã gửi thông báo đến cho ứng viên thành công',
    });
  });
  countAppicantsAccoridingToStatus = catchAsync(async (req, res, next) => {
    var result = {
      NotSaved: 0,
      Saved: 0,
      Deleted: 0,
    };
    const applicationQuantity = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs', /// Name collection from database, not name from exported schema
          localField: 'job',
          foreignField: '_id',
          as: 'fromjob',
        },
      },
      {
        $unwind: '$fromjob',
      }, //
      {
        $match: {
          'fromjob.company': mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: { _id: '$status', count: { $sum: 1 } },
      },
    ]);
    for (var i = 0; i < applicationQuantity.length; i++) {
      switch (applicationQuantity[i]._id) {
        case 'NotSaved': {
          result.NotSaved = applicationQuantity[i].count;
          break;
        }
        case 'Saved': {
          result.Saved = applicationQuantity[i].count;
          break;
        }
        case 'Deleted': {
          result.Deleted = applicationQuantity[i].count;
          break;
        }
      }
    }
    res.status(200).json({
      status: 'success',
      lengh: applicationQuantity.length,
      data: {
        data: result,
      },
    });
  });
  getApplicationStas = catchAsync(async (req, res, next) => {
    const application = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs', /// Name collection from database, not name from exported schema
          localField: 'job',
          foreignField: '_id',
          as: 'fromjob',
        },
      },
      {
        $unwind: '$fromjob',
      }, //
      {
        $match: {
          'fromjob.company': mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: { _id: '$fromjob.jobTitle', count: { $sum: 1 } },
      },
    ]);
    res.status(200).json({
      status: 'success',
      lengh: application.length,
      data: {
        data: application,
      },
    });
  });
  getApplicationTodayYesterday = catchAsync(async (req, res, next) => {
    var result = {
      past: 0,
      current: 0,
    };
    const now = new Date();
    const year = now.getFullYear();
    const day = getDayOfYear();
    const applications = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs', /// Name collection from database, not name from exported schema
          localField: 'job',
          foreignField: '_id',
          as: 'fromjob',
        },
      },
      {
        $unwind: '$fromjob',
      }, //
      {
        $match: {
          'fromjob.company': mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $addFields: {
          day: { $dayOfYear: '$createdAt' },
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
        $addFields: {
          timeline: {
            $cond: {
              if: {
                $eq: ['$day', day],
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
    for (var i = 0; i < applications.length; i++) {
      if (applications[i]._id == 'current') {
        result.current = applications[i].count;
      }
      if (applications[i]._id == 'past') {
        result.past = applications[i].count;
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
}
module.exports = new applicationController();
