const fs = require('fs');
const mongoose = require('mongoose');
const factory = require('./handleFactory');
const Application = require('./../models/application');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const sendEmail = require('./../services/email');
const pass_cv_annoucement = fs.readFileSync(
  `${__dirname}/../public/AnnoucementEmail/Passed_CV_Annoucement.html`,
  'utf-8'
);
const replaceHTML = (application) => {
  let output = pass_cv_annoucement.replace(
    /{{%fullName%}}/g,
    application.fullName
  );
  output = output.replace(/{{%jobTitile%}}/g, application.job.jobTitle);
  output = output.replace(
    /{{%companyName%}}/g,
    application.job.company.companyName
  );
  output = output.replace(
    /{{%companyWebsite%}}/g,
    application.job.company.companyWebsite
  );
  output = output.replace(/{{%logo%}}/g, application.job.company.logo);
  const today = new Date();
  const date = ` ngày ${today.getDate()} tháng ${today.getMonth()} năm ${today.getFullYear()}`;
  output = output.replace(/{{Date}}/g, date);
  return output;
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
      if (application.job.company._id == req.user.id) {
        if (!isExpired) return application;
        if (application.job.isExpired.toString() == isExpired.toString()) {
          return application;
        }
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
    let application = await Application.find({ _id: { $in: req.body.id } });
    application = application.forEach(async (el) => {
      const content = replaceHTML(el);
      try {
        await sendEmail({
          email: el.jobSeeker.email,
          subject: `[${el.job.company.companyName}] Thông báo trúng tuyển tại vị trí ${el.job.jobTitle} thành công`,
          content,
        });
      } catch (err) {
        return next(
          new AppError(
            `Có lỗi xảy ra trong quá trình gửi mail cho ${el.fullName}! Vui lòng thử lại sau`,
            500
          )
        );
      }
    });
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
}
module.exports = new applicationController();
