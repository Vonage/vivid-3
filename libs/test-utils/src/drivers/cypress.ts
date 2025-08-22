/// <reference types="cypress" />
import type { CypressDriverT, Driver } from './driver';

export const nextDOMUpdate = async () =>
	new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export const createCypressDriver = (cy: Cypress.cy) => {
	const isCy = (el: unknown): el is Cypress.cy => el === cy;

	// Keep track of the users stack when the user calls into the library to report errors there
	let userInvocationStack: string | undefined;

	const withReplacedStack = <F extends (...args: unknown[]) => unknown>(
		fn: F
	): F => {
		const invocationStack = userInvocationStack;
		return ((...args: unknown[]) => {
			// To make cypress record our stack, override Error to return it when cypress calls it when capturing the users stack
			const OriginalError = window.Error;
			(window as any).Error = class ErrorWithUserInvocationStack extends Error {
				constructor(message?: string | undefined) {
					super(message);
					if (message === 'userInvocationStack') {
						this.stack = invocationStack;
					}
				}
				static override captureStackTrace(error: object, caller: any) {
					if ((error as Error).message !== 'userInvocationStack') {
						super.captureStackTrace(error, caller);
					}
				}
			};
			try {
				return fn(...args);
			} finally {
				window.Error = OriginalError;
			}
		}) as F;
	};

	return {
		querySelector: (el, selector) =>
			withReplacedStack(() =>
				isCy(el) ? el.get(selector) : el().find(selector)
			),
		enterShadow: (el) => withReplacedStack(() => el().shadow()),
		querySelectorAll: (el, selector) =>
			withReplacedStack(() =>
				isCy(el) ? el.get(selector) : el().find(selector)
			),
		nth: (el, index) => withReplacedStack(() => el().eq(index)),

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
					await nextDOMUpdate();
				});
			});
		},

		eval: (el, fn, arg, continuation) => {
			const invocationStack = userInvocationStack;
			el().then(async ($el) => {
				userInvocationStack = invocationStack;
				try {
					const result = await fn($el.get(0), arg);
					await continuation?.(result);
				} finally {
					userInvocationStack = undefined;
				}
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

		expectEq: (queryCommand, value, message) => {
			const invocationStack = userInvocationStack;
			switch (queryCommand.type) {
				case 'eval':
					queryCommand.el().should(($el) => {
						try {
							expect(
								queryCommand.fn($el.get(0), queryCommand.arg)
							).to.deep.equal(value);
						} catch (error) {
							const errorWithFixedStack = new Error(
								`${message}\n\nOriginal error: ${(error as Error).message}`
							);
							if (invocationStack) {
								errorWithFixedStack.stack = invocationStack;
							}
							throw errorWithFixedStack;
						}
					});
					break;
				case 'count':
					queryCommand.el().should('have.length', value);
					break;
			}
		},

		wrapAction: (action) => {
			return function wrappedAction(...args: any[]) {
				if (!userInvocationStack) {
					const error = new Error();
					// Remove self from stack trace
					Error.captureStackTrace(error, wrappedAction);
					userInvocationStack = error.stack;
				}
				try {
					return action(...args);
				} finally {
					userInvocationStack = undefined;
				}
			};
		},
		wrapExpect: (expectation) => {
			return function wrappedExpectation(...args: any[]) {
				if (!userInvocationStack) {
					const error = new Error();
					// Remove self from stack trace
					Error.captureStackTrace(error, wrappedExpectation);
					userInvocationStack = error.stack;
				}
				try {
					return expectation(...args);
				} finally {
					userInvocationStack = undefined;
				}
			};
		},
		wrapSelector: (selector) => {
			return function wrappedSelector(...args: any[]) {
				if (!userInvocationStack) {
					const error = new Error();
					// Remove self from stack trace
					Error.captureStackTrace(error, wrappedSelector);
					userInvocationStack = error.stack;
				}
				try {
					return selector(...args);
				} finally {
					userInvocationStack = undefined;
				}
			};
		},
	} as Driver<CypressDriverT>;
};
