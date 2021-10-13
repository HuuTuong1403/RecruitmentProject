const express = require('express');
const systemAdminRouter = express.Router();
const authController = require('./../controllers/authController');

systemAdminRouter
  .route('/manage/system-manager')
  .post(
    authController.protect,
    authController.restrictTo('systemadmin'),
    authController.signUpSystemManager
  );
systemAdminRouter.route('/account').post(authController.signUpSystemAdmin);
systemAdminRouter.route('/login').post(authController.loginSystemAdmin);
module.exports = systemAdminRouter;
