const admin = require('firebase-admin');
const { format } = require('util');

const firebaseConfiguration = require('./../configuration/firebaseConfiguration');
const AppError = require('./../utils/appError');

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfiguration),
  storageBucket: `${firebaseConfiguration.project_id}.appspot.com`,
});
// Cloud storage
const bucket = admin.storage().bucket();

exports.upload = async (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        destination: 'cv',
      },
    });
    blobWriter
      .on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(file.originalname)}?alt=media`;
        resolve(publicUrl);
      })
      .on('error', (err) => {
        reject(new AppError(`${err.message}`, 500));
      })
      .end(file.buffer);
  });
};
