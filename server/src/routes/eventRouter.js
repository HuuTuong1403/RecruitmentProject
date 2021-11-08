const express = require('express');

const eventRouter = express.Router({ mergeParams: true });

const eventController = require('./../controllers/eventController');

const uploadImageEvent = require('./../middlewares/uploadImageEvent');
const authController = require('./../controllers/authController');
const eventQuery = require('./../middlewares/eventQuery');

eventRouter
  .route('/')
  .get(
    eventQuery.customEventQuery,
    eventController.setCompany,
    eventController.getAllEvent
  )
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    uploadImageEvent.uploadTourImages,
    uploadImageEvent.uploadEventImageToCloudinary,
    eventController.setBodyEventCreation,
    eventController.createEvent
  );
eventRouter.route('/:slug').get(eventController.getEventAccordingToSlug);
eventRouter.use(authController.protect, authController.restrictTo('employer'));
eventRouter
  .route('/management/:id')
  .patch(
    uploadImageEvent.uploadTourImages,
    uploadImageEvent.uploadEventImageToCloudinary,
    eventController.updateEvent
  )
  .get(eventController.getEventAccordingtoId);

module.exports = eventRouter;
