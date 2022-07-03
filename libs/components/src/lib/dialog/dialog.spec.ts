import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { Dialog } from './dialog';
import '.';

const COMPONENT_TAG = 'vwc-dialog';

describe('vwc-dialog', () => {
	let element: Dialog;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Dialog;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-dialog', async () => {
			expect(element).toBeInstanceOf(Dialog);
			expect(element.open).toEqual(false);
			expect(element.returnValue).toEqual(undefined);
			expect(element.icon).toEqual(undefined);
			expect(element.content).toEqual(undefined);
			expect(element.heading).toEqual(undefined);
		});
	});

	describe('close', function () {
		beforeEach(async function () {
			element.open = true;
			await elementUpdated(element);
		});
		it('should remove the open attribute', async function () {
			element.close();
			await elementUpdated(element);
			expect(element.open).toEqual(false);
			expect(element.hasAttribute('open')).toEqual(false);
		});

		it('should remove open from base element', async function () {
			element.close();
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(false);
		});

		it('should fire the "close" event only when closing', async function() {
			element.open = false;
			const spy = jest.fn();
		  element.addEventListener('close', spy);

			element.close();
			const callsWhenTryingToCloseAClosedDialog = spy.mock.calls.length;
			element.open = true;
			element.close();

			expect(callsWhenTryingToCloseAClosedDialog).toEqual(0);
			expect(spy.mock.calls.length).toEqual(1);
		});
	});

	describe('show', function () {
		it('should add the open attribute', async function() {
			element.show();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
			expect(element.hasAttribute('open')).toEqual(true);
		});

		it('should add open to base element', async function () {
			element.open = true;
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);
		});
	});

	it('should fire close event with returnValue', async function() {
		let detail;
		const returnValue = 'returnValue';
		element.open = true;
		element.returnValue = returnValue;
		const spy = jest.fn().mockImplementation((e) => detail = e.detail);
		element.addEventListener('close', spy);

		element.close();

		expect(detail).toEqual(returnValue);
	});

	it('should render the icon when icon is set', async function() {
		const iconElementWhenUndefined = getBaseElement(element).querySelector('.icon');
		  element.icon = 'home';
		await elementUpdated(element);
		const iconElement = getBaseElement(element).querySelector('.icon');
		expect(iconElementWhenUndefined).toBeNull();
		expect(iconElement).toBeTruthy();
		expect(iconElement?.getAttribute('type')).toEqual('home');
	});

	it('should render the content area when content is set', async function() {
		const contentElementWhenUndefined = getBaseElement(element).querySelector('.content');
		const content = 'This is the content!';
		element.content = content;
		await elementUpdated(element);
		const contentElement = getBaseElement(element).querySelector('.content');
		expect(contentElementWhenUndefined).toBeNull();
		expect(contentElement).toBeTruthy();
		expect(contentElement?.textContent?.trim()).toEqual(content);
	});

	it('should render the content area when content is set', async function() {
		const headingElementWhenUndefined = getBaseElement(element).querySelector('.heading');
		const content = 'This is the header!';

		element.heading = content;
		await elementUpdated(element);
		const headingElement = getBaseElement(element).querySelector('.heading');

		expect(headingElementWhenUndefined).toBeNull();
		expect(headingElement).toBeTruthy();
		expect(headingElement?.textContent?.trim()).toEqual(content);
	});


});
