import { DOMWindow, JSDOM } from 'jsdom';
import MediaQueryList from 'happy-dom/lib/match-media/MediaQueryList';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost/',
});

// Install globally
for (const key of Object.getOwnPropertyNames(dom.window)) {
	if (!(key in global)) {
		(global as unknown as DOMWindow)[key] = dom.window[key];
	}
}

window.matchMedia =
	window.matchMedia ??
	(() =>
		({
			matches: false,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			addListener: () => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			removeListener: () => {},
		} as unknown as MediaQueryList));

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.addEventListener = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.removeEventListener = () => {};

Object.defineProperty(window.document, 'readyState', {
	value: 'complete',
});

(global as { window: typeof global }).window = global;
