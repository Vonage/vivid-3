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
const { nxViteTsPaths } = require('@nx/vite/plugins/nx-tsconfig-paths.plugin');
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

const DOCS_DIR = 'apps/docs';
const INPUT_DIR = `${DOCS_DIR}/content`;
const OUTPUT_DIR = 'dist/apps/docs';

module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	/**
	 * Hack to inject the generated code example frames into the Eleventy results, so that they will be processed by Vite.
	 */
	eleventyConfig.on('eleventy.after', async ({ results }) => {
		const matchedFiles = glob.sync(`dist/apps/docs/frames/*.html`);
		for (const matchedFile of matchedFiles) {
			results.push({
				inputPath: '',
				outputPath: matchedFile,
				url: '',
				content: '',
			});
		}
	});

	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			plugins: [nxViteTsPaths()],
			resolve: {
				alias: {
					'/docs': path.resolve('.', 'apps/docs'),
					/**
					 * While importing @vonage/vivid works fine, it will load too many files in dev mode.
					 * Therefore, we bundle it into a single file and reference it here.
					 */
					'vivid-bundle': path.resolve(
						'.',
						'dist/libs/components-bundle/index.js'
					),
					'vivid-styles': path.resolve('.', 'dist/libs/styles'),
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
						// api: 'modern-compiler', not yet supported, instead silence warnings:
						silenceDeprecations: ['legacy-js-api'],
					},
				},
			},
		},
	});

	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPassthroughCopy({
		'assets/images': 'public/assets/images',
		'assets/fonts': 'public/assets/fonts',
	});

	eleventyConfig.addWatchTarget('libs/components/src/lib/*/README.md');
	eleventyConfig.addWatchTarget('libs/components/src/lib/*/VARIATIONS.md');
	eleventyConfig.addWatchTarget('libs/components/src/lib/*/GUIDELINES.md');
	eleventyConfig.addWatchTarget('libs/components/src/lib/*/ACCESSIBILITY.md');
	eleventyConfig.addWatchTarget('libs/components/src/lib/*/USE-CASES.md');
	eleventyConfig.addWatchTarget('libs/eslint-plugin/src/rules/*.md');
	eleventyConfig.addWatchTarget('docs/');
	eleventyConfig.addWatchTarget('assets/');

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

	eleventyConfig.on('eleventy.after', async ({ dir, runMode }) => {
		if (runMode === 'serve') {
			spawnSync('npx', ['pagefind', '--site', dir.output], {
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
