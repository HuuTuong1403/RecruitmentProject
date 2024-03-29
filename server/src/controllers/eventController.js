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
  pauseEvent = (req, res, next) => {
    req.body.status = 'Pausing';
    next();
  };
  createEvent = factory.createOne(Event);
  getAllEvent = factory.getAll(Event, 'Event');
  getEventAccordingToSlug = factory.getOneUniqueField(Event);
  getEventAccordingtoId = factory.getOne(Event);
  updateEvent = factory.updateOne(Event);
  getAllDeletedEvent = factory.getDeletedAll(Event);
  getDeletedEvent = factory.getDeletedOne(Event);
  softDeleteEvent = factory.softDeleteOne(Event);
  restoreEvent = factory.restoreOne(Event);
  deleteEvent = factory.deleteOne(Event);
}
module.exports = new eventController();
