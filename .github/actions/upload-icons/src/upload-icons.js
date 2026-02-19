import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getAssets } from './get-assets.js';
import { getManifest } from './get-manifest.js';
import { getCategories } from './get-categories.js';
import { getMap } from './get-map.js';

const CACHE_FOREVER = 'public, max-age=604800';

export async function upload(config) {
	const s3 = new S3Client({
		region: config.region,
		credentials: {
			accessKeyId: config.accessKey,
			secretAccessKey: config.secretAccessKey,
		},
	});
	const requests = [];

	const sourceDirs = Array.isArray(config.sourceDirs)
		? config.sourceDirs
		: [config.sourceDirs];

	const entries = sourceDirs.flatMap((dir) => {
		const jsonString = readFileSync(resolve(dir, 'index.json'), 'utf-8');
		return JSON.parse(jsonString).map((entry) => ({ ...entry, dir }));
	});

	const assets = getAssets(entries);

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
		// Hashed actual file
		requests.push({
			Bucket: config.bucket,
			Key: `${config.baseFolder}/${asset.hash}.svg`,
			Body: asset.svg,
			ContentType: 'image/svg+xml',
			CacheControl: CACHE_FOREVER,
		});

		// Versioned icon redirect
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
				WebsiteRedirectLocation: `/${config.baseFolder}/${asset.hash}.svg`,
			});
		}
	}

	if (config.dry) return;

	await Promise.all(
		requests.map((request) =>
			s3
				.send(new PutObjectCommand(request))
				.then(() => console.log('Uploaded', request.Key))
		)
	);
}
