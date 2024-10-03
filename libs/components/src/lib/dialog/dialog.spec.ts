import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import * as dialogPolyfill from 'dialog-polyfill';
import {
	FoundationElement,
	FoundationElementRegistry,
} from '@microsoft/fast-foundation';
import { Dialog } from './dialog';
import '.';
import { dialogDefinition } from './definition';

const COMPONENT_TAG = 'vwc-dialog';

// Polyfill dialog element which is not supported in JSDOM
const originalConnectedCallback = FoundationElement.prototype.connectedCallback;
FoundationElement.prototype.connectedCallback = function () {
	originalConnectedCallback.call(this);
	this.shadowRoot!.querySelectorAll('dialog').forEach(
		(dialogPolyfill as any).registerDialog
	);
};

describe('vwc-dialog', () => {
	async function closeDialog() {
		element.close();
		await elementUpdated(element);
	}

	async function showDialog() {
		element.show();
		await elementUpdated(element);
	}

	async function showModalDialog() {
		element.showModal();
		await elementUpdated(element);
	}

	let element: Dialog;
	let dialogEl: HTMLDialogElement;

	const dialogOpenState = () => {
		if (!dialogEl.open) {
			return 'closed';
		}
		return dialogEl.style.zIndex ? 'modal' : 'non-modal';
	};

	const setUpFixture = async (template: string) => {
		element = fixture(template) as Dialog;
		dialogEl = getBaseElement(element) as HTMLDialogElement;
		await elementUpdated(element);
	};

	beforeEach(async () => {
		await setUpFixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`);
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
			expect(element.dismissButtonAriaLabel).toEqual(null);
		});
	});

	describe('open', function () {
		it('should open the dialog when set to true', async function () {
			element.open = true;
			expect(dialogOpenState()).toBe('non-modal');
		});

		it('should open the dialog as modal if modal is set', async function () {
			element.modal = true;

			element.open = true;

			expect(dialogOpenState()).toBe('modal');
		});

		it('should close the dialog when set to false', async function () {
			await showDialog();

			element.open = false;

			expect(dialogOpenState()).toBe('closed');
		});

		it('should be opened when initialized with open attribute', async function () {
			await setUpFixture(`<${COMPONENT_TAG} open></${COMPONENT_TAG}>`);
			expect(dialogOpenState()).toBe('non-modal');
		});

		it('should be opened as modal when initialized with open and modal attribute', async function () {
			await setUpFixture(`<${COMPONENT_TAG} open modal></${COMPONENT_TAG}>`);
			expect(dialogOpenState()).toBe('modal');
		});

		it('should handle opening and closing the dialog before first mount', async function () {
			element = document.createElement(COMPONENT_TAG) as Dialog;

			element.open = true;

			expect(() => (element.open = false)).not.toThrow();
		});
	});

	describe('icon', function () {
		it('should render the icon when icon is set', async function () {
			const iconElementWhenUndefined = dialogEl.querySelector('.icon');
			element.icon = 'home';
			await elementUpdated(element);
			const iconElement = dialogEl.querySelector('.icon');
			expect(iconElementWhenUndefined).toBeNull();
			expect(iconElement).toBeTruthy();
			expect(iconElement?.getAttribute('name')).toEqual('home');
		});
	});

	describe('iconPlacement', function () {
		it('should add class of icon placement to underlying dialog', async () => {
			element.iconPlacement = 'side';
			await elementUpdated(element);
			expect(dialogEl.classList.contains('icon-placement-side')).toEqual(true);
		});
	});

	describe('subtitle', function () {
		it('should render the subtitle if is set', async function () {
			const contentElementWhenUndefined = dialogEl.querySelector('.subtitle');
			const content = 'This is the dialog subtitle!';
			element.subtitle = content;
			await elementUpdated(element);
			const contentElement = dialogEl.querySelector('.subtitle');
			expect(contentElementWhenUndefined).toBeNull();
			expect(contentElement).toBeTruthy();
			expect(contentElement?.textContent?.trim()).toEqual(content);
		});
	});

	describe('headline', function () {
		it('should render the header area when content is set', async function () {
			const headlineElementWhenUndefined = dialogEl.querySelector('.headline');
			const content = 'This is the header!';

			element.headline = content;
			await elementUpdated(element);
			const headlineElement = dialogEl.querySelector('.headline');

			expect(headlineElementWhenUndefined).toBeNull();
			expect(headlineElement).toBeTruthy();
			expect(headlineElement?.textContent?.trim()).toEqual(content);
		});
	});

	describe('close method', function () {
		beforeEach(async function () {
			await showDialog();
		});

		it('should remove the open attribute', async function () {
			await closeDialog();
			expect(element.open).toEqual(false);
			expect(element.hasAttribute('open')).toEqual(false);
		});

		it('should close underlying dialog', async function () {
			await closeDialog();
			expect(dialogOpenState()).toBe('closed');
		});

		it('should fire the "close" event only when closing', async function () {
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

	describe('show method', function () {
		it('should add the open attribute', async function () {
			await showDialog();
			expect(element.open).toEqual(true);
			expect(element.hasAttribute('open')).toEqual(true);
		});

		it('should not throw when called on an open non-modal dialog', async function () {
			await showDialog();
			expect(() => element.show()).not.toThrow();
		});

		it('should not throw when called on modal dialog if modal is set', async function () {
			element.modal = true;
			await showDialog();
			expect(() => element.show()).not.toThrow();
		});

		it('should throw when called on modal dialog if modal is not set', async function () {
			await showModalDialog();
			expect(() => element.show()).toThrowError(
				"Failed to execute 'show' on 'Dialog': The dialog is already open as a modal dialog, and therefore cannot be opened as a non-modal dialog."
			);
		});
	});

	describe('showModal method', function () {
		it('should add the open attribute', async function () {
			await showModalDialog();
			expect(element.open).toEqual(true);
			expect(element.hasAttribute('open')).toEqual(true);
		});

		it('should open the underlying dialog as modal', async function () {
			await showModalDialog();
			expect(dialogOpenState()).toBe('modal');
		});

		it('should not set modal', async function () {
			await showModalDialog();
			expect(element.modal).toBe(false);
		});

		it('should only open the dialog as modal once', async function () {
			await showModalDialog();
			await closeDialog();
			await showDialog();
			expect(dialogOpenState()).toBe('non-modal');
		});

		it('should not throw when called on an open modal dialog', async function () {
			await showModalDialog();
			expect(() => element.showModal()).not.toThrow();
		});

		it('should throw when called on an open non-modal dialog', async function () {
			await showDialog();
			expect(() => element.showModal()).toThrowError(
				"Failed to execute 'showModal' on 'Dialog': The dialog is already open as a non-modal dialog, and therefore cannot be opened as a modal dialog."
			);
		});
	});

	describe('modal', () => {
		it('should transition the underlying dialog to new modal state if already open', async function () {
			element.open = true;

			element.modal = true;

			expect(dialogOpenState()).toBe('modal');
		});

		it('should add class "modal" to underlying dialog', async function () {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);
			expect(dialogEl.classList.contains('modal')).toEqual(true);
		});
	});

	describe('close event', function () {
		it("should fire 'close' event with returnValue", async function () {
			let detail;
			const returnValue = 'returnValue';
			element.returnValue = returnValue;
			await showDialog();
			const spy = jest.fn().mockImplementation((e) => (detail = e.detail));
			element.addEventListener('close', spy);

			await closeDialog();

			expect(detail).toEqual(returnValue);
		});

		it("should not bubble 'close' event", async () => {
			await showDialog();
			const fn = jest.fn();
			element.parentElement!.addEventListener('close', fn);

			await closeDialog();

			expect(fn).not.toBeCalled();
		});
	});

	describe('open event', function () {
		it("should fire 'open' event when opened", async function () {
			const onOpen = jest.fn();
			element.addEventListener('open', onOpen);

			await showDialog();

			expect(onOpen).toHaveBeenCalledTimes(1);
		});

		it('should not bubble', async () => {
			const onOpen = jest.fn();
			element.parentElement!.addEventListener('open', onOpen);

			await showDialog();

			expect(onOpen).not.toBeCalled();
		});
	});

	describe('scrimClick', function () {
		function createMouseEventOutsideTheDialog(type: string) {
			return new MouseEvent(type, {
				bubbles: true,
				cancelable: true,
				composed: true,
				screenX: 25,
				screenY: 25,
			});
		}

		function createMouseEventInsideTheDialog(type: string) {
			return new MouseEvent(type, {
				bubbles: true,
				cancelable: true,
				composed: true,
				clientY: 75,
				clientX: 75,
			});
		}

		const dialogClientRect: DOMRect = {
			bottom: 50,
			height: 100,
			left: 50,
			right: 50,
			top: 50,
			width: 100,
			x: 50,
			y: 50,
			toJSON(): any {},
		};

		function submitForm(formElement: HTMLFormElement) {
			const event = new Event('submit');
			Object.defineProperty(event, 'target', { value: formElement });
			dialogEl.dispatchEvent(event);
		}

		beforeEach(async function () {
			element.headline = 'headline';
			await showModalDialog();
			jest
				.spyOn(dialogEl, 'getBoundingClientRect')
				.mockImplementation(() => dialogClientRect);
		});

		it('should leave the dialog open when mouseup or click', async function () {
			const mouseupEvent = createMouseEventOutsideTheDialog('mouseup');
			const clickEvent = createMouseEventOutsideTheDialog('click');

			dialogEl.dispatchEvent(mouseupEvent);
			await elementUpdated(element);
			const elementOpenStateAfterMouseUp = element.open;
			dialogEl.dispatchEvent(clickEvent);
			await elementUpdated(element);
			const elementOpenStateAfterClick = element.open;

			expect(elementOpenStateAfterMouseUp).toEqual(true);
			expect(elementOpenStateAfterClick).toEqual(true);
		});

		it('should leave the dialog open when mousedown on a non dialog element', async function () {
			const otherElement = document.createElement('div');
			const event = createMouseEventOutsideTheDialog('mousedown');
			dialogEl.appendChild(otherElement);
			otherElement.dispatchEvent(event);
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should close the dialog when scrim is clicked', async function () {
			const event = createMouseEventOutsideTheDialog('mousedown');
			dialogEl.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should leave the dialog open on scrim click when no light dismiss', async function () {
			element.noLightDismiss = true;
			await elementUpdated(element);

			const event = createMouseEventOutsideTheDialog('mousedown');
			dialogEl.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should leave dialog open when anything but the scrim is clicked', async function () {
			const event = createMouseEventInsideTheDialog('mousedown');
			dialogEl.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should close the dialog when form is submitted', async function () {
			const formElement = document.createElement('form');
			formElement.setAttribute('method', 'dialog');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);

			submitForm(formElement);
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should leave the dialog open when submit a non dialog form', async function () {
			const formElement = document.createElement('form');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);
			formElement.onsubmit = (_) => false;

			submitForm(formElement);
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remove submit listener on disconnected callback', async function () {
			const formElement = document.createElement('form');
			formElement.setAttribute('method', 'dialog');
			formElement.setAttribute('slot', 'main');
			element.appendChild(formElement);

			element.remove();
			submitForm(formElement);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should remove click listener on disconnected callback', async function () {
			const event = new MouseEvent('mousedown', {
				bubbles: true,
				cancelable: true,
				composed: true,
				screenX: 25,
				screenY: 25,
			});
			element.remove();
			dialogEl.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});
	});

	it('should close the dialog when dismiss button is clicked', async function () {
		const spy = jest.fn();
		element.addEventListener('close', spy);
		await showDialog();

		const dismissButton = dialogEl.querySelector(
			'.dismiss-button'
		) as HTMLElement;
		dismissButton.click();

		expect(element.open).toEqual(false);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should preventDefault of cancel events on the dialog', async () => {
		const cancelEvent = new Event('cancel');
		cancelEvent.preventDefault = jest.fn();
		await showDialog();

		dialogEl.dispatchEvent(cancelEvent);

		expect(cancelEvent.preventDefault).toHaveBeenCalled();
	});

	describe('dialog body', () => {
		it('should have body slot ', async function () {
			const bodySlotElement = element.shadowRoot?.querySelector(
				'.body slot[name="body"]'
			);

			expect(bodySlotElement).toBeDefined();
		});

		it('should remove hide-body class from .base if body is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'body';
			slottedElement.id = 'body';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementClasses = dialogEl.classList;

			expect(baseElementClasses).not.toContain('hide-body');
		});

		it('should add class of full-width to body div wrapper', async () => {
			const bodyDiv = element.shadowRoot?.querySelector('.body');
			element.fullWidthBody = true;
			await elementUpdated(element);
			expect(element.hasAttribute('full-width-body')).toEqual(true);
			expect(bodyDiv?.classList).toContain('full-width');
		});
	});

	describe('dialog footer', () => {
		it.each(['footer', 'action-items'])(
			'should have a %s slot ',
			(slotName) => {
				const slotElement = element.shadowRoot?.querySelector(
					`.footer slot[name="${slotName}"]`
				);

				expect(slotElement).toBeDefined();
			}
		);

		it.each(['footer', 'action-items'])(
			'should remove hide-footer class from .base if %s is slotted',
			async (slotName) => {
				const slottedElement = document.createElement('div');
				slottedElement.slot = slotName;
				element.appendChild(slottedElement);
				await elementUpdated(element);

				const baseElementClasses = dialogEl.classList;

				expect(baseElementClasses).not.toContain('hide-footer');
			}
		);
	});

	it('should close the underlying dialog when disconnecting', async function () {
		await showDialog();

		element.remove();

		expect(dialogOpenState()).toBe('closed');
	});

	describe('a11y', function () {
		async function triggerEscapeKey() {
			dialogEl.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);
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

		it('should stop propgation on escape key', async () => {
			await showModalDialog();
			const spy = jest.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Escape' })
			);
			await elementUpdated(element);
			expect(spy.mock.calls.length).toBe(0);
		});

		it('should preventDefaut if Escape was pressed', async () => {
			await showModalDialog();
			const event = new KeyboardEvent('keydown', { key: 'Escape' });
			jest.spyOn(event, 'preventDefault');
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(1);
		});

		it('should enable default if key is not Escape', async () => {
			await showModalDialog();
			const event = new KeyboardEvent('keydown', { key: ' ' });
			jest.spyOn(event, 'preventDefault');
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(0);
		});

		it('should set role "dialog" on the underlying dialog', function () {
			expect(dialogEl.getAttribute('role')).toEqual('dialog');
		});

		it('should set "aria-modal" when used as modal', async function () {
			await showModalDialog();
			expect(dialogEl.hasAttribute('aria-modal')).toEqual(true);
		});

		it('should set "aria-label" on base if set on host', async function () {
			const labelId = 'label';
			element.setAttribute('aria-label', labelId);
			await elementUpdated(element);
			expect(dialogEl.getAttribute('aria-label')).toEqual(labelId);
		});

		describe('dismiss-button-aria-label', () => {
			it('should set "aria-label" on the dismiss button', async () => {
				const labelId = 'label';
				element.setAttribute('dismiss-button-aria-label', labelId);
				await elementUpdated(element);
				const dismissButton =
					element.shadowRoot?.querySelector('.dismiss-button');
				expect(dismissButton?.getAttribute('aria-label')).toBe(labelId);
			});
		});

		it('should set localised "aria-label" on the dismiss button', async () => {
			const dismissButton =
				element.shadowRoot?.querySelector('.dismiss-button');
			expect(dismissButton?.getAttribute('aria-label')).toBe('Close');
		});

		it('should pass html a11y test', async () => {
			element.open = true;
			element.setAttribute('aria-label', 'Test dialog');
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
