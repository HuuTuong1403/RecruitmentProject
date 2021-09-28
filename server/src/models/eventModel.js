const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    Address: {
      City: {
        type: String,
      },
      Country: {
        type: String,
      },
      District: {
        type: String,
      },
      Street: {
        type: String,
        trim: true,
      },
      Ward: {
        type: String,
      },
    },
    BriefDescription: {
      type: String,
      required: [true, 'Event must have brief description'],
      trim: true,
    },
    EndTime: {
      type: Date,
      required: [true, 'Event must have finish time'],
    },
    EventContent: {
      type: String,
      required: [true, 'Event must have content'],
      trim: true,
    },
    EventName: {
      type: String,
      required: [true, 'Event must have name'],
      trim: true,
    },
    EventOrganizer: {
      type: String,
      required: [true, 'Event must have organizer'],
      trim: true,
    },
    Images: [String],
    Location: {
      type: String,
      trim: true,
    },
    Participants: {
      type: [
        {
          Address: {
            City: {
              type: String,
            },
            Country: {
              type: String,
            },
            District: {
              type: String,
            },
            Street: {
              type: String,
              trim: true,
            },
            Ward: {
              type: String,
            },
          },
          Email: {
            type: String,
            required: [true, 'Paticipant must have a email'],
            trim: true,
            unique: true,
          },
          FullName: {
            type: String,
            required: [true, 'Paticipant must have a fullname'],
            trim: true,
          },
          IDParticipant: {
            type: String,
            required: [true, 'Paticipant must be assigned'],
          },
          InterestingField: {
            type: String,
          },
          LinkCV: {
            type: String,
          },
          PhoneNumber: {
            type: String,
            required: [true, 'Paticipant must have a phone number'],
            trim: true,
            unique: true,
          },
          Status: {
            type: String,
            default: 'Not participate',
          },
        },
      ],
    },
    StartTime: {
      type: Date,
      required: [true, 'Event must have start time'],
    },
    Status: {
      type: String,
      default: 'NotYetOccur',
    },
    Topic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
