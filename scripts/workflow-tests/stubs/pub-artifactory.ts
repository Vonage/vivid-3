#!/usr/bin/env bun

/**
 * Basic artifactory pub registry stub.
 */

const PORT = parseInt(process.env.PORT!);
const P = '/artifactory/api/pub/pub';
const packages = new Map<string, string[]>();

function baseUrl(req: Request): string {
	return `https://${req.headers.get('host')}${P}`;
}

Bun.serve({
	port: PORT,
	routes: {
		[`${P}/api/packages/versions/new`]: {
			GET: (req) =>
				Response.json({
					url: `${baseUrl(req)}/api/packages/versions/newUpload`,
					fields: {},
				}),
		},
		[`${P}/api/packages/versions/newUpload`]: {
			POST: async (req) => {
				const formData = await req.formData();
				const file = formData.get('file') as File;
				const bytes = new Uint8Array(await file.arrayBuffer());
				const { name, version } = parsePubspec(bytes);
				await Bun.write(
					`/env/state/pub-artifactory/${name}-${version}.tar.gz`,
					bytes
				);
				const versions = packages.get(name) ?? [];
				versions.push(version);
				packages.set(name, versions);
				return new Response(null, {
					status: 302,
					headers: {
						Location: `${baseUrl(req)}/api/packages/versions/newUploadFinish`,
					},
				});
			},
		},
		[`${P}/api/packages/versions/newUploadFinish`]: {
			GET: () =>
				Response.json({
					success: { message: 'Successfully uploaded package.' },
				}),
		},
		[`${P}/api/packages/:name`]: {
			GET: (req) => {
				const { name } = req.params;
				const versions = packages.get(name);
				if (versions) {
					return Response.json({
						name,
						versions: versions.map((v) => ({ version: v })),
					});
				}
				return Response.redirect(`https://pub.dev/api/packages/${name}`, 302);
			},
		},
	},
	fetch: () => new Response('Not found', { status: 404 }),
});

function parsePubspec(gz: Uint8Array): { name: string; version: string } {
	const tar = Bun.gunzipSync(gz);
	let offset = 0;
	while (offset + 512 <= tar.length) {
		const header = tar.slice(offset, offset + 512);
		if (header.every((b) => b === 0)) break;
		const fileName = new TextDecoder()
			.decode(header.slice(0, 100))
			.replace(/\0.*/, '');
		const sizeStr = new TextDecoder()
			.decode(header.slice(124, 136))
			.replace(/\0.*/, '')
			.trim();
		const size = parseInt(sizeStr, 8);
		offset += 512;
		if (fileName === 'pubspec.yaml' || fileName.endsWith('/pubspec.yaml')) {
			const content = new TextDecoder().decode(
				tar.slice(offset, offset + size)
			);
			const name = content.match(/^name:\s*(.+)$/m)?.[1]?.trim();
			const version = content.match(/^version:\s*(.+)$/m)?.[1]?.trim();
			if (!name || !version) throw new Error('Could not parse pubspec.yaml');
			return { name, version };
		}
		offset += Math.ceil(size / 512) * 512;
	}
	throw new Error('pubspec.yaml not found in archive');
}

console.log(`pub-artifactory listening on :${PORT}`);
