const factory = require('./handleFactory');
const AnswerSheet = require('./../models/answerSheetModel');
const catchAsync = require('../utils/catchAsync');

class AnswerSheetController {
  setBodyAnswerSheet = (req, res, next) => {
    req.body.jobSeeker = req.user.id;
    req.body.entryTest = req.params.idEntryTest;
    next();
  };
  createAnswerSheet = factory.createOne(AnswerSheet);
  updateAnswerSheet = factory.updateOne(AnswerSheet);
  softDeleteAnswerSheet = factory.softDeleteOne(AnswerSheet);
  getAllDeletedAnswerSheet = factory.getDeletedAll(AnswerSheet);
  getDeletedAnswerSheet = factory.getDeletedOne(AnswerSheet);
  restoreAnswerSheet = factory.restoreOne(AnswerSheet);
  getAllAnswerSheet = factory.getAll(AnswerSheet);
  getAnswerSheet = factory.getOne(AnswerSheet);
  deleteAnswerSheet = factory.deleteOne(AnswerSheet);
}
module.exports = new AnswerSheetController();
