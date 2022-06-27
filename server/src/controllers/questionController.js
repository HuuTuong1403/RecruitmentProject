const factory = require('./handleFactory');
const Question = require('./../models/questionModel');
const catchAsync = require('../utils/catchAsync');

class QuestionController {
  setBodyCreateQuestion = catchAsync(async (req, res, next) => {
    if (req.user.role == 'employer') {
      req.body.employerCreator = req.user.id;
    }
    if (req.user.role == 'systemmanager') {
      req.body.systemManagerCreator = req.user.id;
    }
    next();
  });
  setBodyGetAllQuestion = catchAsync(async (req, res, next) => {
    if (req.user.role == 'employer') {
      req.query.or = [
        {
          isPrivate: false,
        },
        { employerCreator: req.user.id, isPrivate: true },
      ];
    }
    next();
  });
  createQuestion = factory.createOne(Question);
  updateQuestion = factory.updateOne(Question);
  softDeleteQuestion = factory.softDeleteOne(Question);
  getAllDeletedQuestion = factory.getDeletedAll(Question);
  getDeletedQuestion = factory.getDeletedOne(Question);
  restoreQuestion = factory.restoreOne(Question);
  getAllQuestion = factory.getAll(Question);
  getQuestion = factory.getOne(Question);
  deleteQuestion = factory.deleteOne(Question);
}
module.exports = new QuestionController();
