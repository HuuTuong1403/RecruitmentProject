const mongoose = require('mongoose');
const slugify = require('slugify');
const Employer = require('./employerModel');
const JobSeeker = require('./job-seekerModel');
const addressSchema = require('./addressModel');
const mongoose_delete = require('mongoose-delete');

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
    benefits: {
      type: String,
      required: [true, 'Công việc phải có mô tả lợi ích'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Công việc phải có mô tả'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Công việc phải có tiêu đề'],
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
      required: [true, 'Công việc phải có yêu cầu'],
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
      required: [true, 'Công việc phải có cấp bậc'],
      enum: {
        values: [
          'Intern',
          'Junior',
          'Senior',
          'Leader',
          'Mid-level',
          'Senior Leader',
        ],
        message:
          'Cấp bậc là: Intern, Junior, Senior, Leader, Mid-level hoặc Senior Leader',
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
jobSchema.virtual('isExpired').get(function () {
  return this.finishDate <= Date.now() ? true : false;
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
    select: 'companyName companyType companyWebsite logo ot',
  });
  next();
});
jobSchema.methods.isFavoriteJob = function (IDJob) {
  if (this._id === IDJob) this.isFavorite = true;
};
jobSchema.plugin(mongoose_delete, { deletedBy: true, overrideMethods: true });
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
