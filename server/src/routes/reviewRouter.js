const express = require('express');

const reviewRouter = express.Router({ mergeParams: true });

const reviewController = require('./../controllers/reviewController');

const authController = require('./../controllers/authController');
const validator = require('./../middlewares/validator');
reviewRouter
  .route('/')
  .get(reviewController.setQueryReviewView, reviewController.getAllReview);
reviewRouter
  .route('/:idCompany')
  .get(reviewController.setQueryReviewView, reviewController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo('jobseeker'),
    reviewController.setBodyReviewCreation,
    reviewController.createReview
  );
reviewRouter.use(
  authController.protect,
  authController.restrictTo('jobseeker')
);
reviewRouter
  .route('/:id')
  .patch(validator.checkReviewExists, reviewController.updateReview)
  .delete(validator.checkReviewExists, reviewController.deleteReview);
module.exports = reviewRouter;
