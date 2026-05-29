import { resolve, sep } from 'node:path';
import { readFileSync } from 'node:fs';
import { getAssets } from '../get-assets.js';
import { getManifest } from '../get-manifest.js';
import { getCategories } from '../get-categories.js';
import { getMap } from '../get-map.js';

const CACHE_FOREVER = 'public, max-age=604800';

/**
 * Builds the list of S3 requests for the icons upload.
 */
export function getIconsRequests(config) {
	const { sourceDir } = config;
	const requests = [];

	const jsonString = readFileSync(resolve(sourceDir, 'index.json'), 'utf-8');
	const dirName = sourceDir.split(sep).at(-3);
	const indexName = [dirName.replace('icons', '').replace('-', ''), 'index']
		.filter(Boolean)
		.reverse()
		.join('-');

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/v${config.version}/${indexName}.json`,
		Body: jsonString,
		ContentType: 'application/json',
		CacheControl: CACHE_FOREVER,
	});

	const entries = JSON.parse(jsonString);

	const assets = getAssets(entries, sourceDir);

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/latest`,
		Body: 'Redirect',
		WebsiteRedirectLocation: `/v${config.version}/manifest.json`,
		CacheControl: 'public, max-age=600',
	});

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/v${config.version}/manifest.json`,
		Body: JSON.stringify(getManifest(entries), null, 2),
		ContentType: 'application/json',
		CacheControl: CACHE_FOREVER,
	});

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/v${config.version}/categories.json`,
		Body: JSON.stringify(getCategories(entries), null, 2),
		ContentType: 'application/json',
		CacheControl: CACHE_FOREVER,
	});

	requests.push({
		Bucket: config.bucket,
		Key: `${config.baseFolder}/v${config.version}/map.json`,
		Body: JSON.stringify(getMap(entries), null, 2),
		ContentType: 'application/json',
		CacheControl: CACHE_FOREVER,
	});

	for (const asset of assets) {
		requests.push({
			Bucket: config.bucket,
			Key: `${config.baseFolder}/${asset.hash}.svg`,
			Body: asset.svg,
			ContentType: 'image/svg+xml',
			CacheControl: CACHE_FOREVER,
		});

		requests.push({
			Bucket: config.bucket,
			Key: `${config.baseFolder}/v${config.version}/${asset.id}.svg`,
			Body: 'Redirect',
			WebsiteRedirectLocation: `/${asset.hash}.svg`,
			CacheControl: CACHE_FOREVER,
		});

		if (!asset.aliases || asset.aliases.length === 0) continue;

		for (const alias of asset.aliases) {
			requests.push({
				Bucket: config.bucket,
				Key: `${config.baseFolder}/v${config.version}/${alias}.svg`,
				Body: 'Redirect',
				WebsiteRedirectLocation: `/${asset.hash}.svg`,
			});
		}
	}

	return requests;
}
