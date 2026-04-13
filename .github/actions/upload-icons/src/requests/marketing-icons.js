import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const CACHE_FOREVER = 'public, max-age=604800';

/**
 * Builds the list of S3 requests for the marketing icons upload.
 */
export function getMarketingRequests(config) {
	const { sourceDir } = config;
	const requests = [];

	const indexPath = resolve(sourceDir, 'index.json');
	const entries = JSON.parse(readFileSync(indexPath, 'utf-8'));

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

	return requests;
}
