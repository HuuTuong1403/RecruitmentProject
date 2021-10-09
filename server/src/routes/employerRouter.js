const express = require('express');
const employerRouter = express.Router();
const employerController = require('./../controllers/employerController');
const authController = require('./../controllers/authController');

employerRouter.route('/').post(employerController.sendInformation);
employerRouter.route('/login').post(authController.loginEmployer);
module.exports = employerRouter;
