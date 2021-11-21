// const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeblockdemo = require('eleventy-plugin-code-block-demo/dist')


module.exports = function (eleventyConfig) {

  // eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addPassthroughCopy({
    "dist/core/theme/*.css": "assets/styles/themes",
    "dist/components": "assets/modules/components"
  });

  eleventyConfig.addPlugin(codeblockdemo);



  // const style = {"styles": 'dist/core/theme/*.css'};
  // eleventyConfig.addPassthroughCopy(style);
  // eleventyConfig.addWatchTarget(style);
  // Return your Object options:
  return {
    dir: {
      input: "./11ty",
      // output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      // markdownTemplateEngine: ['njk', 'md']
    }
  }
};
