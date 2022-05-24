// Import prior to `module.exports` within `.eleventy.js`
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAnchorOptions = require("./markdown-it-anchor-options");
const highlight = require("./highlight");

/* Markdown Overrides */
module.exports = markdownIt({
  html: true,
  highlight
}).use(markdownItAnchor, markdownItAnchorOptions);
