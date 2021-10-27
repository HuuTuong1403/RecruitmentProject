module.exports = (req, res, next) => {
  req.body.company = req.user.id;
  next();
};
