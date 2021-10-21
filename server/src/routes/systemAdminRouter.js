const express = require('express');
const systemAdminRouter = express.Router();
const authController = require('./../controllers/authController');
const systemAdminController = require('./../controllers/systemAdminController');
const validator = require('./../middlewares/validator');
const uploadAvatar = require('./../middlewares/uploadAvatar');
systemAdminRouter
  .route('/updatePassword')
  .patch(
    authController.protect,
    authController.restrictTo('systemadmin'),
    systemAdminController.updateSystemAdminPassword
  );
systemAdminRouter
  .route('/updateMe')
  .patch(
    authController.protect,
    authController.restrictTo('systemadmin'),
    validator.checkUpdateSytemAdmin,
    uploadAvatar.uploadAvatar,
    uploadAvatar.uploadAvatarToCloudinary,
    systemAdminController.updateMe
  );
systemAdminRouter
  .route('/manage/system-manager')
  .post(
    authController.protect,
    authController.restrictTo('systemadmin'),
    authController.signUpSystemManager
  );
systemAdminRouter.route('/account').post(authController.signUpSystemAdmin);
systemAdminRouter.route('/login').post(authController.loginSystemAdmin);
systemAdminRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('systemadmin'),
    systemAdminController.getSystemAdmin
  );
module.exports = systemAdminRouter;
