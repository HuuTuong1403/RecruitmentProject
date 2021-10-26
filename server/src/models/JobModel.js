const mongoose = require('mongoose');
const slugify = require('slugify');
const Employer = require('./employerModel');
const JobSeeker = require('./job-seekerModel');
const addressSchema = require('./addressModel');

const finishDate = new Date();
finishDate.setDate(finishDate.getDate() + 7);

const salarySchema = new mongoose.Schema(
  {
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    type: {
      type: String,
      default: 'negotiation',
      trim: true,
    },
  },
  { _id: false }
);
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
    },
    applicants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'JobSeeker',
      },
    ],
    companyName: {
      type: String,
      required: [true, 'Company must have a name'],
      trim: true,
    },
    // companyType: {
    //   type: String,
    // },
    // companyWebsite: {
    //   type: String,
    //   trim: true,
    // },
    // logo: {
    //   type: String,
    // },
    // ot: {
    //   type: Boolean,
    //   default: false,
    // },
    // quantity: {
    //   type: Number,
    //   default: 30,
    // },
    workingTime: {
      finish: {
        type: String,
      },
      start: {
        type: String,
      },
    },
    location: {
      type: addressSchema,
    },
    benifits: {
      type: String,
      required: [true, 'Job must have benifit'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job must have description'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job must have title'],
      trim: true,
    },
    slug: {
      type: String,
    },
    position: {
      type: String,
      trim: true,
    },
    priorityLevel: {
      type: String,
      default: 'Normal',
    },
    reason: {
      type: String,
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, 'Job must have requirements'],
      trim: true,
    },
    responsibilities: {
      type: String,
      trim: true,
    },
    salary: salarySchema,
    skills: [String],
    level: {
      type: String,
      required: [true, 'A job must have a level'],
      enum: {
        values: ['intern', 'fresher', 'junior', 'senior'],
        message: 'level is either: inter, fresher, junior, senior',
      },
    },
    status: {
      type: String,
      default: 'unapproval',
    },
    finishDate: {
      type: Date,
      default: finishDate,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
jobSchema.virtual('aboutCreated').get(function () {
  const timeAgoMilisecond = Date.now() - this.createdAt;
  const timeAgoSecond = timeAgoMilisecond / 1000;
  var timeResult = null;
  if (timeAgoSecond < 60) {
    timeResult = timeAgoSecond.toFixed(0) + ' seconds ago';
  } else if (timeAgoSecond < 3600) {
    timeResult = (timeAgoSecond / 60).toFixed(0) + ' minutes ago';
  } else if (timeAgoSecond < 86400) {
    timeResult = (timeAgoSecond / 3600).toFixed(0) + ' hours ago';
  } else {
    timeResult = (timeAgoSecond / 86400).toFixed(0) + ' days ago';
  }
  return timeResult;
});
jobSchema.virtual('isNew').get(function () {
  const timeAgoMilisecond = Date.now() - this.createdAt;
  const timeAgoSecond = timeAgoMilisecond / 1000;
  return timeAgoSecond < 86400 ? true : false;
});

//DOCUMENT MIDDLEWARE: run before .save() and .create()
jobSchema.pre('save', async function (next) {
  this.slug = slugify(`${this.jobTitle} ${this._id}`, {
    lower: true,
  });
  next();
});
jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'companyName companyType companyWebsite logo ot quantity',
  });
  next();
});
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
