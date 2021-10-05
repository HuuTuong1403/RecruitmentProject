const express = require('express');
const authController = require('./../controllers/authController');
const jobSeekerController = require('./../controllers/jobSeekerController');
const jobseekerRouter = express.Router();

jobseekerRouter.route('/signup').post(authController.signUpJobSeeker);
jobseekerRouter.route('/login').post(authController.loginJobSeeker);
jobseekerRouter.route('/:id').get(jobSeekerController.getJobSeeker);
module.exports = jobseekerRouter;
