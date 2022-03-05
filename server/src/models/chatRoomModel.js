const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    users: [mongoose.Schema.ObjectId],
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
chatRoomSchema.statics.initiateChat = async function (IDUsers) {
  try {
    const availableRoom = await this.findOne({
      users: { $in: IDUsers },
    });
    if (availableRoom) {
      return {
        status: 'success',
        data: {
          isNew: false,
          room: availableRoom,
        },
      };
    }
    const newRoom = await this.create({ users: IDUsers });
    return {
      status: 'success',
      data: {
        isNew: true,
        room: newRoom,
      },
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
};
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;
