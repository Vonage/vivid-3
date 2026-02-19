import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

export function getAssets(entries) {
	return entries.map((entry) => {
		const filePath = resolve(entry.dir, `${entry.id}.svg`);

		const svg = readFileSync(filePath, 'utf8');

		return {
			id: `${entry.name}-${entry.style}`,
			svg,
			hash: createHash('md5').update(svg).digest('hex'),
			aliases: entry.aliases || [],
		};
	});
}
