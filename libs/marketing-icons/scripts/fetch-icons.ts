import {
	createIconEntry,
	createBrandIconEntry,
	createFlagIconEntry,
	isBrand,
	isFlag,
	fetchIcons,
	writeFile,
} from '@repo/tools';
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

const iconsListPath = resolve(process.cwd(), 'icons.json');
const requestedIcons = JSON.parse(
	readFileSync(iconsListPath, 'utf-8')
) as string[];

if (requestedIcons.length === 0) {
	console.warn('icons.json is empty — nothing to fetch.');
	process.exit(0);
}

(async () => {
	const entries = await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		format: 'png',
		forceUpdate: true,
		filter: (node, path) => {
			if (!Array.isArray(path)) return false;
			const isIconComponent =
				node.type === 'COMPONENT' &&
				path.at(-4)?.name.toLocaleLowerCase().trim() === 'icons';
			const iconName = path.at(-2)?.name ?? '';
			const style = node.name.replace('style=', '');
			const isRequested = requestedIcons.includes(`${iconName}-${style}`);
			return isIconComponent && isRequested;
		},
		createEntry: (node, path, file) => {
			if (isBrand(path)) {
				return createBrandIconEntry(node, path, file);
			} else if (isFlag(path)) {
				return createFlagIconEntry(node, path, file);
			} else {
				return createIconEntry(node, path, file);
			}
		},
		outputs: [
			{
				fileName: (entry) => `${entry.id}.png`,
				template: (_entry, content) => content,
			},
		],
	});

	const missing = requestedIcons.filter(
		(id) => !entries.some((e) => e.id === id)
	);
	if (missing.length > 0) {
		console.error(
			`The following icon IDs from icons.json were not found in Figma:\n  ${missing.join('\n  ')}`
		);
		process.exit(1);
	}

	const slimmedIndex = entries.map(
		({ id, name, aliases, category, style, keywords }) => ({
			id,
			name,
			aliases,
			category,
			style,
			keywords,
		})
	);

	writeFile(
		'./src/generated/index.json',
		JSON.stringify(slimmedIndex, null, 2)
	);

	console.log(
		`Done. Fetched ${entries.length} marketing icon(s) and wrote index.json.`
	);
})();
