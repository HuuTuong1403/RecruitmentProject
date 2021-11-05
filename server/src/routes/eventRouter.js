const express = require('express');

const eventRouter = express.Router({ mergeParams: true });

const eventController = require('./../controllers/eventController');

const uploadImageEvent = require('./../middlewares/uploadImageEvent');
const authController = require('./../controllers/authController');

eventRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    uploadImageEvent.uploadTourImages,
    uploadImageEvent.uploadEventImageToCloudinary,
    eventController.setBodyEventCreation,
    eventController.createEvent
  );
module.exports = eventRouter;
