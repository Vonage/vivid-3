const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const { env } = require('process');

const NEW_VERSION = "5.5.5";
const BUCKET_REGION = "us-east-1";
const BUCKET_NAME = "vivid-icons-prod";
const BUCKET_BASE_FOLDER = "3f7739a0-a898-4f69-a82b-ad9d743170b6";

function uploadFolderToS3() {
  const s3 = new AWS.S3({
    // configure your AWS credentials and S3 bucket details here
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
    region: BUCKET_REGION
  });

  const directoryPath = path.resolve(__dirname, './icons');

  // Read files from the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Iterate through each file in the directory
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Create params for uploading to S3
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_BASE_FOLDER + '/v' + NEW_VERSION + '/' + file, // Use file name as key (adjust as needed)
        Body: fs.readFileSync(filePath), // Read file contents
        ContentType: getContentType(file) // Set content type for SVG files
      };

      // Upload file to S3
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(`Error uploading ${file} to S3:`, err);
        } else {
          console.log(`Upload successful: ${file} - ${data.Location}`);
        }
      });
    });
  });
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.svg':
      return 'image/svg+xml';
    case '.json':
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}

module.exports = {  
  uploadFolderToS3
};