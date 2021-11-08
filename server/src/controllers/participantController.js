const factory = require('./handleFactory');
const Participant = require('./../models/participantModel');
class participantController {
  setParticipantBodyCreation = (req, res, next) => {
    req.body.event = req.params.idEvent;
    req.body.participant = req.user.id;
    next();
  };
  createParticipant = factory.createOne(Participant);
}
module.exports = new participantController();
