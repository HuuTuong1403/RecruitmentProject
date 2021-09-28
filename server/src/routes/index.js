const jobseekerRouter = require('./job-seekerRoutes');

function route(app) {
  app.use('/api/v1/job-seeker', jobseekerRouter);
}
module.exports = route;
