var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import { env } from "process";
const NEW_VERSION = "5.5.5";
const BUCKET_ACCESS_KEY_ID = env.BUCKET_ACCESS_KEY_ID || "XXX";
const BUCKET_SECRET_ACCESS_KEY = env.BUCKET_SECRET_ACCESS_KEY || "XXX";
const BUCKET_REGION = "us-east-1";
const BUCKET_NAME = "vivid-icons-prod";
const BUCKET_BASE_FOLDER = "3f7739a0-a898-4f69-a82b-ad9d743170b6";
const FOLDER_PATH = "./src";
const s3 = new S3Client({
    credentials: {
        accessKeyId: BUCKET_ACCESS_KEY_ID,
        secretAccessKey: BUCKET_SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
});
// async function uploadIconsToS3() {
//   await uploadFolder(FOLDER_PATH);
//   //await uploadFile(FOLDER_PATH + '/_manifest.json', 'manifest.json');
//   console.log('Upload completed!');
// }
function uploadIconsToS3() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = fs.readdirSync(FOLDER_PATH);
            for (const file of files) {
                const filePath = path.join(FOLDER_PATH, file);
                const fileKey = file;
                yield uploadFile(filePath, fileKey);
            }
        }
        catch (err) {
            console.error(`Error uploading folder: ${err}`);
        }
    });
}
function uploadFile(filePath, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: `${BUCKET_NAME}`,
            Key: [BUCKET_BASE_FOLDER, `v${NEW_VERSION}`, key].join('/'),
            Body: fileContent
        };
        console.log(params);
        try {
            yield s3.send(new PutObjectCommand(params));
            console.log(`File uploaded successfully to ${BUCKET_NAME}/v${NEW_VERSION}`);
        }
        catch (err) {
            console.error(`Error uploading file: ${err}`);
        }
    });
}
uploadIconsToS3();
