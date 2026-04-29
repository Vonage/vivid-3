import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sync as rimraf } from 'rimraf';
import { build, mergeConfig } from 'vite';
import mainConfig from './vite.plugin';
import uiConfig from './vite.ui';

const __dirname = fileURLToPath(new URL('..', import.meta.url));

const watchMode = process.argv.slice(2)[0] === 'watch';

function setValueByPath(
	obj: Record<string, any>,
	path: string,
	value: any
): void {
	const keys = path.split('.');
	let current = obj;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];

		if (!(key in current) || typeof current[key] !== 'object') {
			current[key] = {};
		}

		current = current[key];
	}

	current[keys[keys.length - 1]] = value;
}

(async () => {
	const distDir = resolve(__dirname, 'dist');
	rimraf(distDir);

	const mainConfigOverrides = {
		build: {
			outDir: distDir,
			formats: ['es'],
		},
	};

	const uiConfigOverrides = {
		build: {
			outDir: distDir,
			formats: ['es'],
		},
	};

	if (watchMode) {
		setValueByPath(mainConfigOverrides, 'build.watch', {
			include: 'src/main/**/*',
			buildDelay: 200,
			clearScreen: true,
		});
		setValueByPath(uiConfigOverrides, 'build.watch', {
			include: 'src/ui/**/*',
			buildDelay: 200,
			clearScreen: true,
		});
	}

	const finalMainConfig = mergeConfig(mainConfig, mainConfigOverrides);
	const finalUiConfig = mergeConfig(uiConfig, uiConfigOverrides);

	const pluginBuild = build(finalMainConfig);
	const uiBuild = build(finalUiConfig);

	await Promise.all([pluginBuild, uiBuild]);
})();
