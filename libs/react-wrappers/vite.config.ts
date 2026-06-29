import { defineConfig, mergeConfig } from 'vite';
import baseViteConfig from '@repo/vite-config/base';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function findGeneratedEntries(): Record<string, string> {
	const entries: Record<string, string> = {};

	const addEntries = (dir: string, prefix: string) => {
		if (!existsSync(dir)) return;
		for (const name of readdirSync(dir)) {
			if (!name.startsWith('Vwc')) continue;
			const indexPath = join(dir, name, 'index.js');
			if (existsSync(indexPath)) {
				entries[`${prefix}${name}/index`] = indexPath;
			}
		}
	};

	addEntries('dist', '');
	addEntries('dist/v3', 'v3/');

	return entries;
}

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		build: {
			emptyOutDir: false,
			lib: {
				entry: {
					index: 'src/index.js',
					...findGeneratedEntries(),
				},
				name: 'vivid-react',
				formats: ['cjs'],
				fileName: (_, entryAlias) => `${entryAlias}.js`,
			},
			minify: false,
			rolldownOptions: {
				external: [
					/^react(\/.*)?/,
					/^react-dom(\/.*)?/,
					/^@vonage\/.*/,
					'prop-types',
				],
				output: {
					exports: 'named',
				},
			},
		},
	})
);
