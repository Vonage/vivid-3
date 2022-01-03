const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeblockdemo = require('eleventy-plugin-code-block-demo')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const OUTPUT_DIR = 'dist/vvd-docs';

module.exports = function (eleventyConfig) {

  console.log(eleventyConfig);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(codeblockdemo);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({
    "dist/core/theme/*.css": "assets/styles/themes",
    "dist/components": "assets/modules/components",
    "11ty/assets": "assets"
  });

  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: OUTPUT_DIR
    }
  })

  return {
    dir: {
      input: "./11ty",
      includes: "_includes",
      layouts: "_layouts",
      output: OUTPUT_DIR,
    }
  }
};
