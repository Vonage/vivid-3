/// <reference types="cypress" />
import type { Locator, Page } from '@playwright/test';

export type DOMDriverT = {
	rootLocator: HTMLElement;
	locator: HTMLElement;
	locatorMultiple: HTMLElement[];
	actionReturn: Promise<void>;
	expectReturn: void;
};

export type PlaywrightDriverT = {
	rootLocator: Page;
	locator: Locator;
	locatorMultiple: Locator;
	actionReturn: Promise<void>;
	expectReturn: Promise<void>;
};

export type CypressDriverT = {
	rootLocator: Cypress.cy;
	locator: () => Cypress.Chainable;
	locatorMultiple: () => Cypress.Chainable;
	actionReturn: void;
	expectReturn: void;
};

export type DriverT = DOMDriverT | PlaywrightDriverT | CypressDriverT;

type QueryCommand<D extends DriverT> =
	| {
			type: 'eval';
			el: D['locator'];
			fn: (el: any, arg?: any) => any;
			arg?: any;
	  }
	| { type: 'count'; el: D['locator'] };

export type Driver<D extends DriverT> = {
	querySelector: (
		loc: D['locator'] | D['rootLocator'],
		selector: string
	) => D['locator'];
	enterShadow: (loc: D['locator']) => D['locator'];
	querySelectorAll: (
		loc: D['locator'] | D['rootLocator'],
		selector: string
	) => D['locatorMultiple'];
	nth: (loc: D['locatorMultiple'], n: number) => D['locator'];

	userClick: (loc: D['locator']) => D['actionReturn'];
	userFill: (loc: D['locator'], text: string) => D['actionReturn'];
	userClear: (loc: D['locator']) => D['actionReturn'];
	userFocus: (loc: D['locator']) => D['actionReturn'];
	userBlur: (loc: D['locator']) => D['actionReturn'];
	userHover: (loc: D['locator']) => D['actionReturn'];
	userDragSlider: (
		loc: D['locator'],
		track: D['locator'],
		thumb: D['locator'],
		value: number
	) => D['actionReturn'];

	/**
	 * Evaluates fn in the browser. If provided, continuation is called with the result of the evaluation.
	 */
	eval: (
		loc: D['locator'],
		fn: (el: any, arg?: any) => any,
		arg?: any,
		continuation?: (result: any) => void | Promise<void>
	) => D['actionReturn'];
	/**
	 * Waits for the next DOM update cycle to complete.
	 */
	waitForUpdate: (loc: D['locator']) => D['actionReturn'];

	/**
	 * Evaluates a query command and compares the result to match the provided value.
	 * Comparison is done using assert mechanism of the testing framework, which means they will be retried if applicable.
	 */
	expectEq: (
		query: QueryCommand<D>,
		value: any,
		message: string
	) => D['expectReturn'];

	// Wrappers allow the driver to handle errors and report them at the call site.
	wrapAction: <A extends (...args: any[]) => D['actionReturn']>(action: A) => A;
	wrapExpect: <E extends (...args: any[]) => D['expectReturn']>(
		expectation: E
	) => E;
	wrapSelector: <S extends (...args: any[]) => unknown>(selector: S) => S;
};
