const express = require('express');
const answerSheetRouter = express.Router({ mergeParams: true });

const authController = require('./../controllers/authController');
const AnswerSheetController = require('./../controllers/answerSheetController');

answerSheetRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('jobseeker'),
    AnswerSheetController.setBodyAnswerSheet,
    AnswerSheetController.createAnswerSheet
  )
  .get(authController.protect, AnswerSheetController.getAllAnswerSheet);
answerSheetRouter
  .route('/:id')
  .get(authController.protect, AnswerSheetController.getAnswerSheet)
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    AnswerSheetController.deleteAnswerSheet
  );
answerSheetRouter
  .route('/soft-delete/:id')
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    AnswerSheetController.softDeleteAnswerSheet
  );
answerSheetRouter
  .route('/soft-delete/trash')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    AnswerSheetController.getAllDeletedAnswerSheet
  );
answerSheetRouter
  .route('/soft-delete/trash/:id')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    AnswerSheetController.getDeletedAnswerSheet
  );
answerSheetRouter
  .route('/restore/:id')
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    AnswerSheetController.restoreAnswerSheet
  );
module.exports = answerSheetRouter;
