const hljs = require('highlight.js'); // https://highlightjs.org/
const md = require('markdown-it')();

module.exports = function (str, language, attrs) {
	if (language && hljs.getLanguage(language)) {
		try {
			const { value: highlight } = hljs.highlight(str, {
				language,
				ignoreIllegals: true,
			});

			// if code fence is attributed by preview,
			// we'd add a class to hook into and render
			// the code snippet as a live preview
			const classes = ['hljs', ...attrs.split(' ')];

			return `<pre class="${classes.join(
				' '
			)}" data-pagefind-ignore><code>${highlight}</code></pre>`;
		} catch (__) {
			// ignore
		}
	}

	return (
		'<pre class="hljs" data-pagefind-ignore><code>' +
		md.utils.escapeHtml(str) +
		'</code></pre>'
	);
};
