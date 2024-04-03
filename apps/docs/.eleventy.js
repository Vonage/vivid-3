const { EleventyRenderPlugin } = require('@11ty/eleventy');
const markdownLibrary = require('./libraries/markdown-it');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const INPUT_DIR = 'apps/docs';
const ASSETS_DIR = `${INPUT_DIR}/assets`;
const OUTPUT_DIR = 'dist/apps/docs';

module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	eleventyConfig.addPassthroughCopy({
		'dist/libs/styles': 'assets/styles',
		'dist/libs/components': 'assets/modules/components',
		'assets/images': 'assets/images',
		[`${ASSETS_DIR}/scripts`]: 'assets/scripts',
		[`${ASSETS_DIR}/styles`]: 'assets/styles',
	});

	eleventyConfig.addWatchTarget('dist/libs/styles');
	eleventyConfig.addWatchTarget('dist/libs/components');
	eleventyConfig.addWatchTarget(`${ASSETS_DIR}/scripts`);
	eleventyConfig.addWatchTarget(`${ASSETS_DIR}/styles`);
	eleventyConfig.addWatchTarget('docs');
	eleventyConfig.addWatchTarget('libs/components/src/lib/*/README.md');
	eleventyConfig.setBrowserSyncConfig({
		server: {
			baseDir: OUTPUT_DIR,
		},
		snippetOptions: {
			ignorePaths: '/components/**/frames/*.html',
		},
	});

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

	eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
		const swFilePath = path.resolve('dist/apps/docs/sw.js');
		const fileContents = fs.readFileSync(swFilePath).toString();
		const result = fileContents.replace(
			/e="\d+"/gm,
			`e="${new Date().getTime().toString()}"`
		);
		fs.writeFileSync(swFilePath, result);
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
