import userEvent from '@testing-library/user-event';
import type { DOMDriverT, Driver } from './driver';
import { elementUpdated } from '@repo/shared';

export type ExpectFn = (subject: any) => {
	toEqual: (value: any) => void;
};

const postAction = async () => {
	// updateDOM();
	await elementUpdated(null);
};

export const createDOMDriver = (expect: ExpectFn) => {
	const user = userEvent.setup();

	// The default implementation of userEvent does not work elements inside shadow roots
	const clearShadowDOMCompatible = async (element: HTMLElement) => {
		element.focus();
		element.value = '';
		element.dispatchEvent(
			new InputEvent('input', { bubbles: true, composed: true })
		);
	};

	return {
		querySelector: (el, selector) => el.querySelector(selector) as HTMLElement,
		enterShadow(el) {
			if (!el.shadowRoot) {
				throw new Error(`Element ${el.outerHTML} does not have a shadow root`);
			}
			return el.shadowRoot as unknown as HTMLElement;
		},
		querySelectorAll: (el, selector) =>
			el ? Array.from(el.querySelectorAll(selector)) : [],
		nth: (el, index) => el[index],

		userClick: async (el) => {
			await user.click(el);
			await postAction();
		},
		userFill: async (el, text) => {
			await clearShadowDOMCompatible(el);
			if (text) {
				await user.type(el, text);
			}
			await postAction();
		},
		userClear: async (el) => {
			await clearShadowDOMCompatible(el);
			await postAction();
		},
		userFocus: async (el) => {
			el.focus();
			await postAction();
		},
		userBlur: async (el) => {
			el.blur();
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				// Note: Should not be emitted if value did not change, but we are unable to determine this now
				el.dispatchEvent(
					new InputEvent('change', { bubbles: true, composed: true })
				);
			}
			await postAction();
		},
		userHover: async (el) => {
			await user.hover(el);
			await postAction();
		},
		userDragSlider: async (el, track, thumb, value) => {
			// Cannot drag slider in a simulated DOM without layout, so we just set the value directly
			if (thumb.id === 'start-thumb') {
				el.startAsNumber = value;
				el.$emit('input:start');
				el.$emit('input');
			} else if (thumb.id === 'end-thumb') {
				el.endAsNumber = value;
				el.$emit('input:end');
				el.$emit('input');
			} else {
				el.valueAsNumber = value;
				// Slider emits input event on programmatic value change
			}
			await postAction();
		},

		eval: async (el, fn, arg, continuation) => {
			const result = await fn(el, arg);
			await continuation?.(result);
		},
		waitForUpdate: (el) => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 0);
			});
		},

		expectEq: (queryCommand, value) => {
			switch (queryCommand.type) {
				case 'eval':
					expect(queryCommand.fn(queryCommand.el, queryCommand.arg)).toEqual(
						value
					);
					break;
				case 'count':
					expect((queryCommand.el as any).length).toEqual(value);
					break;
			}
		},
		actionSequence: async (steps) => {
			for (const step of steps) {
				await step();
			}
		},
	} as Driver<DOMDriverT>;
};
