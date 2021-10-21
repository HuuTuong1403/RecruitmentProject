const multer = require('multer');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const cloudinary = require('./../services/cloudinary');

const multerStorage = multer.diskStorage({});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadAvatar = upload.single('photo-avatar');
exports.uploadAvatarToCloudinary = catchAsync(async (req, res, next) => {
  const fileName = req.body.fullname ? req.body.fullname : req.body.username;
  if (!req.file) return next();
  const options = {
    folder: `Avatar-user`,
    use_filename: true,
    overwrite: true,
    filename_override: `${fileName}`,
    transformation: [{ width: 500, height: 500, crop: 'fit' }],
  };
  const result = await cloudinary.uploadFile(req.file.path, options);
  req.body.avatar = result.secure_url;
  req.body.publicAvatar = result.public_id;
  next();
});
