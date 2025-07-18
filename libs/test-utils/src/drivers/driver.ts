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

	expectEq: (query: QueryCommand<D>, value: any) => D['expectReturn'];
	actionSequence: (steps: Array<() => D['actionReturn']>) => D['actionReturn'];
};
