import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import { env } from "process";

const NEW_VERSION: string = "5.5.5";
const BUCKET_ACCESS_KEY_ID: string = env.BUCKET_ACCESS_KEY_ID || "XXX";
const BUCKET_SECRET_ACCESS_KEY: string = env.BUCKET_SECRET_ACCESS_KEY || "XXX";
const BUCKET_REGION: string = "us-east-1";
const BUCKET_NAME: string = "vivid-icons-prod";
const BUCKET_BASE_FOLDER: string = "3f7739a0-a898-4f69-a82b-ad9d743170b6";
const FOLDER_PATH: string = "./src";

const s3 = new S3Client({
  credentials: {
    accessKeyId: BUCKET_ACCESS_KEY_ID,
    secretAccessKey: BUCKET_SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION
});

async function uploadIconsToS3() {
  try {
    const files = fs.readdirSync(FOLDER_PATH);
    for (const file of files) {
      const filePath = path.join(FOLDER_PATH, file);
      const fileKey = file;
      await uploadFile(filePath, fileKey);
    }
  } catch (err) {
    console.error(`Error uploading folder: ${err}`);
  }

  console.log('Upload process finished!!!');
}

async function uploadFile(filePath: string, key: string) {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: `${BUCKET_NAME}`,
    Key: [BUCKET_BASE_FOLDER, `v${NEW_VERSION}`, key].join('/'),
    Body: fileContent
  };

  try {
    await s3.send(new PutObjectCommand(params));
    console.log(`File uploaded successfully to ${BUCKET_NAME}/v${NEW_VERSION}/${key}`);
  } catch (err) {
    console.error(`Error uploading file: ${err}`);
  }
}

uploadIconsToS3();