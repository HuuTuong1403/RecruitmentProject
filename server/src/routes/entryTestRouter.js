const express = require('express');
const entryTestRouter = express.Router({ mergeParams: true });

const authController = require('./../controllers/authController');
const EntryTestController = require('./../controllers/entryTestController');

entryTestRouter
  .route('/:id')
  .get(
    authController.protect,
    EntryTestController.setCompany,
    EntryTestController.getEntryTest
  );
entryTestRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    EntryTestController.setBodyEntryTest,
    EntryTestController.createEntryTest
  );
module.exports = entryTestRouter;
