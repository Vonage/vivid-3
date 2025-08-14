import 'vitest-axe/extend-expect';
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
expect.extend(matchers);

export default async () => {
	process.env.TZ = 'UTC';
};

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: any) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

Object.defineProperty(document, 'adoptedStyleSheets', {
	writable: true,
	configurable: true,
	value: [],
});

Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
	writable: true,
	value: [],
});

CSSStyleSheet.prototype.replace = vi.fn();
CSSStyleSheet.prototype.replaceSync = vi.fn();

global.CSS = {
	supports: () => false,
} as any;

global.ResizeObserver = class {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
};

global.console = {
	...console,
	info: vi.fn(),
	warn: vi.fn(),
	// error: vi.fn(),
};

HTMLElement.prototype.showPopover = vi.fn();
HTMLElement.prototype.hidePopover = vi.fn();

function preventPopupCodeRunningAfterWindowClose() {
	afterAll(async () => {
		document.body.innerHTML = '';
		await new Promise((resolve) => setTimeout(resolve, 0));
	});
}

preventPopupCodeRunningAfterWindowClose();
