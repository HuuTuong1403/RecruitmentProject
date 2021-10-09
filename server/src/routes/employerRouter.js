const express = require('express');
const employerRouter = express.Router();
const employerController = require('./../controllers/employerController');
const authController = require('./../controllers/authController');

employerRouter.route('/login').post(authController.loginEmployer);
employerRouter.route('/').post(employerController.sendInformation);
employerRouter.route('/:id').get(employerController.getEmployer);
module.exports = employerRouter;
