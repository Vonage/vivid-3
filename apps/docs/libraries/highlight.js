const hljs = require('highlight.js'); // https://highlightjs.org/
const md = require('markdown-it')();

module.exports = function (str, language, attrs) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlight = hljs.highlight(str, { language, ignoreIllegals: true }).value;

      // if code fence is attributed by preview,
      // we'd add a class to hook into and render
      // the code snippet as a live preview
      const classes = ['hljs'];
      attrs == 'preview' && classes.push('preview');

      return `<pre class="${classes.join(' ')}"><code>${highlight}</code></pre>`;

    } catch (__) { }
  }

  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}
