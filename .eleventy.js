const { EleventyRenderPlugin } = require("@11ty/eleventy");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPassthroughCopy({ "dist/core/theme/*.css": "assets/styles/themes" });
  eleventyConfig.addPassthroughCopy({ "dist/components": "assets/modules/components" });

  // const style = {"styles": 'dist/core/theme/*.css'};
  // eleventyConfig.addPassthroughCopy(style);
  // eleventyConfig.addWatchTarget(style);
  // Return your Object options:
  return {
    dir: {
      input: "./11ty",
      output: "./dist/_site",
      includes: "_includes",
      layouts: "_layouts",
      // markdownTemplateEngine: ['njk', 'md']
    }
  }
};
