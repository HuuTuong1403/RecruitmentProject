const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const multerStorage = multer.memoryStorage();
const googleStorage = require('./../services/googleStorage');
const firebase = require('./../services/firebase');
const upload = multer({
  storage: multerStorage,
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});
exports.uploadCV = upload.single('CV');
exports.uploadCVtoGoogleStorage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const result = await googleStorage.upload(req.file);
  req.body.cvPath = result;
  res.send(result);
  //next();
});
exports.uploadCVtoFirebase = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const result = await firebase.upload(req.file);
  req.body.cvPath = result;
  next();
});
