const express = require('express');

const jobseekerRouter = express.Router();

jobseekerRouter.route('/').get((req, res) => {
  res.json('Hù');
});

module.exports = jobseekerRouter;
