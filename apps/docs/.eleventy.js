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
    "dist/libs/styles": "assets/styles",
    "dist/libs/components": "assets/modules/components",
    "assets/images/vivid-logo.svg": "assets/images/vivid-logo.svg",
    "assets/images/vivid-cover-wide.avif": "assets/images/vivid-cover-wide.avif",
    [`${ASSETS_DIR}/scripts`]: "assets/scripts",
    [`${ASSETS_DIR}/styles`]: "assets/styles"
  });

  eleventyConfig.addWatchTarget("dist/libs/styles");
  eleventyConfig.addWatchTarget("dist/libs/components");
  eleventyConfig.addWatchTarget(`${ASSETS_DIR}/scripts`);
  eleventyConfig.addWatchTarget(`${ASSETS_DIR}/styles`);
  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: OUTPUT_DIR
	},
    snippetOptions: {
      ignorePaths: '/components/**/frames/*.html'
    }
  });

  const isServing = process.argv.includes('--serve');

  eleventyConfig.addTransform('codeBlockDemo', (content, outputPath) => codeBlockDemo(content, outputPath, isServing));

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("publicComponentsFilter", function (components) {
    return isServing
		? components
		: components.filter(component => component?.status !== 'underlying');
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
