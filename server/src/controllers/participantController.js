const fs = require('fs');

const mongoose = require('mongoose');
const excelJS = require('exceljs');

const factory = require('./handleFactory');

const Participant = require('./../models/participantModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const email = require('./../services/email');
const participantEmail = fs.readFileSync(
  `${__dirname}/../public/EventEmail/participant_event.html`,
  'utf-8'
);
const getDayOfYear = () => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
};

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
    if (req.params.idEvent) {
      req.query.event = req.params.idEvent;
    }
    next();
  };
  //createParticipant = factory.createOne(Participant);
  createParticipant = catchAsync(async (req, res, next) => {
    const participant = await Participant.create(req.body);
    let participantCreated = await Participant.findById(participant.id);
    try {
      const user = {
        email: participantCreated.participant.email,
        participant: participantCreated,
      };
      await new email(user, null).sendParticipantEmail();
    } catch (err) {
      return next(
        new AppError(
          `Có lỗi xảy ra trong quá trình gửi mail cho ${participantCreated.fullName}! Vui lòng thử lại sau`,
          500
        )
      );
    }
    res.status(201).json({
      status: 'success',
      data: { data: participant },
    });
  });
  getAllParticipant = factory.getAll(Participant);
  getDetailParticipant = factory.getOne(Participant);
  setQueryParticipantManagement = (req, res, next) => {
    if (req.params.idEvent) {
      req.query.event = req.params.idEvent;
    }
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
      if (el.event?.company.id === req.user.id) {
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
  exportParticipantsExcel = catchAsync(async (req, res, next) => {
    const participants = req.body;
    const workbook = new excelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet('Partipant list'); // New Worksheet

    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Họ và tên', key: 'fullName', width: 20 },
      { header: 'Số điện thoại', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Địa chỉ', key: 'address', width: 80 },
      { header: 'Ngày sinh', key: 'dob', width: 15 },
      { header: 'Lĩnh vực quan tâm', key: 'interestingField', width: 50 },
      { header: 'Trạng thái', key: 'status', width: 15 },
      { header: 'Ngày đăng ký', key: 'createdAt', width: 15 },
    ];

    // Looping through User data
    let counter = 1;

    participants.forEach((participant) => {
      participant.stt = counter;
      worksheet.addRow(participant); // Add data in worksheet
      counter++;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `participants.xlsx`
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
  getParticipantStat = catchAsync(async (req, res, next) => {
    const participant = await Participant.aggregate([
      {
        $lookup: {
          from: 'events', /// Name collection from database, not name from exported schema
          localField: 'event',
          foreignField: '_id',
          as: 'fromevent',
        },
      },
      {
        $unwind: '$fromevent',
      }, //
      {
        $match: {
          'fromevent.company': mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: { _id: '$fromevent.eventName', count: { $sum: 1 } },
      },
    ]);
    res.status(200).json({
      status: 'success',
      lengh: participant.length,
      data: {
        data: participant,
      },
    });
  });
  getParticipantCurrentandPast = catchAsync(async (req, res, next) => {
    var result = {
      past: 0,
      current: 0,
    };
    const now = new Date();
    const year = now.getFullYear();
    const day = getDayOfYear();
    const participants = await Participant.aggregate([
      {
        $lookup: {
          from: 'events', /// Name collection from database, not name from exported schema
          localField: 'event',
          foreignField: '_id',
          as: 'fromEvent',
        },
      },
      {
        $unwind: '$fromEvent',
      }, //
      {
        $match: {
          'fromEvent.company': mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $addFields: {
          day: { $dayOfYear: '$createdAt' },
        },
      },
      {
        $redact: {
          $cond: [
            {
              $eq: [{ $year: '$createdAt' }, year],
            },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      },
      {
        $addFields: {
          timeline: {
            $cond: {
              if: {
                $eq: ['$day', day],
              },
              then: 'current',
              else: 'past',
            },
          },
        },
      },
      {
        $group: { _id: '$timeline', count: { $sum: 1 } },
      },
    ]);
    for (var i = 0; i < participants.length; i++) {
      if (participants[i]._id == 'current') {
        result.current = participants[i].count;
      }
      if (participants[i]._id == 'past') {
        result.past = participants[i].count;
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: result,
      },
    });
  });
}
module.exports = new participantController();
