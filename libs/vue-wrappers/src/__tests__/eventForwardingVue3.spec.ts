// @vitest-environment jsdom
import { createApp, h, nextTick, type App } from 'vue3';
import { vi } from 'vitest';
import { setCustomComponentPrefix } from '../init/prefix';
import VButton from '../generated/components/VButton';

beforeAll(() => {
	setCustomComponentPrefix('vwc');
	window.ResizeObserver = class ResizeObserver {
		observe() {}
		disconnect() {}
	} as unknown as typeof ResizeObserver;
	HTMLElement.prototype.scrollIntoView = () => {};
});

let app: App | null = null;
let container: HTMLDivElement;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	app?.unmount();
	app = null;
	container.remove();
	vi.restoreAllMocks();
});

function mountButton(props: Record<string, unknown>) {
	app = createApp({
		setup() {
			return () => h(VButton as any, { label: 'Test', ...props });
		},
	});
	app.mount(container);
	return container.querySelector('vwc-button') as HTMLElement;
}

describe('Vue 3: Global event forwarding', () => {
	it('forwards a click listener to the underlying Vivid element', async () => {
		const handler = vi.fn();
		const el = mountButton({ onClick: handler });
		await nextTick();

		el.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('forwards a focus listener to the underlying Vivid element', async () => {
		const handler = vi.fn();
		const el = mountButton({ onFocus: handler });
		await nextTick();

		el.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('forwards a keydown listener to the underlying Vivid element', async () => {
		const handler = vi.fn();
		const el = mountButton({ onKeydown: handler });
		await nextTick();

		el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));

		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('forwards an arbitrary custom event listener to the underlying Vivid element', async () => {
		const handler = vi.fn();
		const el = mountButton({ onMyCustomEvent: handler });
		await nextTick();

		el.dispatchEvent(new CustomEvent('my-custom-event', { bubbles: true }));

		expect(handler).toHaveBeenCalledTimes(1);
	});
});
