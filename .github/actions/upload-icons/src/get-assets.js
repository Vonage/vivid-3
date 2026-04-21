import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

export function getAssets(entries, sourceDir) {
	return entries.map((entry) => {
		const filePath = resolve(sourceDir, `${entry.id}.svg`);

		const svg = readFileSync(filePath, 'utf8');

		return {
			id: entry.id,
			svg,
			hash: createHash('md5').update(svg).digest('hex'),
			aliases: entry.aliases || [],
		};
	});
}
