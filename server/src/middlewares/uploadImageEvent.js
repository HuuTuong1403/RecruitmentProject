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

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
exports.uploadEventImageToCloudinary = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  const fileName = `${req.body.eventName}-event-cover-${Date.now}`;
  //Image Cover
  const options = {
    folder: `event-image`,
    use_filename: true,
    overwrite: true,
    filename_override: `${fileName}`,
    // transformation: [{ width: 500, height: 500, crop: 'fit' }],
  };
  const imageCover = await cloudinary.uploadFile(
    req.files.imageCover[0].path,
    options
  );
  req.body.imageCover = imageCover.secure_url;
  //Images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const imageFilename = `${req.body.eventName}-event-cover-${Date.now}-${
        i + 1
      }`;
      const options = {
        folder: `event-image`,
        use_filename: true,
        overwrite: true,
        filename_override: `${imageFilename}`,
        // transformation: [{ width: 500, height: 500, crop: 'fit' }],
      };
      const image = await cloudinary.uploadFile(file.path, options);
      req.body.images.push(image.secure_url);
    })
  );
  next();
});
