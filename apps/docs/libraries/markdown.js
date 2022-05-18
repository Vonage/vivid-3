// Import prior to `module.exports` within `.eleventy.js`
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
// If not already added from previous tip
const slugify = require("slugify");
var hljs = require('highlight.js'); // https://highlightjs.org/
let isPreview;

const PREVIEW = "<!-- preview -->";

const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
  class: "anchor",
  symbol: "<vwc-icon type=\"link-solid\"></vwc-icon>",
  style: "aria-labelledby",
});

const markdownItAnchorOptions = {
  level: [1, 2, 3],
  slugify: (str) =>
    slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    }),
  tabIndex: false,
  permalink(slug, opts, state, idx) {
    state.tokens.splice(
      idx,
      0,
      Object.assign(new state.Token("div_open", "div", 1), {
        // Add class "header-wrapper [h1 or h2 or h3]"
        attrs: [["class", `heading-wrapper ${state.tokens[idx].tag}`]],
        block: true,
      })
    );

    state.tokens.splice(
      idx + 4,
      0,
      Object.assign(new state.Token("div_close", "div", -1), {
        block: true,
      })
    );

    linkAfterHeader(slug, opts, state, idx + 1);
  },
};

/* Markdown Overrides */
module.exports = markdownIt({
  html: true,
  highlight: function (str, lang) {
    isPreview = str.indexOf(PREVIEW) >= 0;
    if (isPreview) str = str.replace(PREVIEW,'').substring(1);
    if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +'</code></pre>';
        } catch (__) {}
      }
    return '<pre class="hljs"><code>' + module.exports.utils.escapeHtml(str) + '</code></pre>';
  }
})
  .use(require('./markdown-it-demo-renderer'), {
    wrap: (demo, code) => {
      // Wrap demo html string with `.example-demo`
      let render = isPreview ? '<div class="example-demo">' + demo + '</div>' : '';
      // Wrap code html string with `.example-code`
      render += '<div class="example-code">' + code + '</div>';
      return render;
    }
  })
  .use(markdownItAnchor, markdownItAnchorOptions);
