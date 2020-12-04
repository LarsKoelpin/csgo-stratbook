const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileStorage = multer.diskStorage({
  destination: function (req, file, next) {
    console.log(file);
    next(null, 'public/upload/');
  },
  filename: function (req, file, next) {
    console.log(file);
    next(null, crypto.randomBytes(20).toString('hex') + path.extname(file.originalname));
  },
});

const fileLimits = {
  fileSize: 1000000,
};

const fileFilter = (req, file, next) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.webp'];

  if (allowedFileTypes.includes(path.extname(file.originalname))) {
    next(null, true);
  } else {
    next(null, false);
  }
};

const multerInstance = multer({
  storage: fileStorage,
  limits: fileLimits,
  fileFilter: fileFilter,
});

const uploadSingle = (field) => (req, res, next) => {
  multerInstance.single(field)(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).send({ error: error.message });
    } else if (error) {
      return res.status(400).send({ error: error });
    }
    next();
  });
};

const uploadMultiple = (field) => (req, res, next) => {
  multerInstance.array(field)(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).send({ error: error.message });
    } else if (error) {
      return res.status(400).send({ error: error });
    }
    next();
  });
};

const processImage = async (file) => {
  try {
    await sharp(file.path).resize(256, 256).toFile(path.resolve(file.destination, 'temp', file.filename));
    fs.unlinkSync(file.path);
    fs.renameSync(path.resolve(file.destination, 'temp', file.filename), file.path);
    if (process.env.NODE_ENV !== 'development') await uploadFile(file.path, file.filename);
  } catch (error) {
    throw new Error(error);
  }
};

function uploadFile(filepath, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filepath);
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename, // filename on S3
        Body: fileContent,
      };

      const data = await s3.upload(params).promise();
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data.Location);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.uploadSingle = uploadSingle;
module.exports.uploadMultiple = uploadMultiple;
module.exports.processImage = processImage;
module.exports.uploadFile = uploadFile;
