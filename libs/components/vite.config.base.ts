import * as path from 'path';
import * as fs from 'fs';
import { defineConfig, type UserConfig } from 'vite';
import { NodePackageImporter } from 'sass';

export const packageVersion = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
).version;

const isWatchMode = process.env.WATCH_MODE === 'true';

const baseConfig: UserConfig = defineConfig({
	build: {
		outDir: 'dist',
		cssMinify: true,
		target: 'esnext',
		watch: isWatchMode
			? {
					exclude: ['**/*.md'],
			  }
			: null,
	},
	define: {
		__PACKAGE_VERSION__: JSON.stringify(packageVersion),
	},
	css: {
		preprocessorOptions: {
			// Vite's SassPreprocessorOptions type doesn't currently include the newer
			// Sass JS API selector, but Sass supports it at runtime.
			scss: {
				api: 'modern-compiler',
				importers: [new NodePackageImporter()],
			} as NonNullable<
				NonNullable<UserConfig['css']>['preprocessorOptions']
			>['scss'],
		},
	},
});

export default baseConfig;
