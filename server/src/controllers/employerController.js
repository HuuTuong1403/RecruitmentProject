const fs = require('fs');
const Employer = require('./../models/employerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const sendEmail = require('./../services/email');
var confirmEmailFiles = fs.readFileSync(
  `${__dirname}/../public/ConfirmEmail/ConfirmEmail.html`,
  'utf-8'
);
class employerController {
  sendInformation = catchAsync(async (req, res, next) => {
    const newEmployer = await Employer.create({
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      scale: req.body.scale,
      companyWebsite: req.body.companyWebsite,
      address: {
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        street: req.body.street,
      },
      TIN: req.body.TIN,
      companyType: req.body.companyType,
      OT: req.body.OT,
    });
    //2) Generate the random authen token
    const authenToken = newEmployer.createAuthenToken();
    await newEmployer.save({ validateBeforeSave: false });
    //3) Send it to employer's email
    const authenURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/employer/authentication/${authenToken}`;
    const content = confirmEmailFiles.replace(/{%authenURL%}/g, authenURL);
    try {
      await sendEmail({
        email: newEmployer.email,
        subject: '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)',
        content,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          Employer: newEmployer,
        },
      });
    } catch (err) {
      return next(
        new AppError(
          'There was an error sending this email. Try again later!',
          500
        )
      );
    }
  });
  getEmployer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Employer.findById(req.params.id), {
      fields: `-isEmailVerified,-__v,-entryTest,-event,-jobs,-registeredServicePackages,-reviews,-status,-updatedAt`,
    }).limitFields();
    const employer = await features.query;
    if (!employer) {
      return next(new AppError('ID không hợp lệ', 400));
    }
    res.status(200).json({
      status: 'success',
      data: {
        Employer: employer,
      },
    });
  });
}
module.exports = new employerController();
