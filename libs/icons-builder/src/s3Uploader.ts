import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import { env } from 'process';

const BUCKET_REGION = 'us-east-1';
const BUCKET_NAME = 'vivid-icons-prod';
const BUCKET_BASE_FOLDER = '3f7739a0-a898-4f69-a82b-ad9d743170b6';

const NEW_VERSION = '5.5.5';

export function uploadFolderToS3() {
	const s3 = new AWS.S3({
		accessKeyId: env.BUCKET_ACCESS_KEY_ID,
		secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
		region: BUCKET_REGION,
	});

	const directoryPath = path.resolve(__dirname, './icons');

	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			console.error('Error reading directory:', err);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);

			const params = {
				Bucket: BUCKET_NAME,
				Key: BUCKET_BASE_FOLDER + '/v' + NEW_VERSION + '/' + file,
				Body: fs.readFileSync(filePath),
				ContentType: getContentType(file),
			};

			s3.upload(params, (err: any, data: any) => {
				if (err) {
					console.error(`Error uploading ${file} to S3:`, err);
				} else {
					console.log(`Upload successful: ${file} - ${data.Location}`);
				}
			});
		});
	});
}

function getContentType(fileName: string) {
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