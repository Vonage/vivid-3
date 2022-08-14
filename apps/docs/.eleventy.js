const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeBlockDemo = require("./transformers/code-block-demo");
const markdownLibrary = require("./libraries/markdown-it");
const CleanCSS = require("clean-css");

const INPUT_DIR = 'apps/docs';
const ASSETS_DIR = `${INPUT_DIR}/assets`;
const OUTPUT_DIR = 'dist/apps/docs';

module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary("md", markdownLibrary);

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	eleventyConfig.addPassthroughCopy({
		"dist/libs/styles/": "assets/styles/",
		"dist/libs/components": "assets/modules/components",
		"libs/styles/src/lib/fonts/**/*.{woff,woff2}": "assets/styles/fonts",
		"assets/images/vivid-logo.svg": "assets/images/vivid-logo.svg",
		"assets/images/vivid-cover-wide.avif": "assets/images/vivid-cover-wide.avif",
		[ASSETS_DIR]: "assets"
	});

	eleventyConfig.addWatchTarget("dist/libs/components");
	eleventyConfig.addWatchTarget("dist/libs/styles");
	eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets`);
	eleventyConfig.setBrowserSyncConfig({
		server: {
			baseDir: OUTPUT_DIR
		}
	});

	eleventyConfig.addTransform('codeBlockDemo', codeBlockDemo);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	return {
		dir: {
			input: INPUT_DIR,
			includes: "_includes",
			layouts: "_layouts",
			output: OUTPUT_DIR,
		}
	}
};
