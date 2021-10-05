const express = require('express');
const authController = require('./../controllers/authController');
const jobseekerRouter = express.Router();

jobseekerRouter.route('/signup').post(authController.signUpJobSeeker);
jobseekerRouter.route('/login').post(authController.loginJobSeeker);

module.exports = jobseekerRouter;
