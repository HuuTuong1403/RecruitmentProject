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
exports.uploadLogoCompany = upload.single('photo-logo');
exports.processPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
});
exports.uploadLogoToCloudinary = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const options = {
    folder: `Logo_employer`,
    use_filename: true,
    overwrite: true,
    filename_override: `${req.body.companyName}`,
    transformation: [{ width: 500, height: 500, crop: 'fit' }],
  };
  const result = await cloudinary.uploadFile(req.file.path, options);
  req.body.logo = result.secure_url;
  req.body.publicIDLogo = result.public_id;
  next();
});
