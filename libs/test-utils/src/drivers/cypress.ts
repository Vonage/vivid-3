/// <reference types="cypress" />
import type { CypressDriverT, Driver } from './driver';

export const createCypressDriver = (cy: Cypress.cy) => {
	const isCy = (el: unknown): el is Cypress.cy => el === cy;

	return {
		querySelector: (el, selector) => () =>
			isCy(el) ? el.get(selector) : el().find(selector),
		enterShadow: (el) => () => el().shadow(),
		querySelectorAll: (el, selector) => () =>
			isCy(el) ? el.get(selector) : el().find(selector),
		nth: (el, index) => () => el().eq(index),

		userClick: (el) => el().click(),
		userClear: (el) => el().clear(),
		userFocus: (el) => el().focus(),
		userBlur: (el) => el().blur(),
		userHover: (el) =>
			el().then(($el) => $el.get(0).dispatchEvent(new MouseEvent('mouseover'))),
		userFill: (el, text) => el().type(text),

		expectEq: (queryCommand, value) => {
			switch (queryCommand.type) {
				case 'eval':
					queryCommand.el().should(($el) => {
						expect(queryCommand.fn($el.get(0), queryCommand.arg)).to.deep.equal(
							value
						);
					});
					break;
				case 'count':
					queryCommand.el().should('have.length', value);
					break;
			}
		},
		actionSequence: (steps) => {
			for (const step of steps) {
				step();
			}
		},
	} as Driver<CypressDriverT>;
};
