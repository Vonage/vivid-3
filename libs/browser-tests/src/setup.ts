import { vi } from 'vitest';
import '@repo/styles/tokens/theme-light.css';
import '@repo/styles/core/theme.css';
import '@repo/styles/core/typography.css';
import '@repo/styles/fonts/spezia-variable.css';
import './style.css';

document.documentElement.classList.add('vvd-root');

// Disable CSS transitions and animations inside shadow DOMs to ensure
// deterministic screenshots. Normal CSS cannot pierce shadow boundaries,
// so we inject a stylesheet into every shadow root via adoptedStyleSheets.
const noTransitionsSheet = new CSSStyleSheet();
noTransitionsSheet.replaceSync(
	'*, *::before, *::after { transition: none !important; animation: none !important; }'
);

const originalAttachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function (
	...args: Parameters<typeof originalAttachShadow>
) {
	const shadow = originalAttachShadow.apply(this, args);
	shadow.adoptedStyleSheets.push(noTransitionsSheet);
	return shadow;
};

const content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);

// Intercept icon CDN fetch requests to serve from local Vite server
const originalFetch = globalThis.fetch;
globalThis.fetch = function (
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	const url =
		typeof input === 'string'
			? input
			: input instanceof URL
				? input.href
				: input.url;
	const match = url.match(
		/^https:\/\/icon\.resources\.vonage\.com\/v[^/]+\/(.+)$/
	);
	if (match) {
		return originalFetch(`/__icons__/${match[1]}`, init);
	}
	return originalFetch(input, init);
};

// Preserve the real requestAnimationFrame before the shim below replaces it.
// render-isolated uses this to synchronise with an actual compositor frame,
// e.g. to guarantee WebKit has painted a text-selection highlight before the
// screenshot is taken (WebKit defers selection painting to the next vsync,
// which the shimmed rAF does not cover).
(globalThis as any).__realRequestAnimationFrame =
	requestAnimationFrame.bind(window);

// Fake Date to a fixed point in time so that date-sensitive components
// (e.g. date-picker) produce deterministic screenshots.
vi.useFakeTimers({
	now: new Date('2023-01-15T12:00:00'),
	shouldAdvanceTime: true,
	toFake: ['Date'],
});

// Replace rAF with an implementation that sleeps for 0s while maintaining similar behaviour otherwise.
(() => {
	// Capture real timers so that vi.useFakeTimers() does not freeze rAF
	const realSetTimeout = globalThis.setTimeout.bind(globalThis);
	const realClearTimeout = globalThis.clearTimeout.bind(globalThis);
	let nextAnimationFrameId = 1;
	let animationFrameCallbacks = new Map<number, FrameRequestCallback>();
	let pendingAnimationFrameFlush: ReturnType<typeof setTimeout> | null = null;

	const flushAnimationFrame = () => {
		pendingAnimationFrameFlush = null;
		const callbacks = animationFrameCallbacks;
		animationFrameCallbacks = new Map();
		const time = performance.now();

		for (const callback of callbacks.values()) {
			callback(time);
		}
	};

	const scheduleAnimationFrameFlush = () => {
		pendingAnimationFrameFlush = realSetTimeout(() => {
			pendingAnimationFrameFlush = realSetTimeout(flushAnimationFrame, 0);
		}, 0);
	};

	window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
		const id = nextAnimationFrameId++;
		animationFrameCallbacks.set(id, callback);

		if (pendingAnimationFrameFlush === null) {
			scheduleAnimationFrameFlush();
		}

		return id;
	};

	window.cancelAnimationFrame = (id: number): void => {
		animationFrameCallbacks.delete(id);
		if (
			animationFrameCallbacks.size === 0 &&
			pendingAnimationFrameFlush !== null
		) {
			realClearTimeout(pendingAnimationFrameFlush);
			pendingAnimationFrameFlush = null;
		}
	};
})();
