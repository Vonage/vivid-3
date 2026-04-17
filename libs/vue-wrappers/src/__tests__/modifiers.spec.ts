// @vitest-environment jsdom

import { createApp, h, nextTick, ref, type App } from 'vue3';
import VTextField from '../generated/components/VTextField';
import { setCustomComponentPrefix } from '../init/prefix';

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
});

/**
 * Mount VTextField with the given modelModifiers.
 * Returns a reactive ref tracking the model value, plus the container element.
 */
function mountTextField(modifiers: Record<string, boolean>) {
	const modelValue = ref<unknown>('');
	app = createApp({
		setup() {
			return () =>
				h(VTextField as any, {
					modelValue: modelValue.value,
					'onUpdate:modelValue': (v: unknown) => {
						modelValue.value = v;
					},
					modelModifiers: modifiers,
					label: 'Test',
				});
		},
	});
	app.mount(container);
	return { modelValue };
}

function simulateEvent(eventName: string, value: string) {
	const el = container.querySelector('vwc-text-field') as HTMLElement;
	Object.defineProperty(el, 'value', {
		value,
		writable: true,
		configurable: true,
	});
	el.dispatchEvent(new Event(eventName, { bubbles: true }));
}

describe('v-model .trim modifier', () => {
	it('should trim the emitted value on input', async () => {
		const { modelValue } = mountTextField({ trim: true });
		await nextTick();

		simulateEvent('input', '  hello  ');
		await nextTick();

		expect(modelValue.value).toBe('hello');
	});
});

describe('v-model .number modifier', () => {
	it('should emit a number when input is numeric', async () => {
		const { modelValue } = mountTextField({ number: true });

		simulateEvent('input', '42');
		await nextTick();

		expect(modelValue.value).toBe(42);
	});

	it('should emit original string when input is not numeric', async () => {
		const { modelValue } = mountTextField({ number: true });

		simulateEvent('input', 'abc');
		await nextTick();

		expect(modelValue.value).toBe('abc');
	});
});

describe('v-model .lazy modifier', () => {
	it('should NOT emit update:modelValue on input event', async () => {
		const { modelValue } = mountTextField({ lazy: true });

		simulateEvent('input', 'typed');
		await nextTick();

		expect(modelValue.value).toBe('');
	});

	it('should emit update:modelValue on change event', async () => {
		const { modelValue } = mountTextField({ lazy: true });

		simulateEvent('change', 'committed');
		await nextTick();

		expect(modelValue.value).toBe('committed');
	});
});

describe('v-model combined modifiers', () => {
	it('should apply .trim and .number together', async () => {
		const { modelValue } = mountTextField({ trim: true, number: true });

		simulateEvent('input', '  42  ');
		await nextTick();

		expect(modelValue.value).toBe(42);
	});

	it('should apply .trim with .lazy on change event', async () => {
		const { modelValue } = mountTextField({ trim: true, lazy: true });

		// Input should not update
		simulateEvent('input', '  hello  ');
		await nextTick();
		expect(modelValue.value).toBe('');

		// Change should update with trimmed value
		simulateEvent('change', '  hello  ');
		await nextTick();
		expect(modelValue.value).toBe('hello');
	});

	it('should apply .number with .lazy on change event', async () => {
		const { modelValue } = mountTextField({ number: true, lazy: true });

		simulateEvent('input', '42');
		await nextTick();
		expect(modelValue.value).toBe('');

		simulateEvent('change', '42');
		await nextTick();
		expect(modelValue.value).toBe(42);
	});
});

describe('v-model without modifiers', () => {
	it('should emit the raw value on input (default behavior)', async () => {
		const { modelValue } = mountTextField({});

		simulateEvent('input', '  hello  ');
		await nextTick();

		expect(modelValue.value).toBe('  hello  ');
	});
});
