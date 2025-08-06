import userEvent from '@testing-library/user-event';
import type { DOMDriverT, Driver } from './driver';
import type { VwcRangeSliderElement, VwcSliderElement } from '@vonage/vivid';

export type ExpectFn = (subject: any) => {
	toEqual: (value: any) => void;
};

const nextDOMUpdate = () =>
	new Promise<void>((resolve) => {
		requestAnimationFrame(() => resolve());
	});

export const createDOMDriver = (expect: ExpectFn) => {
	const user = userEvent.setup();

	// The default implementation of userEvent does not work elements inside shadow roots
	const clearShadowDOMCompatible = async (element: HTMLElement) => {
		element.focus();
		(element as any).value = '';
		element.dispatchEvent(
			new InputEvent('input', { bubbles: true, composed: true })
		);
	};

	return {
		querySelector: (el, selector) => {
			const result = el.querySelector(selector);
			if (!result) {
				throw new Error(`Could not find element: ${selector}`);
			}
			return result as HTMLElement;
		},
		enterShadow(el) {
			if (!el.shadowRoot) {
				throw new Error(`Element ${el.outerHTML} does not have a shadow root`);
			}
			return el.shadowRoot as unknown as HTMLElement;
		},
		querySelectorAll: (el, selector) =>
			el ? Array.from(el.querySelectorAll(selector)) : [],
		nth: (el, index) => {
			if (index < 0 || index > el.length - 1) {
				throw new Error(
					`Could not find element with index "${index}". Collection only has "${el.length}" elements.`
				);
			}
			return el[index];
		},

		userClick: async (el) => {
			await user.click(el);
			await nextDOMUpdate();
		},
		userFill: async (el, text) => {
			await clearShadowDOMCompatible(el);
			if (text) {
				await user.type(el, text);
			}
			await nextDOMUpdate();
		},
		userClear: async (el) => {
			await clearShadowDOMCompatible(el);
			await nextDOMUpdate();
		},
		userFocus: async (el) => {
			el.focus();
			await nextDOMUpdate();
		},
		userBlur: async (el) => {
			el.blur();
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				// Note: Should not be emitted if value did not change, but we are unable to determine this now
				el.dispatchEvent(
					new InputEvent('change', { bubbles: true, composed: true })
				);
			}
			await nextDOMUpdate();
		},
		userHover: async (el) => {
			await user.hover(el);
			await nextDOMUpdate();
		},
		userDragSlider: async (el, _track, thumb, value) => {
			// Cannot drag slider in a simulated DOM without layout, so we just set the value directly
			if (thumb.id === 'start-thumb') {
				const rangeSlider = el as VwcRangeSliderElement;
				rangeSlider.startAsNumber = value;
				rangeSlider.$emit('input:start');
				rangeSlider.$emit('input');
			} else if (thumb.id === 'end-thumb') {
				const rangeSlider = el as VwcRangeSliderElement;
				rangeSlider.endAsNumber = value;
				rangeSlider.$emit('input:end');
				rangeSlider.$emit('input');
			} else {
				const slider = el as VwcSliderElement;
				slider.valueAsNumber = value;
				// Slider emits input event on programmatic value change
			}
			await nextDOMUpdate();
		},

		eval: async (el, fn, arg, continuation) => {
			const result = await fn(el, arg);
			await continuation?.(result);
		},
		waitForUpdate: async () => {
			await nextDOMUpdate();
		},

		expectEq: (queryCommand, value, message) => {
			switch (queryCommand.type) {
				case 'eval':
					try {
						expect(queryCommand.fn(queryCommand.el, queryCommand.arg)).toEqual(
							value
						);
					} catch (error) {
						if (error instanceof Error) {
							error.message = `${message}\n\nOriginal error: ${error.message}`;
						}
						throw error;
					}
					break;
				case 'count':
					expect((queryCommand.el as any).length).toEqual(value);
					break;
			}
		},

		wrapAction: (action) => {
			return async function wrappedAction(...args: any[]): Promise<void> {
				try {
					return await action(...args);
				} catch (error) {
					if (error instanceof Error) {
						// Remove self from stack trace
						Error.captureStackTrace(error, wrappedAction);
					}
					throw error;
				}
			};
		},
		wrapExpect: (expectation) => {
			return function wrappedExpectation(...args: any[]) {
				try {
					return expectation(...args);
				} catch (error) {
					if (error instanceof Error) {
						// Remove self from stack trace
						Error.captureStackTrace(error, wrappedExpectation);
					}
					throw error;
				}
			};
		},
		wrapSelector: (selector) => {
			return function wrappedSelector(...args: any[]) {
				try {
					return selector(...args);
				} catch (error) {
					if (error instanceof Error) {
						// Remove self from stack trace
						Error.captureStackTrace(error, wrappedSelector);
					}
					throw error;
				}
			};
		},
	} as Driver<DOMDriverT>;
};
