const express = require('express');

const QuestionController = require('./../controllers/questionController');
const authController = require('./../controllers/authController');
const questionQuery = require('./../middlewares/questionQuery');

const QuestionRouter = express.Router({ mergeParams: true });
QuestionRouter.use(
  authController.protect,
  authController.restrictTo('systemmanager', 'employer')
);
QuestionRouter.route('/')
  .post(QuestionController.createQuestion)
  .get(questionQuery.customQuestionQuery, QuestionController.getAllQuestion);
QuestionRouter.route('/:id')
  .patch(QuestionController.updateQuestion)
  .get(QuestionController.getQuestion)
  .delete(QuestionController.deleteQuestion);

QuestionRouter.route('/soft-delete/:id').delete(
  QuestionController.softDeleteQuestion
);
QuestionRouter.route('/soft-delete/trash').get(
  QuestionController.getAllDeletedQuestion
);
QuestionRouter.route('/soft-delete/trash/:id').get(
  QuestionController.getDeletedQuestion
);
QuestionRouter.route('/restore/:id').patch(QuestionController.restoreQuestion);
module.exports = QuestionRouter;
