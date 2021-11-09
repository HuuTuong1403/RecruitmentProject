const express = require('express');

const participantRouter = express.Router({ mergeParams: true });

const participantController = require('./../controllers/participantController');

const authController = require('./../controllers/authController');
const validator = require('./../middlewares/validator');

participantRouter.use(authController.protect);

participantRouter
  .route('/')
  .post(
    authController.restrictTo('jobseeker'),
    participantController.setParticipantBodyCreation,
    validator.checkParticipantQuantityEvent,
    participantController.createParticipant
  )
  .get(
    participantController.setParticipantQueryView,
    participantController.getAllParticipant
  );
participantRouter.route('/:id').get(participantController.getDetailParticipant);

participantRouter.use(authController.restrictTo('employer'));

participantRouter
  .route('/management/all')
  .get(
    participantController.setQueryParticipantManagement,
    participantController.getAllParticipantManagement
  );

module.exports = participantRouter;
