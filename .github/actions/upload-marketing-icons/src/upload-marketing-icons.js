import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const CACHE_FOREVER = 'public, max-age=604800';

/**
 * Uploads marketing icon PNGs to S3 with hash-based deduplication.
 *
 * S3 layout:
 *   {baseFolder}/marketing/{hash}.png               — actual PNG, cached forever
 *   {baseFolder}/marketing/v{version}/{id}.png      — redirect to /{baseFolder}/marketing/{hash}.png
 *   {baseFolder}/marketing/v{version}/index.json    — [{id, name, aliases, category, style, keywords}] metadata
 *
 * CDN URLs: https://icon.resources.vonage.com/marketing/v{version}/{id}.png
 * (CloudFront strips the baseFolder prefix, so {baseFolder}/marketing/... maps to /marketing/... at the CDN)
 */
export async function upload(config) {
	const s3 = new S3Client({
		region: config.region,
		credentials: {
			accessKeyId: config.accessKey,
			secretAccessKey: config.secretAccessKey,
		},
	});

	const sourceDir = config.sourceDir;
	const indexPath = resolve(sourceDir, 'index.json');
	const entries = JSON.parse(readFileSync(indexPath, 'utf-8'));

	const requests = [];

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/marketing/v${config.version}/index.json`,
		Body: readFileSync(indexPath, 'utf-8'),
		ContentType: 'application/json',
		CacheControl: CACHE_FOREVER,
	});

	for (const entry of entries) {
		const pngPath = resolve(sourceDir, `${entry.id}.png`);
		const pngBuffer = readFileSync(pngPath);
		const hash = createHash('md5').update(pngBuffer).digest('hex');

		requests.push({
			Bucket: config.bucket,
			Key: `${config.baseFolder}/marketing/${hash}.png`,
			Body: pngBuffer,
			ContentType: 'image/png',
			CacheControl: CACHE_FOREVER,
		});

		requests.push({
			Bucket: config.bucket,
			Key: `${config.baseFolder}/marketing/v${config.version}/${entry.id}.png`,
			Body: 'Redirect',
			WebsiteRedirectLocation: `/${config.baseFolder}/marketing/${hash}.png`,
			CacheControl: CACHE_FOREVER,
		});
	}

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

	console.log(`Done. Uploaded ${entries.length} marketing icon(s).`);
}
