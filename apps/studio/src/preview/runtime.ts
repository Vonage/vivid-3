/**
 * Runs inside the preview iframe. Registers every Vivid component, then
 * renders HTML fragments posted from the studio shell.
 */
import lightThemeUrl from '@repo/styles/tokens/theme-light.css?url';
import darkThemeUrl from '@repo/styles/tokens/theme-dark.css?url';
import '@repo/styles/core/all.css';
import '@repo/styles/fonts/spezia-variable.css';

import * as vivid from '@vonage/vivid';

// Expose Rte* classes as globals before registration so rich-text-editor
// extensions resolve on whenDefined (same approach as the repo dev-server).
for (const key in vivid) {
	if (/^Rte/.test(key)) {
		(window as unknown as Record<string, unknown>)[key] =
			vivid[key as keyof typeof vivid];
	}
}

for (const key in vivid) {
	if (/register[A-Z]/.test(key)) {
		(vivid[key as keyof typeof vivid] as () => void)();
	}
}

const themeLink = document.createElement('link');
themeLink.rel = 'stylesheet';
themeLink.href = lightThemeUrl;
// The theme stylesheet must come BEFORE the font/typography stylesheet:
// theme-*.css also declares --vvd-typography-* tokens (from the design-tokens
// pipeline) that would otherwise win the cascade over the Spezia typography
// in fonts/spezia-variable.css. Same ordering the repo dev-server relies on.
document.head.prepend(themeLink);

const stage = document.getElementById('stage')!;

interface RenderMessage {
	type: 'vivid-studio:render';
	html: string;
	theme: 'light' | 'dark';
}

function isRenderMessage(data: unknown): data is RenderMessage {
	return (
		typeof data === 'object' &&
		data !== null &&
		(data as { type?: unknown }).type === 'vivid-studio:render'
	);
}

window.addEventListener('message', (event: MessageEvent) => {
	if (event.origin !== window.location.origin) return;
	if (!isRenderMessage(event.data)) return;

	themeLink.href = event.data.theme === 'dark' ? darkThemeUrl : lightThemeUrl;

	stage.innerHTML = event.data.html;

	// innerHTML does not execute script tags — recreate them so users can
	// prototype interactions.
	for (const script of stage.querySelectorAll('script')) {
		const clone = document.createElement('script');
		for (const attr of script.attributes) {
			clone.setAttribute(attr.name, attr.value);
		}
		clone.textContent = script.textContent;
		script.replaceWith(clone);
	}
});

// Tell the shell we are ready to receive content.
window.parent.postMessage(
	{ type: 'vivid-studio:ready' },
	window.location.origin
);
