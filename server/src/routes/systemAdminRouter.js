const express = require('express');
const systemAdminRouter = express.Router();
const authController = require('./../controllers/authController');

systemAdminRouter
  .route('/manage/system-manager')
  .post(authController.signUpSystemManager);
module.exports = systemAdminRouter;
