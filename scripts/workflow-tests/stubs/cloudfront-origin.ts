#!/usr/bin/env bun

/**
 * CloudFront origin stub.
 *
 * Serves objects from a local S3 bucket (moto) over HTTP, simulating the
 * behavior of CloudFront in front of an S3 origin.
 */

const PORT = parseInt(process.env.PORT!);
const MOTO_URL = process.env.MOTO_URL!;
const S3_BUCKET = process.env.S3_BUCKET!;
const S3_PATH_PREFIX = process.env.S3_PATH_PREFIX!;
const ACCESS_KEY = process.env.ACCESS_KEY!;
const SECRET_KEY = process.env.SECRET_KEY!;
const PRODUCTION_ORIGIN = process.env.PRODUCTION_ORIGIN!;

const CORS_HEADERS = { 'access-control-allow-origin': '*' };

function fetchS3(key: string): Promise<Response> {
	return fetch(`${MOTO_URL}/${S3_BUCKET}${key}`, {
		headers: {
			Authorization: `AWS ${ACCESS_KEY}:${SECRET_KEY}`,
			Connection: 'close',
		},
	});
}

Bun.serve({
	port: PORT,
	async fetch(req) {
		const url = new URL(req.url);
		const originalPath = url.pathname + url.search;

		let objectPath = url.pathname;
		if (objectPath.endsWith('/')) {
			objectPath += 'index.html';
		}
		const s3Key = `${S3_PATH_PREFIX}${objectPath}`;

		console.log(`[req] ${url.pathname} -> s3Key=${s3Key}`);

		const s3Resp = await fetchS3(s3Key);

		const redirectLocation = s3Resp.headers.get(
			'x-amz-website-redirect-location'
		);
		if (redirectLocation) {
			return new Response(null, {
				status: 301,
				headers: { Location: redirectLocation, ...CORS_HEADERS },
			});
		}

		if (s3Resp.status === 404 || s3Resp.status === 403) {
			console.log(`S3 miss, proxying to production: ${originalPath}`);
			return fetch(`${PRODUCTION_ORIGIN}${originalPath}`);
		}

		const headers = new Headers(s3Resp.headers);
		Object.entries(CORS_HEADERS).forEach(([k, v]) => headers.set(k, v));

		return new Response(s3Resp.body, {
			status: s3Resp.status,
			headers,
		});
	},
});

console.log(
	`cloudfront-origin listening on :${PORT} (bucket=${S3_BUCKET}, prefix=${S3_PATH_PREFIX})`
);
