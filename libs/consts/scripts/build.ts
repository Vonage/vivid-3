import { readFileSync, writeFileSync } from 'node:fs';
import iconsPackageJson from '../../icons/package.json';

const iconsVersion = iconsPackageJson.version;
const iconsTsContents = readFileSync('./src/lib/icons.ts', 'utf-8');
const updatedContents = iconsTsContents.replace(
	/export const ICONS_VERSION\s+=\s+['"](.+)['"];/,
	`export const ICONS_VERSION = '${iconsVersion}';`
);

if (iconsTsContents !== updatedContents) {
	// eslint-disable-next-line no-console
	console.log(`Updated icons.ts with version ${iconsVersion}`);
}

writeFileSync('./src/lib/icons.ts', updatedContents);
