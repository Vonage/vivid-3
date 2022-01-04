const { EleventyRenderPlugin } = require("@11ty/eleventy");
const codeblockdemo = require('eleventy-plugin-code-block-demo')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(codeblockdemo);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({
    "dist/core/theme/*.css": "assets/styles/themes",
    "dist/vvd-components/components": "assets/modules/components",
    "assets/images": "assets/images",
    "11ty/assets": "assets"
  });

  eleventyConfig.addWatchTarget("dist");
  eleventyConfig.addWatchTarget("assets");
  eleventyConfig.addWatchTarget("11ty/assets");

  return {
    dir: {
      input: "./11ty",
      includes: "_includes",
      layouts: "_layouts",
    }
  }
};
