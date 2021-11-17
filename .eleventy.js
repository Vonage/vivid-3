const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({
    "dist/core/theme/*.css": "assets/styles/themes",
    "dist/components": "assets/modules/components"
  });

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
