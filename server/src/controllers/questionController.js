const factory = require('./handleFactory');
const Question = require('./../models/questionModel');

class QuestionController {
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
