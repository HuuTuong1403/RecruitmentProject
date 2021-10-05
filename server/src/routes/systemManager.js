const express = require('express');
const systemManagerRouter = express.Router();
const systemManagerController = require('./../controllers/systemManagerController');

systemManagerRouter
  .route('/manage/employer')
  .get(systemManagerController.getAllEmployer);
systemManagerRouter
  .route('/manage/employer/:id')
  .get(systemManagerController.getEmployer);
systemManagerRouter
  .route('/manage/employer/:id/issue')
  .patch(systemManagerController.issueEmployer);
module.exports = systemManagerRouter;
