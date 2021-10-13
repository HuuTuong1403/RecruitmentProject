const fs = require('fs');
const Employer = require('./../models/employerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Token = require('./../services/token');
const sendEmail = require('./../services/email');
var issueAcountEmailFiles = fs.readFileSync(
  `${__dirname}/../public/IssueAccount/IssueAccountEmail.html`,
  'utf-8'
);
class systemManagerController {
  getAllEmployer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Employer.find(), {
      status: 'unapproval',
      isEmailVerified: 'true',
    })
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
      const features = new APIFeatures(
        Employer.findById(req.params.id),
        {}
      ).limitFields();
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
      return next(new AppError('No employer found with id', 404));
    }
    employer.username = req.body.username;
    employer.password = req.body.password;
    employer.status = 'approval';

    await employer.save();

    //Send email to employer
    var content = issueAcountEmailFiles.replace(
      /{%username%}/g,
      req.body.username
    );
    content = content.replace(/{%password%}/g, req.body.password);
    try {
      await sendEmail({
        email: employer.email,
        subject: `[MST-Company] Yêu cầu cấp tài khoản cho công ty ${employer.companyName} thành công`,
        content,
      });
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
}

module.exports = new systemManagerController();
