const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require('path');
const googleStorageConfiguration = require('./../configuration/googleStorageConfiguration');

const storage = new Storage({
  keyFilename: `${googleStorageConfiguration}`,
});
const bucket = storage.bucket('cv_jobseeker');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.upload = async (file) => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname);
    console.log(blob);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', (err) => {
        reject(new AppError(`${err.message}`, 500));
      })
      .end(buffer);
  });
};
