import { createIconEntry, fetchIcons, writeFile } from '@repo/tools';
import 'dotenv/config';
import { svg } from './svg.output';
import { createBrandIconEntry } from './create-brand-icon-entry';
import { createFlagIconEntry } from './create-flag-icon-entry';
import { isBrand } from './is-brand';
import { isFlag } from './is-flag';
import { allIcons } from './filter-icons';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

(async () => {
	const index = await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		forceUpdate: false,
		filter: allIcons,
		createEntry: (node, path, file) => {
			if (isBrand(path)) {
				return createBrandIconEntry(node, path, file);
			} else if (isFlag(path)) {
				return createFlagIconEntry(node, path, file);
			} else {
				return createIconEntry(node, path, file);
			}
		},
		outputs: [svg],
	});

	const slimmedIndex = index.map(
		({ id, name, aliases, category, style, keywords }) => ({
			id,
			name,
			aliases,
			category,
			style,
			keywords,
		})
	);
	const slimmedIndexContents = JSON.stringify(slimmedIndex, null, 2);

	const categories = [...new Set(index.map((entry) => entry.category))];
	const categoriesTypesContents = `export type IconCategory = ${categories
		.map((category) => `'${category}'`)
		.join(' | \n')};`;

	const names = [
		...new Set(
			index.flatMap((entry) => {
				// Name of the icon used in icon component is effectively the icon id
				return [entry.id, ...entry.aliases];
			})
		),
	];
	const namesTypesContents = `export type IconName = ${names
		.map((iconName) => `'${iconName}'`)
		.join(' | \n')};`;

	const styles = [...new Set(index.map((entry) => entry.style))];
	const stylesTypesContents = `export type IconStyle = ${styles
		.map((iconStyle) => `'${iconStyle}'`)
		.join(' | \n')};`;

	writeFile('./src/generated/index.json', slimmedIndexContents);
	writeFile('./src/generated/icon-categories.ts', categoriesTypesContents);
	writeFile('./src/generated/icon-names.ts', namesTypesContents);
	writeFile('./src/generated/icon-styles.ts', stylesTypesContents);
})();
