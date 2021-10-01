const Job = require('./../models/JobModel');
const APIFeatures = require('./../utils/apiFeatures');

class jobController {
  getAllJob = async (req, res) => {
    try {
      const features = new APIFeatures(Job.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const jobs = await features.query;
      res.status(200).json({
        status: 'success',
        length: jobs.length,
        data: {
          job: jobs,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };
}
module.exports = new jobController();
