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

Object.defineProperty(document, 'execCommand', {
	value: () => true,
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

// Polyfill DragEvent/DataTransfer for jsdom environment
(() => {
	if (typeof (globalThis as any).DataTransfer === 'undefined') {
		class DataTransferPolyfill {
			dropEffect = '';
			effectAllowed = '';
			files: File[] = [];
			items: any[] = [];
			types: string[] = [];
			#store = new Map<string, string>();

			setData(format: string, data: string) {
				this.#store.set(format, data);
				if (!this.types.includes(format)) this.types.push(format);
			}
			getData(format: string) {
				return this.#store.get(format) ?? '';
			}
			clearData(format?: string) {
				if (format) this.#store.delete(format);
				else this.#store.clear();
			}
			setDragImage() {}
		}
		(globalThis as any).DataTransfer =
			DataTransferPolyfill as unknown as typeof DataTransfer;
	}

	if (typeof (globalThis as any).DragEvent === 'undefined') {
		class DragEventPolyfill extends Event {
			dataTransfer: DataTransfer;
			relatedTarget: EventTarget | null;

			constructor(type: string, eventInitDict: any = {}) {
				super(type, eventInitDict);
				this.dataTransfer =
					eventInitDict.dataTransfer ?? new (globalThis as any).DataTransfer();
				this.relatedTarget = eventInitDict.relatedTarget ?? null;
			}
		}

		(globalThis as any).DragEvent =
			DragEventPolyfill as unknown as typeof DragEvent;
	}
})();

// computePosition triggers getComputedStyle repeatedly, which is very slow in jsdom and does not work either since there is no layout.
// Stub out globally for performance. Test that want the original use their own vi.mock which overrides this stub.
vi.mock(import('@floating-ui/dom'), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		computePosition: vi.fn().mockResolvedValue({
			x: 0,
			y: 0,
			placement: 'bottom',
			strategy: 'fixed',
			middlewareData: { hide: { referenceHidden: false }, arrow: {} },
		}),
	};
});

// FAST schedules DOM updates with rAF.
// Tests rely on elementUpdated() to wait for the next AF, which means that they literally sleep for 1/60s.
// Replace rAF with an implementation that sleeps for 0s while maintaining similar behaviour otherwise.
(() => {
	// Capture real timers so that vi.useFakeTimers() does not freeze rAF
	const realSetImmediate = globalThis.setImmediate.bind(globalThis);
	const realClearImmediate = globalThis.clearImmediate.bind(globalThis);
	let nextAnimationFrameId = 1;
	let animationFrameCallbacks = new Map<number, FrameRequestCallback>();
	let pendingAnimationFrameFlush: NodeJS.Immediate | null = null;

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
		pendingAnimationFrameFlush = realSetImmediate(() => {
			pendingAnimationFrameFlush = realSetImmediate(flushAnimationFrame);
		});
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
			realClearImmediate(pendingAnimationFrameFlush);
			pendingAnimationFrameFlush = null;
		}
	};
})();
