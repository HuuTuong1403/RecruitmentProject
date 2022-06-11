const factory = require('./handleFactory');
const mongoose = require('mongoose');
const AnswerSheet = require('./../models/answerSheetModel');
const catchAsync = require('../utils/catchAsync');

class AnswerSheetController {
  setBodyAnswerSheet = (req, res, next) => {
    req.body.jobSeeker = req.user.id;
    req.body.entryTest = req.params.idEntryTest;
    next();
  };
  setQueryAllAnswerSheet = async (req, res, next) => {
    req.query['entryTest._id'] = mongoose.Types.ObjectId(
      req.params.idEntryTest
    );
    next();
  };
  createAnswerSheet = factory.createOne(AnswerSheet);
  updateAnswerSheet = factory.updateOne(AnswerSheet);
  softDeleteAnswerSheet = factory.softDeleteOne(AnswerSheet);
  getAllDeletedAnswerSheet = factory.getDeletedAll(AnswerSheet);
  getDeletedAnswerSheet = factory.getDeletedOne(AnswerSheet);
  restoreAnswerSheet = factory.restoreOne(AnswerSheet);
  getAllAnswerSheet = catchAsync(async (req, res, next) => {
    const answerSheets = await AnswerSheet.find(req.query);
    //Send response
    res.status(200).json({
      status: 'success',
      results: answerSheets.length,
      data: {
        data: answerSheets,
      },
    });
  });
  getAnswerSheet = factory.getOne(AnswerSheet);
  deleteAnswerSheet = factory.deleteOne(AnswerSheet);
}
module.exports = new AnswerSheetController();
