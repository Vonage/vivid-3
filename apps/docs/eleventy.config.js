const vue = require('@vitejs/plugin-vue');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownLibrary = require('./libraries/markdown-it');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');
const packageInstallation = require('./shortcodes/packageInstallation');
const glob = require('glob');
const { spawnSync } = require('child_process');
const {
	resetExampleIndex,
} = require('./code-example-preview/createCodeExample');
const { githubEditLinkFromPath } = require('./filters/githubEditLink');
const { isNavItemActive } = require('./filters/isNavItemActive');
const { onlyPublicPages } = require('./filters/publicPages');
const { componentSlug } = require('./filters/componentSlug');
const {
	navigationFromComponents,
} = require('./filters/navigationFromComponents');
const components = require('./content/_data/components.json');
const { spawn } = require('node:child_process');
const { NodePackageImporter } = require('sass');

const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..');
const DOCS_DIR = '.';
const INPUT_DIR = `${DOCS_DIR}/content`;
const OUTPUT_DIR = './dist';

module.exports = async (eleventyConfig) => {
	eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	/**
	 * Hack to inject the generated code example frames into the Eleventy results, so that they will be processed by Vite.
	 */
	eleventyConfig.on('eleventy.after', async ({ results }) => {
		const matchedFiles = glob.sync(`${OUTPUT_DIR}/frames/*.html`);
		for (const matchedFile of matchedFiles) {
			results.push({
				inputPath: '',
				outputPath: matchedFile,
				url: '',
				content: '',
			});
		}
	});

	const EleventyVitePlugin = await import('@11ty/eleventy-plugin-vite');

	eleventyConfig.addPlugin(EleventyVitePlugin.default, {
		viteOptions: {
			plugins: [
				vue({
					template: {
						compilerOptions: {
							// 'preserve' will keep all whitespace
							// 'condense' (default) removes whitespace between tags
							whitespace: 'preserve',
						},
					},
				}),
			],
			build: {
				emptyOutDir: true,
			},
			resolve: {
				alias: {
					'/docs': path.resolve('.'),
					/**
					 * While importing @vonage/vivid works fine, it will load too many files in dev mode.
					 * Therefore, we bundle it into a single file and reference it here.
					 */
					'@vonage/vivid': path.resolve('.', 'tmp/components-bundle.js'),
					'vivid-locales': path.resolve('.', 'tmp/locales-bundle.js'),
				},
			},
			server: {
				watch: {
					ignored: '**/frames/**',
				},
			},
			css: {
				preprocessorOptions: {
					scss: {
						api: 'modern-compiler', // not yet supported, instead silence warnings:
						// silenceDeprecations: ['legacy-js-api'],
						importers: [new NodePackageImporter()],
					},
				},
			},
		},
	});

	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPassthroughCopy({
		[`${WORKSPACE_ROOT}/assets/images`]: 'public/assets/images',
		[`${WORKSPACE_ROOT}/assets/fonts`]: 'public/assets/fonts',
	});

	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/README.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/VARIATIONS.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/GUIDELINES.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/ACCESSIBILITY.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/USE-CASES.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/eslint-plugin/src/rules/*.md`
	);
	eleventyConfig.addWatchTarget(`${WORKSPACE_ROOT}docs/`);
	eleventyConfig.addWatchTarget(`${WORKSPACE_ROOT}assets/`);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter('cssmin', function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter('onlyPublicPages', onlyPublicPages);
	eleventyConfig.addFilter('githubEditLink', githubEditLinkFromPath);
	eleventyConfig.addFilter('componentSlug', componentSlug);
	eleventyConfig.addFilter('isNavItemActive', isNavItemActive);
	eleventyConfig.addFilter('onlyNavPages', (entries) =>
		entries.filter((entry) => Boolean(entry.data.title))
	);
	eleventyConfig.addFilter(
		'navigationFromComponents',
		navigationFromComponents
	);

	eleventyConfig.addGlobalData(
		'componentsNew',
		components.filter((c) => c.page !== 'legacy')
	);

	eleventyConfig.addGlobalData(
		'componentGuidelines',
		components.filter((c) => c.guidelines)
	);

	eleventyConfig.addGlobalData(
		'componentUseCases',
		components.filter((c) => c.useCases)
	);

	eleventyConfig.addGlobalData(
		'componentAccessibility',
		components.filter((c) => c.accessibility)
	);

	eleventyConfig.addGlobalData(
		'componentsLegacy',
		components.filter((c) => c.page === 'legacy')
	);

	eleventyConfig.addShortcode('clientSideNavigationHint', function () {
		return markdownLibrary.render(
			fs.readFileSync(
				`${DOCS_DIR}/shortcodes/client-side-navigation-hint.md`,
				'utf-8'
			)
		);
	});

	eleventyConfig.addShortcode('packageInstallation', packageInstallation);

	eleventyConfig.on('eleventy.before', resetExampleIndex);

	const runEsbuild = (inputFile, outputFile, watch) => {
		const args = [
			'esbuild',
			inputFile,
			'--bundle',
			`--outfile=${outputFile}`,
			'--format=esm',
		];
		if (watch) {
			args.push('--watch');
		}
		return (watch ? spawn : spawnSync)('pnpm', args, {
			windowsHide: true,
			stdio: [process.stdin, process.stdout, process.stderr],
		});
	};
	let isWatcherStarted = false;
	eleventyConfig.on('eleventy.before', async ({ runMode }) => {
		if (isWatcherStarted) {
			return;
		}
		const shouldWatch = runMode === 'serve';
		runEsbuild(
			'../../libs/components/dist/index.js',
			'tmp/components-bundle.js',
			shouldWatch
		);
		runEsbuild(
			'assets/scripts/locales-bundle.js',
			'tmp/locales-bundle.js',
			shouldWatch
		);
		isWatcherStarted = shouldWatch;
	});

	eleventyConfig.on('eleventy.after', async ({ dir, runMode }) => {
		if (runMode === 'serve') {
			spawnSync('pnpm', ['pagefind', '--site', dir.output], {
				windowsHide: true,
				stdio: [process.stdin, process.stdout, process.stderr],
			});
		}
	});

	return {
		dir: {
			input: INPUT_DIR,
			includes: '_includes',
			layouts: '_layouts',
			output: OUTPUT_DIR,
		},
	};
};
