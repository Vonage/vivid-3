/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { serveDir } from 'https://deno.land/std@0.217.0/http/file_server.ts';

Deno.serve(async (req: Request) => {
	const url = new URL(req.url);
	const oldBaseUrl = 'vivid.deno.dev';
	const newUrl = 'https://vivid.vonage.com';

	if (url.hostname === oldBaseUrl) {
		return Response.redirect(newUrl, 301);
	}

	return await serveDir(req, {
		fsRoot: '.',
		showIndex: true,
	});
});
