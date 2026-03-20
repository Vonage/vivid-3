#!/usr/bin/env bun

/**
 * CloudFront API stub.
 *
 * Captures invalidation reqeuests.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';

const PORT = parseInt(process.env.PORT!);
const STATE_PATH = '/env/state/cloudfront-stub.json';

if (!existsSync(STATE_PATH)) writeState({ invalidations: [] });

function readState(): any {
	return JSON.parse(readFileSync(STATE_PATH, 'utf-8'));
}

function writeState(state: any) {
	writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

function isoNow(): string {
	return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

Bun.serve({
	port: PORT,
	routes: {
		'/*': async (req) => {
			const url = new URL(req.url);
			const state = readState();
			const id = `I${Date.now()}`;
			const body = await req.arrayBuffer();

			state.invalidations.push({
				id,
				method: req.method,
				path: url.pathname,
				query: Object.fromEntries(url.searchParams),
				body: new TextDecoder().decode(body),
				createdAt: isoNow(),
			});
			writeState(state);

			return new Response(
				`<?xml version="1.0" encoding="UTF-8"?>
<CreateInvalidationResult xmlns="http://cloudfront.amazonaws.com/doc/2020-05-31/">
  <Invalidation>
    <Id>${id}</Id>
    <Status>Completed</Status>
    <CreateTime>${isoNow()}</CreateTime>
  </Invalidation>
</CreateInvalidationResult>`,
				{ status: 201, headers: { 'content-type': 'application/xml' } }
			);
		},
	},
});

console.log(`cloudfront listening on :${PORT}`);
