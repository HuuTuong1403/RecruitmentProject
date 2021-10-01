const jobseekerRouter = require('./job-seekerRoutes');
const jobRouter = require('./jobRoutes');
const locationRouter = require('./locationRouter');

function route(app) {
  app.use('/api/v1/job-seeker', jobseekerRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/location', locationRouter);
}
module.exports = route;
