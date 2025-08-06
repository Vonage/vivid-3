import type { expect as pwExpect } from 'playwright/test';
import type { Driver, PlaywrightDriverT } from './driver';

export const createPlaywrightDriver = (expect: typeof pwExpect) =>
	({
		querySelector: (el, selector) => el.locator(selector),
		enterShadow: (el) => el,
		nth: (el, index) => el.nth(index),

		querySelectorAll: (el, selector) => el.locator(selector),

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
						el.startAsNumber = value;
						el.$emit('input:start');
						el.$emit('input');
					} else if (thumbId === 'end-thumb') {
						el.endAsNumber = value;
						el.$emit('input:end');
						el.$emit('input');
					} else {
						el.valueAsNumber = value;
						// Slider emits input event on programmatic value change
					}
				},
				[thumbId, value]
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

		expectEq: async (queryCommand, value) => {
			switch (queryCommand.type) {
				case 'eval':
					await expect(async () =>
						expect(
							await queryCommand.el.evaluate(queryCommand.fn, queryCommand.arg)
						).toEqual(value)
					).toPass();
					break;
				case 'count':
					await expect(queryCommand.el).toHaveCount(value);
					break;
			}
		},
		actionSequence: async (steps) => {
			for (const step of steps) {
				await step();
			}
		},
	} as Driver<PlaywrightDriverT>);
