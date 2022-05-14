const jobseekerRouter = require('./job-seekerRoutes');
const jobRouter = require('./jobRoutes');
const locationRouter = require('./locationRouter');
const skillRouter = require('./skillRouter');
const employerRouter = require('./employerRouter');
const systemManagerRouter = require('./systemManagerRouter');
const systemAdminRouter = require('./systemAdminRouter');
const reviewRouter = require('./reviewRouter');
const eventRouter = require('./eventRouter');
const chatRouter = require('./chatRouter');
const servicePackageRouter = require('./servicePackageRouter');
const questionRouter = require('./questionRouter');
const entryTestRouter = require('./entryTestRouter');

function route(app) {
  app.use('/api/v1/job-seeker', jobseekerRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/location', locationRouter);
  app.use('/api/v1/skills', skillRouter);
  app.use('/api/v1/employer', employerRouter);
  app.use('/api/v1/system-manager', systemManagerRouter);
  app.use('/api/v1/system-admin', systemAdminRouter);
  app.use('/api/v1/reviews', reviewRouter);
  app.use('/api/v1/events', eventRouter);
  app.use('/api/v1/chat', chatRouter);
  app.use('/api/v1/service-package', servicePackageRouter);
  app.use('/api/v1/question', questionRouter);
  app.use('/api/v1/entry-test', entryTestRouter);
}
module.exports = route;
