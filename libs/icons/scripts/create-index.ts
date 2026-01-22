import { type IconEntry, writeFile } from '@repo/tools';
import { kebabCase } from 'change-case';

// index.ts file
export function createIndex(icons: IconEntry[], path: string) {
	const exports = icons
		.map((entry) => {
			return `export * from './${`components/${kebabCase(
				`${entry.name}`
			)}.component`}';`;
		})
		.filter((value, index, array) => array.indexOf(value) === index)
		.join('\n');

	writeFile(path, exports);
}
