const Event = require('./../models/eventModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
class eventController {
  setBodyEventCreation = (req, res, next) => {
    req.body.company = req.user.id;
    next();
  };
  setCompany = (req, res, next) => {
    if (req.user && req.user.role == 'employer') {
      req.query.company = req.user.id;
    }

    next();
  };
  createEvent = factory.createOne(Event);
  getAllEvent = factory.getAll(Event);
  getEventAccordingToSlug = factory.getOneUniqueField(Event);
  getEventAccordingtoId = factory.getOne(Event);
  // updateEvent = factory.updateOne(Event);
  updateEvent = catchAsync(async (req, res, next) => {
    res.send(req.body);
  });
}
module.exports = new eventController();
