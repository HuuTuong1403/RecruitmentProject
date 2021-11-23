const JobSeeker = require('./../models/job-seekerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const getDayOfYear = require('./../utils/getDayOfYear');
const FilterObject = require('../utils/filterObject');

class JobSeekerController {
  getJobSeeker = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(JobSeeker.findById(req.user.id), {
      fields: `-google,-facebook,-applied,-entryTests,-event,-isEmailVerified,-passwordChangeAt,-__v`,
    }).limitFields();
    const jobSeeker = await features.query;
    if (jobSeeker) {
      return res.status(200).json({
        status: 'success',
        data: {
          jobSeeker,
        },
      });
    } else {
      return next(new AppError('Id is invalid', 400));
    }
  });
  updateJobSeekerPassword = catchAsync(async (req, res, next) => {
    //1) Get job seeker from collection
    const jobSeeker = await JobSeeker.findById(req.user.id).select('+password');
    //2) Check if posted current password is correct
    if (
      !(await jobSeeker.correctPassword(
        req.body.currentPassword,
        jobSeeker.password
      ))
    ) {
      return next(new AppError('Password hiện tại không chính xác', 401));
    }
    //3) If so, update password
    jobSeeker.password = req.body.password;
    jobSeeker.passwordConfirm = req.body.passwordConfirm;
    await jobSeeker.save();
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
      'DOB',
      'phone',
      'address',
      'avatar'
    );
    //3) Update job seeker document
    const jobSeeker = await JobSeeker.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    const filteredJobSeeker = FilterObject(
      jobSeeker,
      'fullname',
      'DOB',
      'phone',
      'address',
      'email',
      'username',
      'avatar',
      'createdAt',
      'updatedAt',
      'role'
    );
    res.status(200).json({
      status: 'success',
      data: {
        jobSeeker: filteredJobSeeker,
      },
    });
  });
  addFavoriveJob = catchAsync(async (req, res, next) => {
    const IDJob = req.params.idJob;
    const doc = await JobSeeker.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favoriteJobs: IDJob } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
  removeFavoriteJob = catchAsync(async (req, res, next) => {
    const IDJob = req.params.idJob;
    const doc = await JobSeeker.findByIdAndUpdate(
      req.user.id,
      { $pull: { favoriteJobs: IDJob } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
  getFavoriteJob = catchAsync(async (req, res, next) => {
    let length = 0;
    let result = null;
    if (req.user.favoriteJobs) {
      length = req.user.favoriteJobs.length;
      result = req.user.favoriteJobs;
    }
    res.status(200).json({
      status: 'sucess',
      length: length,
      data: {
        data: result,
      },
    });
  });
  getJobSeekerComp = catchAsync(async (req, res, next) => {
    let result = {
      past: 0,
      current: 0,
    };
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const jobSeekers = await JobSeeker.aggregate([
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
    for (var i = 0; i < jobSeekers.length; i++) {
      if (jobSeekers[i]._id == 'current') {
        result.current = jobSeekers[i].count;
      }
      if (jobSeekers[i]._id == 'past') {
        result.past = jobSeekers[i].count;
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
  getJobSeekerStat = catchAsync(async (req, res, next) => {
    let result = Array(12).fill(0);
    const now = new Date();
    const year = now.getFullYear();
    const jobSeekers = await JobSeeker.aggregate([
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
    for (var i = 0; i < jobSeekers.length; i++) {
      result[jobSeekers[i]._id - 1] = jobSeekers[i].count;
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
}
module.exports = new JobSeekerController();
