module.exports = (req, res, next) => {
  req.body.company = req.user.id;
  req.body.createdAt = Date.now();
  req.body.servicePackage = req.query.idServicePackage;
  next();
};
