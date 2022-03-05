const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const ChatRoom = require('./../models/chatRoomModel');
const ChatMessage = require('./../models/chatMessageModel');
const Employer = require('./../models/employerModel');
const JobSeeker = require('./../models/job-seekerModel');
const factory = require('./handleFactory');

class chatController {
  getChatRoom = catchAsync(async (req, res, next) => {
    const IDUsers = req.body.idUsers;
    const room = await ChatRoom.initiateChat(IDUsers);
    return res.status(200).json(room);
  });
  createMessage = catchAsync(async (req, res, next) => {
    const room = await ChatRoom.findOne({
      id: req.params.idRoom,
      users: { $in: req.user.id },
    });
    if (!room) {
      return next(
        new AppError('Không tìm thấy phòng chat của người dùng này', 404)
      );
    }
    const message = {
      IDRoom: req.params.idRoom,
      message: req.body.message,
      postedBy: req.user.id,
    };
    const messageResult = await ChatMessage.create(message);
    res.status(201).json({
      status: 'success',
      data: { data: messageResult },
    });
  });
  setSeener = (req, res, next) => {
    if (req.user) {
      req.body.seenBy = {
        readBy: req.user.id,
      };
    }
    next();
  };
  updateSeener = factory.updateOne(ChatMessage);
  getMessage = catchAsync(async (req, res, next) => {
    const room = await ChatRoom.findById(req.params.idRoom);
    if (!room) {
      return next(
        new AppError('Không tìm thấy phòng chat của người dùng này', 404)
      );
    }
    var users = room.users;
    const new_users = await Promise.all(
      users.map(async (item) => {
        const jobSeeker = await JobSeeker.findById(item);
        if (!jobSeeker) {
          const employer = await Employer.findById(item);
          return {
            id: employer.id,
            fullname: employer.companyName,
            avatar: employer.logo,
            role: employer.role,
          };
        }
        return {
          id: jobSeeker.id,
          fullname: jobSeeker.fullname,
          avatar: jobSeeker.avatar,
          role: jobSeeker.role,
        };
      })
    );
    const message = await ChatMessage.find({ IDRoom: room.id });
    const new_message = await Promise.all(
      message.map(async (item) => {
        for (var i = 0; i < new_users.length; i++) {
          if (item.postedBy == new_users[i].id) {
            item.postedByUser = new_users[i];
          }
          if (item.seenBy?.readBy == new_users[i].id) {
            item.seenBy.readByUser = new_users[i];
          }
        }

        return {
          postedBy: item.postedByUser,
          IDRoom: item.IDRoom,
          message: item.message,
          seenBy: {
            readBy: item.seenBy.readByUser,
            readAt: item.seenBy.readAt,
          },
          createdAt: item.createdAt,
        };
      })
    );
    return res.status(200).json({
      status: 'success',
      results: new_message.length,
      data: {
        data: new_message,
      },
    });
  });
}
module.exports = new chatController();
