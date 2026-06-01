import * as fs from 'node:fs';
import * as path from 'node:path';

const DEV_SERVER_ROOT = path.resolve(import.meta.dirname, '../..');
export const EXAMPLES_DIR = path.resolve(DEV_SERVER_ROOT, 'examples-vue');
export const URL_PREFIX = '/vue/';
const FILE_EXT = '.vue';

export function listFiles(): string[] {
	if (!fs.existsSync(EXAMPLES_DIR)) return [];
	return fs
		.readdirSync(EXAMPLES_DIR)
		.filter((f) => f.endsWith(FILE_EXT))
		.sort();
}

function buildPage(fileName: string): string {
	return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vivid Example</title>
  <style>
    :not(:defined) { visibility: hidden; }
    body { padding: 16px; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import '@repo/styles/core/all.css';
    import { createApp } from 'vue';
    import { vividVue } from '@vonage/vivid-vue';
    import Example from '/examples-vue/${fileName}';

    createApp(Example).use(vividVue, { font: 'spezia' }).mount('#app');
  </script>
</body>
</html>`;
}

export function handleRequest(pathname: string): string | null {
	if (!pathname.startsWith(URL_PREFIX)) return null;

	const fileName = pathname.slice(URL_PREFIX.length);
	if (!fileName.endsWith(FILE_EXT)) return null;

	const filePath = path.join(EXAMPLES_DIR, fileName);
	const resolved = path.resolve(filePath);
	if (!resolved.startsWith(EXAMPLES_DIR + path.sep)) return null;

	if (!fs.existsSync(resolved)) return null;

	return buildPage(fileName);
}
