const express = require('express');
const chatRouter = express.Router();

const chatController = require('./../controllers/chatController');
const authController = require('./../controllers/authController');

chatRouter.route('/room').get(chatController.getChatRoom);
chatRouter
  .route('/room/:idRoom/message')
  .post(
    authController.protect,
    authController.restrictTo('employer', 'jobseeker'),
    chatController.createMessage
  )
  .get(
    authController.protect,
    authController.restrictTo('employer', 'jobseeker'),
    chatController.getMessage
  );

chatRouter
  .route('/message/:id')
  .patch(
    authController.protect,
    authController.restrictTo('employer', 'jobseeker'),
    chatController.setSeener,
    chatController.updateSeener
  );
module.exports = chatRouter;
