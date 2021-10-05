const express = require('express');
const employerRouter = express.Router();
const employerController = require('./../controllers/employerController');

employerRouter.route('/').post(employerController.sendInformation);
module.exports = employerRouter;
