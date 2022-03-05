const mongoose = require('mongoose');

const seenBySchema = new mongoose.Schema(
  {
    readBy: mongoose.Schema.ObjectId,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
);
const chatMessageSchema = new mongoose.Schema(
  {
    IDRoom: mongoose.Schema.ObjectId,
    message: mongoose.Schema.Types.Mixed,
    postedBy: mongoose.Schema.ObjectId,
    seenBy: [seenBySchema],
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
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;
