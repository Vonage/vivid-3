import { DOMWindow, JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost/',
});

// Install globally
for (const key of Object.getOwnPropertyNames(dom.window)) {
	if (!(key in global)) {
		(global as unknown as DOMWindow)[key] = dom.window[key];
	}
}

global.matchMedia =
	global.matchMedia ??
	(() =>
		({
			matches: false,
			addListener: () => {},
			removeListener: () => {},
		} as unknown as MediaQueryList));

global.addEventListener = () => {};

global.removeEventListener = () => {};

Object.defineProperty(global.document, 'readyState', {
	value: 'complete',
});

(global as { window: typeof global }).window = global;
