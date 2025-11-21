import type { expect as pwExpect } from '@playwright/test';
import type { Driver, PlaywrightDriverT } from './driver';
import type { VwcRangeSliderElement, VwcSliderElement } from '@vonage/vivid';

export const createPlaywrightDriver = (expect: typeof pwExpect) =>
	({
		querySelector: (el, selector) => el.locator(selector),
		enterShadow: (el) => el,
		querySelectorAll: (el, selector) => el.locator(selector),
		nth: (el, index) => el.nth(index),

		userClick: (el) => el.click(),
		userFill: (el, text) => el.fill(text),
		userClear: (el) => el.clear(),
		userFocus: (el) => el.focus(),
		userBlur: (el) => el.blur(),
		userHover: (el) => el.hover(),
		userDragSlider: async (el, track, thumb, value) => {
			const thumbId = await thumb.getAttribute('id');
			await el.evaluate(
				(el, [thumbId, value]) => {
					// Set values directly as it is more reliable than dragging the thumb
					if (thumbId === 'start-thumb') {
						const rangeSlider = el as VwcRangeSliderElement;
						rangeSlider.startAsNumber = value;
						rangeSlider.$emit('input:start');
						rangeSlider.$emit('input');
					} else if (thumbId === 'end-thumb') {
						const rangeSlider = el as VwcRangeSliderElement;
						rangeSlider.endAsNumber = value;
						rangeSlider.$emit('input:end');
						rangeSlider.$emit('input');
					} else {
						const slider = el as VwcSliderElement;
						slider.valueAsNumber = value;
						// Slider emits input event on programmatic value change
					}
				},
				[thumbId, value] as [string | null, number]
			);
		},

		eval: async (el, fn, arg, continuation) => {
			const result = await el.evaluate(fn, arg);
			await continuation?.(result);
		},
		waitForUpdate: async (el) => {
			await el.evaluate(() => {
				return new Promise<void>((resolve) => {
					requestAnimationFrame(() => resolve());
				});
			});
		},

		expectEq: async (queryCommand, value, message) => {
			switch (queryCommand.type) {
				case 'eval':
					try {
						await expect(async () =>
							expect(
								await queryCommand.el.evaluate(
									queryCommand.fn,
									queryCommand.arg
								)
							).toEqual(value)
						).toPass();
					} catch (error) {
						if (error instanceof Error) {
							error.message = `${message}\n\nOriginal error: ${error.message}`;
						}
						throw error;
					}
					break;
				case 'count':
					await expect(queryCommand.el).toHaveCount(value);
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
			return async function wrappedExpectation(...args: any[]) {
				try {
					return await expectation(...args);
				} catch (error) {
					if (error instanceof Error) {
						// Remove self from stack trace
						Error.captureStackTrace(error, wrappedExpectation);
					}
					throw error;
				}
			};
		},
		wrapSelector: (selector) => selector,
	} as Driver<PlaywrightDriverT>);
