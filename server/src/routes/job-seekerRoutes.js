const express = require('express');

const authController = require('./../controllers/authController');
const jobSeekerController = require('./../controllers/jobSeekerController');

const uploadAvatar = require('./../middlewares/uploadAvatar');

const jobseekerRouter = express.Router();
const jobRouter = require('./jobRoutes');
const applicationRouter = require('./applicationRouter');
const reviewRouter = require('./reviewRouter');
const eventRouter = require('./eventRouter');
const participantRouter = require('./participantRouter');

jobseekerRouter.use('/participants', participantRouter);
jobseekerRouter.use('/jobs', jobRouter);
jobseekerRouter.use('/applications', applicationRouter);
jobseekerRouter.use('/reviews', reviewRouter);
jobseekerRouter.use('/events', eventRouter);

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

jobseekerRouter.use(
  authController.protect,
  authController.restrictTo('jobseeker')
);

jobseekerRouter
  .route('/updatePassword')
  .patch(jobSeekerController.updateJobSeekerPassword);
jobseekerRouter
  .route('/updateMe')
  .patch(
    uploadAvatar.uploadAvatar,
    uploadAvatar.uploadAvatarToCloudinary,
    jobSeekerController.updateMe
  );

jobseekerRouter.route('/favorite-jobs').get(jobSeekerController.getFavoriteJob);
jobseekerRouter
  .route('/favorite-jobs/:idJob')
  .patch(jobSeekerController.addFavoriveJob)
  .delete(jobSeekerController.removeFavoriteJob);
jobseekerRouter.route('/').get(jobSeekerController.getJobSeeker);

module.exports = jobseekerRouter;
