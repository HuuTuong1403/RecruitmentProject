const express = require('express');
const authController = require('../controllers/authController');
const systemManagerRouter = express.Router();
const systemManagerController = require('../controllers/systemManagerController');
const validator = require('./../middlewares/validator');

systemManagerRouter
  .route('/manage/employer')
  .get(
    authController.protect,
    authController.restrictTo('systemmanager'),
    systemManagerController.getAllEmployer
  );
systemManagerRouter
  .route('/manage/employer/:id')
  .get(
    authController.protect,
    authController.restrictTo('systemmanager'),
    systemManagerController.getEmployer
  );
systemManagerRouter
  .route('/manage/employer/:id/issue')
  .patch(
    authController.protect,
    authController.restrictTo('systemmanager'),
    validator.isEmployerUsernameUnique,
    systemManagerController.issueEmployer
  );
systemManagerRouter.route('/login').post(authController.loginSystemManager);
module.exports = systemManagerRouter;
