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
