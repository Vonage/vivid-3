import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { Dialog } from './dialog';
import '.';

const COMPONENT_TAG = 'vwc-dialog';

describe('vwc-dialog', () => {

	/**
	 *
	 */
	async function closeDialog() {
		element.close();
		await elementUpdated(element);
	}

	/**
	 *
	 */
	async function showDialog() {
		element.show();
		await elementUpdated(element);
	}

	/**
	 *
	 */
	async function showModalDialog() {
		element.showModal();
		await elementUpdated(element);
	}

	let element: Dialog;
	let warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => true);

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Dialog;
		await elementUpdated(element);
	});

	afterAll(() => {
		warnSpy.mockRestore();
	});

	describe('open', function () {
		it('should open the dialog when set to true', async function () {
			element.open = true;
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);
		});

		it('should be opened when initiated with open attribute', async function() {
			const openElement = await fixture(
				`<${COMPONENT_TAG} open></${COMPONENT_TAG}>`
			) as Dialog;

			expect(getBaseElement(openElement).hasAttribute('open')).toEqual(true);
		});
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
			await showDialog();
		});

		it('should remove the open attribute', async function () {
			await closeDialog();
			expect(element.open).toEqual(false);
			expect(element.hasAttribute('open')).toEqual(false);
		});

		it('should remove open from base element', async function () {
			element.close();
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(false);
		});

		it('should fire the "close" event only when closing', async function() {
			await closeDialog();
			const spy = jest.fn();
			element.addEventListener('close', spy);

			await closeDialog();
			const callsWhenTryingToCloseAClosedDialog = spy.mock.calls.length;
			await showDialog();
			await closeDialog();

			expect(callsWhenTryingToCloseAClosedDialog).toEqual(0);
			expect(spy.mock.calls.length).toEqual(1);
		});
	});

	describe('show', function () {
		it('should add the open attribute', async function() {
			await showDialog();
			expect(element.open).toEqual(true);
			expect(element.hasAttribute('open')).toEqual(true);
		});

		it('should add open to base element', async function () {
			await showDialog();
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);
		});
	});

	describe('showModal', function () {
		it('should add the open attribute', async function() {
			await showModalDialog();
			expect(element.open).toEqual(true);
			expect(element.hasAttribute('open')).toEqual(true);
		});

		it('should add open to base element', async function () {
			await showModalDialog();
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);
		});
	});

	describe('scrimClick', function () {
		let dialogElement: HTMLDialogElement | null;
		const dialogClientRect: DOMRect = {
			bottom: 50,
			height: 100,
			left: 50,
			right: 50,
			top: 50,
			width: 100,
			x: 50,
			y: 50,
			toJSON(): any {
			}
		};
		beforeEach(async function () {
			element.heading = 'Heading';
			await showModalDialog();
			dialogElement = getBaseElement(element) as HTMLDialogElement;
			jest.spyOn(dialogElement, 'getBoundingClientRect').mockImplementation(() => dialogClientRect);
		});

		it('should close the dialog when scrim is clicked', async function () {
			const event = new MouseEvent('click', {
				'bubbles': true,
				'cancelable': true,
				'composed': true,
				'screenX': 25,
				'screenY': 25
			});
			dialogElement?.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should leave dialog open when anything but the scrim is clicked', async function () {
			const event = new MouseEvent('click', {
				'bubbles': true,
				'cancelable': true,
				'composed': true,
				clientY: 75,
				clientX: 75
			});
			dialogElement?.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should close the dialog when form is submitted', async function () {
			const formElement = document.createElement('form');
			formElement.setAttribute('method', 'dialog');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);

			formElement.requestSubmit();
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should leave the dialog open when submit a non dialog form', async function() {
			const formElement = document.createElement('form');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);
			formElement.onsubmit = _ => false;
			formElement.requestSubmit();
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remove submit listener on disconnected callback', async function () {
			const formElement = document.createElement('form');
			formElement.setAttribute('method', 'dialog');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);

			element.disconnectedCallback();
			formElement.requestSubmit();
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remove click listener on disconnected callback', async function () {
			const event = new MouseEvent('click', {
				'bubbles': true,
				'cancelable': true,
				'composed': true,
				'screenX': 25,
				'screenY': 25
			});
			element.disconnectedCallback();
			dialogElement?.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});
	});

	it('should fire close event with returnValue', async function() {
		let detail;
		const returnValue = 'returnValue';
		element.returnValue = returnValue;
		await showDialog();
		const spy = jest.fn().mockImplementation((e) => detail = e.detail);
		element.addEventListener('close', spy);

		await closeDialog();

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

	it('should close the dialog when dismiss button is clicked', async function() {
		const spy = jest.fn();
		element.addEventListener('close', spy);
		await showDialog();

		const dismissButton = getBaseElement(element).querySelector('.dismiss-button') as HTMLElement;
		dismissButton.click();

		expect(element.open).toEqual(false);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	describe('a11y', function () {
		/**
		 *
		 */
		async function triggerEscapeKey() {
			getBaseElement(element)
				.dispatchEvent(new KeyboardEvent('keydown', {
					'key': 'Escape',
					bubbles: true,
					composed: true
				}));
			await elementUpdated(element);
		}

		it('should close on escape key press', async function () {
			await showModalDialog();
			await triggerEscapeKey();
			expect(element.open).toEqual(false);
		});

		it('should remain open on escape key when not modal', async function () {
			await showDialog();
			await triggerEscapeKey();
			expect(element.open).toEqual(true);
		});

		it('should set role "dialog" on the base element', function () {
			expect(getBaseElement(element).getAttribute('role')).toEqual('dialog');
		});

		it('should set "aria-modal" when used as modal', async function() {
			await showModalDialog();
			expect(getBaseElement(element).hasAttribute('aria-modal')).toEqual(true);
		});

		it('should set "aria-labelledby" on base if set on host', async function () {
			const labelId = 'label';
			element.setAttribute('aria-labelledby', labelId);
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-labelledby')).toEqual(labelId);
		});

		it('should set "aria-labelledby" on base if set on host', async function () {
			const labelId = 'label';
			element.setAttribute('aria-describedby', labelId);
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-describedby')).toEqual(labelId);
		});

		it('should set "aria-label" on base if set on host', async function () {
			const labelId = 'label';
			element.setAttribute('aria-label', labelId);
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label')).toEqual(labelId);
		});
	});
});
