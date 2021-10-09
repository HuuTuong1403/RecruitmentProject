const Employer = require('./../models/employerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
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
    res.status(201).json({
      status: 'success',
      data: {
        Employer: newEmployer,
      },
    });
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
