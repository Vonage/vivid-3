/**
 * Exports the current prototype as a standalone HTML file that loads Vivid
 * from the public CDN (the officially documented unpkg paths).
 */
const CDN_BASE = 'https://unpkg.com/@vonage/vivid@5.x';

export function buildStandaloneHtml(
	title: string,
	fragment: string,
	theme: 'light' | 'dark'
): string {
	const usedTags = [
		...new Set([...fragment.matchAll(/<vwc-([a-z0-9-]+)/g)].map((m) => m[1])),
	].sort();

	const imports = usedTags
		.map((tag) => `\timport '${CDN_BASE}/${tag}/index.js';`)
		.join('\n');

	return `<!DOCTYPE html>
<html class="vvd-root" lang="en-US">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${escapeHtml(title)}</title>
	<link rel="stylesheet" href="${CDN_BASE}/styles/tokens/theme-${theme}.css" />
	<link rel="stylesheet" href="${CDN_BASE}/styles/core/all.css" />
	<link rel="stylesheet" href="${CDN_BASE}/styles/fonts/spezia-variable.css" />
	<style>
		:not(:defined) { visibility: hidden; }
		body {
			margin: 0;
			padding: 24px;
			background-color: var(--vvd-color-canvas);
			color: var(--vvd-color-canvas-text);
		}
	</style>
	<script type="module">
${imports}
	</script>
</head>
<body>
${fragment}
</body>
</html>
`;
}

export function downloadHtml(filename: string, content: string): void {
	const blob = new Blob([content], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}
