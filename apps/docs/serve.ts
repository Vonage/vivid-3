// @ts-nocheck
import { serveDir } from 'https://deno.land/std@0.217.0/http/file_server.ts';

Deno.serve(async (req: Request) => {
	const url = new URL(req.url);
	const oldBaseUrl = 'vivid.deno.dev';
	const newBaseUrl = 'https://vivid.vonage.com';

	if (url.pathname === '/_ping') {
		return new Response('Custom Deno server is active and running!', {
			status: 200,
		});
	}

	if (url.hostname === oldBaseUrl) {
		const targetUrl = `${newBaseUrl}${url.pathname}${url.search}`;
		return Response.redirect(targetUrl, 301);
	}

	return await serveDir(req, {
		fsRoot: '.',
		showIndex: true,
	});
});
