/// <reference types="cypress" />
import type { CypressDriverT, Driver } from './driver';

export const elementUpdated = async () =>
	new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const postAction = async () => {
	// updateDOM();
	await elementUpdated();
};

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
		userFill: (el, text) => {
			if (text === '') {
				return el().clear();
			} else {
				return el().clear().type(text);
			}
		},
		userDragSlider: (el, track, thumb, value) => {
			el().then(($el) => {
				thumb().then(async ($thumb) => {
					// Set values directly as it is more reliable than dragging the thumb
					const el = $el.get(0);
					const thumbEl = $thumb.get(0);
					if (thumbEl.id === 'start-thumb') {
						el.startAsNumber = value;
						el.$emit('input:start');
						el.$emit('input');
					} else if (thumbEl.id === 'end-thumb') {
						el.endAsNumber = value;
						el.$emit('input:end');
						el.$emit('input');
					} else {
						el.valueAsNumber = value;
						// Slider emits input event on programmatic value change
					}
					await postAction();
				});
			});
		},

		eval: (el, fn, arg, continuation) => {
			el().then(async ($el) => {
				const result = await fn($el.get(0), arg);
				await continuation?.(result);
			});
		},
		waitForUpdate(el) {
			el().then(() => {
				return new Promise<void>((resolve) => {
					requestAnimationFrame(() => {
						resolve();
					});
				});
			});
		},

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
