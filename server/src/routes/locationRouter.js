const express = require('express');
const locationController = require('../controllers/locationController');

const locationRouter = express.Router();

locationRouter.route('/provinces').get(locationController.getProvince);
locationRouter.route('/districts').get(locationController.getDistrict);
locationRouter.route('/wards').get(locationController.getWard);

module.exports = locationRouter;
