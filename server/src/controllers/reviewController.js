const Review = require('./../models/reviewModel');
const factory = require('./handleFactory');

class reviewController {
  setBodyReviewCreation = (req, res, next) => {
    req.body.user = req.user.id;
    req.body.company = req.params.idCompany;
    next();
  };
  setQueryReviewView = (req, res, next) => {
    if (req.user && req.user.role == 'employer')
      req.query.company = req.params.idCompany;
    if (req.params.idCompany) {
      req.query.company = req.params.idCompany;
    }
    next();
  };
  createReview = factory.createOne(Review);
  getAllReview = factory.getAll(Review);
  getReview = factory.getOne(Review);
  updateReview = factory.updateOne(Review);
  deleteReview = factory.deleteOne(Review);
}
module.exports = new reviewController();
