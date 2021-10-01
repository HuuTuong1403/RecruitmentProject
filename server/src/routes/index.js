const jobseekerRouter = require('./job-seekerRoutes');
const jobRouter = require('./jobRoutes');

function route(app) {
  app.use('/api/v1/job-seeker', jobseekerRouter);
  app.use('/api/v1/jobs', jobRouter);
}
module.exports = route;
