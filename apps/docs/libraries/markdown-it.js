// Import prior to `module.exports` within `.eleventy.js`
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAnchorOptions = require("./markdown-it-anchor-options");
const highlight = require("./markdown-it-highlight");
const fenceRenderer = require("./markdown-it-fence");

/* Markdown Overrides */
const markdown = markdownIt({
	html: true,
	highlight
});

markdown.renderer.rules.fence = fenceRenderer(markdown.renderer.rules.fence);

markdown.use(markdownItAnchor, markdownItAnchorOptions);

module.exports = markdown;
