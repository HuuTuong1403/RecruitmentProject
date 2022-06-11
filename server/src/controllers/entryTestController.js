const factory = require('./handleFactory');
const EntryTest = require('./../models/entryTestModel');
const catchAsync = require('../utils/catchAsync');

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
    await entryTest.save()
    res.status(200).json({
      status: 'success',
      data: {
        data: entryTest,
      },
    });
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
