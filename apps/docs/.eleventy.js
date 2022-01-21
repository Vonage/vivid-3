const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeblockdemo = require('eleventy-plugin-code-block-demo')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const INPUT_DIR = 'apps/docs';
const ASSETS_DIR = `${INPUT_DIR}/assets`;
const OUTPUT_DIR = 'dist/apps/docs';

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(codeblockdemo);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({
    "dist/libs/themes/theme/*.css": "assets/styles/themes",
    "dist/libs/components": "assets/modules/components",
    "vivid-logo.svg": "assets/images/vivid-logo.svg",
    "libs/../vivid-logo.svg": "vivid-logo.svg",
    [ASSETS_DIR]: "assets"
  });

  eleventyConfig.addWatchTarget("dist/libs/components");
  eleventyConfig.addWatchTarget("assets");
  eleventyConfig.addWatchTarget(`${INPUT_DIR}/assets`);
  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: OUTPUT_DIR
    }
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
