const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeblockdemo = require('eleventy-plugin-code-block-demo')


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addPassthroughCopy({
    "dist/core/theme/*.css": "assets/styles/themes",
    "dist/components": "assets/modules/components"
  });

  eleventyConfig.addPlugin(codeblockdemo);

  return {
    dir: {
      input: "./11ty",
      includes: "_includes",
      layouts: "_layouts",
    }
  }
};
