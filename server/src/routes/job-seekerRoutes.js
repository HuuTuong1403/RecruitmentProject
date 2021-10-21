const express = require('express');
const authController = require('./../controllers/authController');
const jobSeekerController = require('./../controllers/jobSeekerController');
const uploadAvatar = require('./../middlewares/uploadAvatar');
const jobseekerRouter = express.Router();

jobseekerRouter.route('/signup').post(authController.signUpJobSeeker);
jobseekerRouter.route('/login').post(authController.loginJobSeeker);
jobseekerRouter
  .route('/authentication/:token')
  .get(authController.confirmJobSeekerEmail);
jobseekerRouter
  .route('/forgotPassword')
  .post(authController.forgotJobSeekerPassword);
jobseekerRouter
  .route('/resetPassword/:token')
  .patch(authController.resetJobSeekerPassword);
jobseekerRouter
  .route('/updatePassword')
  .patch(
    authController.protect,
    authController.restrictTo('jobseeker'),
    jobSeekerController.updateJobSeekerPassword
  );
jobseekerRouter
  .route('/updateMe')
  .patch(
    authController.protect,
    authController.restrictTo('jobseeker'),
    uploadAvatar.uploadAvatar,
    uploadAvatar.uploadAvatarToCloudinary,
    jobSeekerController.updateMe
  );
jobseekerRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('jobseeker'),
    jobSeekerController.getJobSeeker
  );
module.exports = jobseekerRouter;
