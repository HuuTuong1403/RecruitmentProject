const jobseekerRouter = require('./job-seekerRoutes');
const jobRouter = require('./jobRoutes');
const locationRouter = require('./locationRouter');
const skillRouter = require('./skillRouter');
const employerRouter = require('./employerRouter');
const systemManagerRouter = require('./systemManagerRouter');
const systemAdminRouter = require('./systemAdminRouter');
function route(app) {
  app.use('/api/v1/job-seeker', jobseekerRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/location', locationRouter);
  app.use('/api/v1/skills', skillRouter);
  app.use('/api/v1/employer', employerRouter);
  app.use('/api/v1/system-manager', systemManagerRouter);
  app.use('/api/v1/system-admin', systemAdminRouter);
}
module.exports = route;
