const hljs = require('highlight.js'); // https://highlightjs.org/
const md = require('markdown-it')();
// let isPreview;

// const PREVIEW = "<!-- preview -->";

module.exports = function (str, language, attrs) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlight = hljs.highlight(str, { language, ignoreIllegals: true }).value;
      let html = `<pre class="hljs"><code>${highlight}</code></pre>`;
      if (attrs == 'preview') {
        html = str + html;
      }
      return html;
    } catch (__) { }
  }

  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}
