const factory = require('./handleFactory');
const EntryTest = require('./../models/entryTestModel');
const catchAsync = require('../utils/catchAsync');
const email = require('./../services/email');
const AppError = require('./../utils/appError');
const Application = require('./../models/application');
class EntryTestController {
  setBodyEntryTest = (req, res, next) => {
    req.body.company = req.user.id;
    next();
  };
  setCompany = (req, res, next) => {
    if (req.user && req.user.role == 'employer') {
      req.query.company = req.user.id;
    }
    next();
  };
  createEntryTest = factory.createOne(EntryTest);
  updateEntryTest = catchAsync(async (req, res, next) => {
    let entryTest = await EntryTest.findById(req.params.id);
    for (const key in req.body) {
      entryTest[key] = req.body[key];
    }

    await entryTest.save();
    res.status(200).json({
      status: 'success',
      data: {
        data: entryTest,
      },
    });
  });
  announceEntryTest = catchAsync(async (req, res, next) => {
    let application = await Application.updateMany(
      { _id: { $in: req.body.id } },
      { status: 'Testing' }
    );
    application = await Application.find({ _id: { $in: req.body.id } });
    await Promise.all(
      application.map(async (el) => {
        try {
          const user = {
            email: el.jobSeeker.email,
            bodyEmail: {
              companyName: req.body.companyName,
              jobTitle: req.body.jobTitle,
              logo: req.body.logo,
              url: `${req.body.url}?idApplication=${el._id}`,
            },
          };
          await new email(user, null).sendEntryTestEmail();
        } catch (err) {
          return next(
            new AppError(
              `Có lỗi xảy ra trong quá trình gửi mail cho ${req.body.email}! Vui lòng thử lại sau`,
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
    // const emailJobSeekers = req.body.emails;
    // await Promise.all(
    //   emailJobSeekers.map(async (emailJobSeeker) => {
    //     try {
    //       const user = {
    //         email: emailJobSeeker,
    //         bodyEmail: {
    //           companyName: req.body.companyName,
    //           jobTitle: req.body.jobTitle,
    //           logo: req.body.logo,
    //           url: req.body.url,
    //         },
    //       };
    //       await new email(user, null).sendEntryTestEmail();
    //     } catch (err) {
    //       return next(
    //         new AppError(
    //           `Có lỗi xảy ra trong quá trình gửi mail cho ${req.body.email}! Vui lòng thử lại sau`,
    //           500
    //         )
    //       );
    //     }
    //   })
    // );
    // return res.status(200).json({
    //   status: 'success',
    //   message: 'Đã gửi thông báo tham gia kiểm tra đến cho ứng viên thành công',
    // });
  });
  softDeleteEntryTest = factory.softDeleteOne(EntryTest);
  getAllDeletedEntryTest = factory.getDeletedAll(EntryTest);
  getDeletedEntryTest = factory.getDeletedOne(EntryTest);
  restoreEntryTest = factory.restoreOne(EntryTest);
  getAllEntryTest = factory.getAll(EntryTest);
  getEntryTest = factory.getOne(EntryTest);
  deleteEntryTest = factory.deleteOne(EntryTest);
}
module.exports = new EntryTestController();
