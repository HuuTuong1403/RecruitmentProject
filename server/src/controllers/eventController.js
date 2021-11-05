const Event = require('./../models/eventModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
class eventController {
  setBodyEventCreation = (req, res, next) => {
    req.body.company = req.user.id;
    next();
  };
  createEvent = factory.createOne(Event);
}
module.exports = new eventController();
