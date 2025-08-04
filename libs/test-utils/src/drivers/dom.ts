import userEvent from '@testing-library/user-event';
import type { DOMDriverT, Driver } from './driver';

export type ExpectFn = (subject: any) => {
	toEqual: (value: any) => void;
};

export const createDOMDriver = (expect: ExpectFn) => {
	const user = userEvent.setup();

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

		userClick: (el) => user.click(el),
		userFill: (el, text) => user.type(el, text),
		userClear: (el) => user.clear(el),
		userFocus: (el) => el.focus(),
		userBlur: (el) => el.blur(),
		userHover: (el) => user.hover(el),

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
