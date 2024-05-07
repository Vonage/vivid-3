const { EleventyRenderPlugin } = require('@11ty/eleventy');
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const markdownLibrary = require('./libraries/markdown-it');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const glob = require('glob');
const { nxViteTsPaths } = require('@nx/vite/plugins/nx-tsconfig-paths.plugin');

const INPUT_DIR = 'apps/docs';
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
		},
	});

	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.addPassthroughCopy({
		'assets/images': 'public/assets/images',
	});

	eleventyConfig.addWatchTarget('libs/components/src/lib/*/README.md');
	eleventyConfig.addWatchTarget('docs/');
	eleventyConfig.addWatchTarget('assets/');

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter('cssmin', function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter('publicPageFilter', function (pages) {
		const isServing = process.argv.includes('--serve');
		return isServing
			? pages
			: pages.filter(
					(page) => page?.status !== 'underlying' && page?.status !== 'alpha'
			  );
	});

	eleventyConfig.addFilter('githubEditLink', function (filePath) {
		// Transform local path, e.g. "./libs/components/src/lib/alert/README.md"
		const relativeFilePath = filePath.replace(/^\.\//, '');
		return `https://github.com/Vonage/vivid-3/edit/main/${relativeFilePath}`;
	});

	eleventyConfig.addFilter('pageSlug', function (page) {
		return page.slug || slugify(page.title, { lower: true });
	});

	eleventyConfig.addShortcode('clientSideNavigationHint', function () {
		return markdownLibrary.render(
			fs.readFileSync(
				`${INPUT_DIR}/_shortcodes/client-side-navigation-hint.md`,
				'utf-8'
			)
		);
	});
	eleventyConfig.ignores.add(`${INPUT_DIR}/_shortcodes/`);

	return {
		dir: {
			input: INPUT_DIR,
			includes: '_includes',
			layouts: '_layouts',
			output: OUTPUT_DIR,
		},
	};
};
