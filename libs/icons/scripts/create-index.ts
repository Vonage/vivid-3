import { type IconEntry, writeFile } from '@repo/tools';
import { kebabCase } from 'change-case';

// index.ts file
export function createIndex(icons: IconEntry[], path: string) {
	const exports = icons
		.map((entry) => {
			return `export * from './${`components/${kebabCase(
				`${entry.name}-${entry.style}`
			)}.component`}';`;
		})
		.join('\n');

	writeFile(path, exports);
}
