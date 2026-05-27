import * as wcHandler from '../wc/handler.js';
import * as vueHandler from '../vue/handler.js';

export function handleRequest(pathname: string): string | null {
	if (pathname !== '/' && pathname !== '/index.html') return null;

	const wcFiles = wcHandler.listFiles();
	const vueFiles = vueHandler.listFiles();

	const wcLinks = wcFiles
		.map((f) => `    <li><a href="/wc/${f}">${f}</a></li>`)
		.join('\n');
	const vueLinks = vueFiles
		.map((f) => `    <li><a href="/vue/${f}">${f}</a></li>`)
		.join('\n');

	return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vivid Dev Server</title>
</head>
<body>
  <h2>Available Examples</h2>
  <h3>Web Components</h3>
  ${wcFiles.length ? `<ul>\n${wcLinks}\n  </ul>` : '<p>No Web Components example files found.</p>'}
  <h3>Vue</h3>
  ${vueFiles.length ? `<ul>\n${vueLinks}\n  </ul>` : '<p>No Vue example files found.</p>'}
  <p>Create <code>.html</code> files in <code>apps/dev-server/examples-wc/</code></p>
  <p>Create <code>.vue</code> files in <code>apps/dev-server/examples-vue/</code></p>
</body>
</html>`;
}
