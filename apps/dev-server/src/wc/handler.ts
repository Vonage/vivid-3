import * as fs from 'node:fs';
import * as path from 'node:path';

const DEV_SERVER_ROOT = path.resolve(import.meta.dirname, '../..');
export const EXAMPLES_DIR = path.resolve(DEV_SERVER_ROOT, 'examples-wc');
export const URL_PREFIX = '/wc/';
const FILE_EXT = '.html';

export function listFiles(): string[] {
	if (!fs.existsSync(EXAMPLES_DIR)) return [];
	return fs
		.readdirSync(EXAMPLES_DIR)
		.filter((f) => f.endsWith(FILE_EXT))
		.sort();
}

function buildPage(fragment: string): string {
	return `<!DOCTYPE html>
<html class="vvd-root" lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vivid Example</title>
  <script type="module" src="/src/wc/init-vivid.ts"></script>
  <style>
    :not(:defined) { visibility: hidden; }
    body { padding: 16px; }
  </style>
</head>
<body>
${fragment}
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

	const fragment = fs.readFileSync(resolved, 'utf-8');
	return buildPage(fragment);
}
