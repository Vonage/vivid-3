import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Dialog } from './dialog';
import '.';
import { dialogDefinition } from './definition';

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
	const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => true);

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
			expect(dialogDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Dialog);
			expect(element.open).toEqual(false);
			expect(element.returnValue).toEqual('');
			expect(element.icon).toEqual(undefined);
			expect(element.subtitle).toEqual(undefined);
			expect(element.headline).toEqual(undefined);
			expect(element.fullWidthBody).toEqual(false);
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

		it('should add class "modal" to base element', async function () {
			await showModalDialog();
			expect(getBaseElement(element).classList.contains('modal')).toEqual(true);
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
			element.headline = 'headline';
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

	it("should fire 'close' event with returnValue", async function() {
		let detail;
		const returnValue = 'returnValue';
		element.returnValue = returnValue;
		await showDialog();
		const spy = jest.fn().mockImplementation((e) => detail = e.detail);
		element.addEventListener('close', spy);

		await closeDialog();

		expect(detail).toEqual(returnValue);
	});

	it("should not bubble 'close' event", async () => {
		await showDialog();
		const fn = jest.fn();
		element.parentElement?.addEventListener('close', fn);
		await closeDialog();
		expect(fn).not.toBeCalled();
	});

	it('should render the icon when icon is set', async function() {
		const iconElementWhenUndefined = getBaseElement(element).querySelector('.icon');
		element.icon = 'home';
		await elementUpdated(element);
		const iconElement = getBaseElement(element).querySelector('.icon');
		expect(iconElementWhenUndefined).toBeNull();
		expect(iconElement).toBeTruthy();
		expect(iconElement?.getAttribute('name')).toEqual('home');
	});

	it( 'should add class of icon placement  to .base', async () => {
		const baseDiv = element.shadowRoot?.querySelector('.base');
		element.iconPlacement = 'side';
		await elementUpdated(element);
		expect(baseDiv?.classList.contains('icon-placement-side'))
			.toEqual(true);
	});

	it('should render the subtitle if is set', async function() {
		const contentElementWhenUndefined = getBaseElement(element).querySelector('.subtitle');
		const content = 'This is the dialog subtitle!';
		element.subtitle = content;
		await elementUpdated(element);
		const contentElement = getBaseElement(element).querySelector('.subtitle');
		expect(contentElementWhenUndefined).toBeNull();
		expect(contentElement).toBeTruthy();
		expect(contentElement?.textContent?.trim()).toEqual(content);
	});

	it('should render the header area when content is set', async function() {
		const headlineElementWhenUndefined = getBaseElement(element).querySelector('.headline');
		const content = 'This is the header!';

		element.headline = content;
		await elementUpdated(element);
		const headlineElement = getBaseElement(element).querySelector('.headline');

		expect(headlineElementWhenUndefined).toBeNull();
		expect(headlineElement).toBeTruthy();
		expect(headlineElement?.textContent?.trim()).toEqual(content);
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

	describe( 'dialog body', () => {
		it('should have body slot ', async function () {
			const bodySlotElement = element.shadowRoot?.
				querySelector('.body slot[name="body"]');

			expect(bodySlotElement).toBeTruthy();
		});

		it('should remove hide-body class from .base if body is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'body';
			slottedElement.id = 'body';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasBody = element.shadowRoot?.
				querySelector('.base')?.classList.contains('hide-body');

			expect(baseElementHasBody).toEqual(false);
		});

		it('should add class of full-width to body div wrapper', async () => {
			const bodyDiv = element.shadowRoot?.querySelector('.body');
			element.fullWidthBody = true;
			await  elementUpdated(element);
			expect(element.hasAttribute('full-width-body')).toEqual(true);
			expect(bodyDiv?.classList.contains('full-width'))
				.toEqual(true);

		});

	});


	describe( 'dialog footer', () => {
		it('should have footer slot ', async function () {
			const bodySlotElement = element.shadowRoot?.
				querySelector('.footer slot[name="footer"]');

			expect(bodySlotElement).toBeTruthy();
		});

		it('should remove hide-footer class from .base if body is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'footer';
			slottedElement.id = 'footer';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasBody = element.shadowRoot?.
				querySelector('.base')?.classList.contains('hide-footer');

			expect(baseElementHasBody).toEqual(false);
		});
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
