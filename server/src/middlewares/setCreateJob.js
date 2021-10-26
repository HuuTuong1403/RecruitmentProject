module.exports = (req, res, next) => {
  req.body.companyName = req.user.companyName;
  req.body.company = req.user.id;
  next();
};
