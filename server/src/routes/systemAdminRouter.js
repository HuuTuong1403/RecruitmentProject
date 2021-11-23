const express = require('express');
const systemAdminRouter = express.Router();

const authController = require('./../controllers/authController');
const systemAdminController = require('./../controllers/systemAdminController');

const validator = require('./../middlewares/validator');
const uploadAvatar = require('./../middlewares/uploadAvatar');

systemAdminRouter.route('/account').post(authController.signUpSystemAdmin);
systemAdminRouter.route('/login').post(authController.loginSystemAdmin);
systemAdminRouter.use(
  authController.protect,
  authController.restrictTo('systemadmin')
);
systemAdminRouter
  .route('/updatePassword')
  .patch(systemAdminController.updateSystemAdminPassword);
systemAdminRouter
  .route('/updateMe')
  .patch(
    validator.checkUpdateSytemAdmin,
    uploadAvatar.uploadAvatar,
    uploadAvatar.uploadAvatarToCloudinary,
    systemAdminController.updateMe
  );
systemAdminRouter
  .route('/manage/system-manager')
  .post(authController.signUpSystemManager);
systemAdminRouter
  .route('/statistic/user-stat')
  .get(systemAdminController.getUserStat);
systemAdminRouter
  .route('/statistic/user-comp')
  .get(systemAdminController.getUserComp);
systemAdminRouter.route('/').get(systemAdminController.getSystemAdmin);
module.exports = systemAdminRouter;
