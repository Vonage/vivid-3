import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { TopAppBar } from './top-app-bar';
import '.';

const COMPONENT_TAG = 'vwc-top-app-bar';

describe('vwc-top-app-bar', () => {
	let element: TopAppBar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TopAppBar;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-top-app-bar', async () => {
			expect(element).toBeInstanceOf(TopAppBar);
			expect(element.alternate).toBeFalsy();
			expect(element.fixed).toBeFalsy();
			expect(element.heading).toBeUndefined();
		});
	});

	describe('fixed', () => {
		it('should set "fixed" to true and add "fixed" class', async () => {
			const control = getControlElement(element);
			let hasClassFixed = control.classList.contains('fixed');
			element.fixed = true;
			await elementUpdated(element);
			expect(hasClassFixed).toEqual(false);

			hasClassFixed = control.classList.contains('fixed');
			expect(hasClassFixed).toEqual(true);
		});
	});

	describe('alternate', () => {
		it('should set "alternate" to true and add "alternate" class', async () => {
			const control = getControlElement(element);
			let hasClassAlternate = control.classList.contains('alternate');
			element.alternate = true;
			await elementUpdated(element);
			expect(hasClassAlternate).toEqual(false);

			hasClassAlternate = control.classList.contains('alternate');
			expect(hasClassAlternate).toEqual(true);
		});
	});

	describe('heading', () => {
		it('should render heading if heading is set', async function () {
			element.heading = 'top app bar';
			await elementUpdated(element);

			const headerContent = element.shadowRoot?.querySelector('.header-content');
			expect(headerContent).toBeTruthy();
		});
	});
});
