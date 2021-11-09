const factory = require('./handleFactory');

const Participant = require('./../models/participantModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

class participantController {
  setParticipantBodyCreation = (req, res, next) => {
    req.body.event = req.params.idEvent;
    req.body.participant = req.user.id;
    req.body.createdAt = Date.now();
    next();
  };
  setParticipantQueryView = (req, res, next) => {
    if (req.user.role == 'jobseeker') {
      req.query.participant = req.user.id;
    }
    next();
  };
  createParticipant = factory.createOne(Participant);
  getAllParticipant = factory.getAll(Participant);
  getDetailParticipant = factory.getOne(Participant);
  setQueryParticipantManagement = (req, res, next) => {
    if (req.query.fullName) {
      req.query.fullName = { $regex: req.query.fullName, $options: 'si' };
    }
    if (req.query.startTime || req.query.endTime) {
      if (req.query.startTime && req.query.endTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
          lte: new Date(req.query.endTime),
        };
        req.query.startTime = undefined;
        req.query.endTime = undefined;
      }
      if (req.query.startTime) {
        req.query.createdAt = {
          gte: new Date(req.query.startTime),
        };
        req.query.startTime = undefined;
      }
      if (req.query.endTime) {
        req.query.createdAt = {
          lte: new Date(req.query.endTime),
        };
        req.query.endTime = undefined;
      }
    }
    next();
  };
  getAllParticipantManagement = catchAsync(async (req, res, next) => {
    var filter = req.query;
    let eventName = undefined;
    let eventStatus = undefined;
    if (req.query.eventName) {
      eventName = new RegExp(`${req.query.eventName}`, 'gi');
      req.query.eventName = undefined;
    }
    if (req.query.eventStatus) {
      eventStatus = req.query.eventStatus;
      req.query.eventStatus = undefined;
    }
    const features = new APIFeatures(Participant.find(), filter)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let participants = await features.query;
    participants = participants.filter((el) => {
      if (el.event.company.id === req.user.id) {
        if (!eventName && !eventStatus) {
          return el;
        }
        if (eventName && eventStatus) {
          if (
            eventName.test(el.event.eventName) &&
            el.event.status == eventStatus
          ) {
            return el;
          }
        }
        if (eventName) {
          if (eventName.test(el.event.eventName)) {
            return el;
          }
        }
        if (eventStatus) {
          if (el.event.status == eventStatus) {
            return el;
          }
        }
      }
    });
    res.status(200).json({
      status: 'sucess',
      results: participants.length,
      data: {
        data: participants,
      },
    });
  });
}
module.exports = new participantController();
