const express = require('express');

const systemManagerRouter = express.Router();

const systemManagerController = require('../controllers/systemManagerController');
const authController = require('../controllers/authController');

const validator = require('./../middlewares/validator');
const uploadAvatar = require('./../middlewares/uploadAvatar');

const jobRouter = require('./../routes/jobRoutes');

systemManagerRouter.route('/login').post(authController.loginSystemManager);

systemManagerRouter.use('/jobs', jobRouter);

systemManagerRouter.use(
  authController.protect,
  authController.restrictTo('systemmanager')
);

systemManagerRouter
  .route('/updatePassword')
  .patch(systemManagerController.updateSystemManagerPassword);
systemManagerRouter
  .route('/updateMe')
  .patch(
    validator.checkUpdateSytemManager,
    uploadAvatar.uploadAvatar,
    uploadAvatar.uploadAvatarToCloudinary,
    systemManagerController.updateMe
  );
systemManagerRouter
  .route('/manage/employer')
  .get(systemManagerController.getAllEmployer);
systemManagerRouter
  .route('/manage/employer/:id')
  .get(systemManagerController.getEmployer);
systemManagerRouter
  .route('/manage/employer/:id/issue')
  .patch(
    validator.isEmployerUsernameUnique,
    systemManagerController.issueEmployer
  );

systemManagerRouter.route('/').get(systemManagerController.getSystemManager);

module.exports = systemManagerRouter;
