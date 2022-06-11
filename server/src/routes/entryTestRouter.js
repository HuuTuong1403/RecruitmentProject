const express = require('express');
const entryTestRouter = express.Router({ mergeParams: true });

const authController = require('./../controllers/authController');
const EntryTestController = require('./../controllers/entryTestController');
const answerSheetRouter = require('./answerSheetRouter');

entryTestRouter.use('/:idEntryTest/answersheets', answerSheetRouter);
entryTestRouter
  .route('/:id')
  .get(authController.protect, EntryTestController.getEntryTest)
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.deleteEntryTest
  )
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.updateEntryTest
  );
entryTestRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.setBodyEntryTest,
    EntryTestController.createEntryTest
  )
  .get(
    authController.protect,
    EntryTestController.setCompany,
    EntryTestController.getAllEntryTest
  );
entryTestRouter
  .route('/soft-delete/:id')
  .delete(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.softDeleteEntryTest
  );
entryTestRouter
  .route('/soft-delete/trash')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.getAllDeletedEntryTest
  );
entryTestRouter
  .route('/soft-delete/trash/:id')
  .get(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.getDeletedEntryTest
  );
entryTestRouter
  .route('/restore/:id')
  .patch(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.restoreEntryTest
  );
module.exports = entryTestRouter;
