import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getIconsRequests } from './requests/icons.js';
import { getMarketingRequests } from './requests/marketing-icons.js';

export async function upload(config) {
	const s3 = new S3Client({
		region: config.region,
		credentials: {
			accessKeyId: config.accessKey,
			secretAccessKey: config.secretAccessKey,
		},
	});

	const requests =
		config.mode === 'marketing-icons'
			? getMarketingRequests(config)
			: getIconsRequests(config);

	if (config.dry) {
		console.log('Dry run — the following keys would be uploaded:');
		for (const r of requests) {
			console.log(' ', r.Key);
		}
		return;
	}

	await Promise.all(
		requests.map((request) =>
			s3
				.send(new PutObjectCommand(request))
				.then(() => console.log('Uploaded', request.Key))
		)
	);
}
