import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import * as dialogPolyfill from 'dialog-polyfill';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Dialog } from './dialog';
import '.';

const COMPONENT_TAG = 'vwc-dialog';

export function setDialogPolyfill() {
	// Polyfill dialog element which is not supported in JSDOM
	const originalConnectedCallback = VividElement.prototype.connectedCallback;
	VividElement.prototype.connectedCallback = function () {
		originalConnectedCallback.call(this);
		this.shadowRoot!.querySelectorAll('dialog').forEach(
			(dialogPolyfill as any).registerDialog
		);
	};
}

setDialogPolyfill();
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

	const getDismissButton = () =>
		dialogEl.querySelector('.dismiss-button') as HTMLElement;

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
			expect(element).toBeInstanceOf(Dialog);
			expect(element.open).toEqual(false);
			expect(element.returnValue).toEqual('');
			expect(element.icon).toEqual(undefined);
			expect(element.subtitle).toEqual(undefined);
			expect(element.headline).toEqual(undefined);
			expect(element.fullWidthBody).toEqual(false);
			expect(element.dismissButtonAriaLabel).toEqual(null);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

	describe('no-dismiss-button', function () {
		it('should render a dismiss button when no-dismiss-button is not set', async function () {
			expect(getDismissButton()).not.toBeNull();
		});

		it('should not render dismiss button when no-dismiss-button is set', async function () {
			element.noDismissButton = true;
			await elementUpdated(element);
			expect(getDismissButton()).toBeNull();
		});

		it('should not render dismiss button when no-dismiss-button is implicitly set via non-dismissible', async function () {
			element.nonDismissible = true;
			await elementUpdated(element);
			expect(getDismissButton()).toBeNull();
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
			const spy = vi.fn();
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
			const spy = vi.fn().mockImplementation((e) => (detail = e.detail));
			element.addEventListener('close', spy);

			await closeDialog();

			expect(detail).toEqual(returnValue);
		});

		it("should not bubble 'close' event", async () => {
			await showDialog();
			const fn = vi.fn();
			element.parentElement!.addEventListener('close', fn);

			await closeDialog();

			expect(fn).not.toBeCalled();
		});
	});

	describe('open event', function () {
		it("should fire 'open' event when opened", async function () {
			const onOpen = vi.fn();
			element.addEventListener('open', onOpen);

			await showDialog();

			expect(onOpen).toHaveBeenCalledTimes(1);
		});

		it('should not bubble', async () => {
			const onOpen = vi.fn();
			element.parentElement!.addEventListener('open', onOpen);

			await showDialog();

			expect(onOpen).not.toBeCalled();
		});
	});

	describe('cancel event', function () {
		const triggerCancelEvent = () => getDismissButton().click();

		beforeEach(async () => {
			await showDialog();
		});

		it('should prevent dialog from closing when event default is prevented', async () => {
			element.addEventListener('cancel', (event) => {
				event.preventDefault();
			});

			triggerCancelEvent();

			expect(element.open).toEqual(true);
		});

		it('should emit a non-bubbling event', async () => {
			const onCancel = vi.fn();
			element.parentElement!.addEventListener('cancel', onCancel);

			triggerCancelEvent();

			expect(onCancel).not.toBeCalled();
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

		const clickOnScrim = () => {
			dialogEl.dispatchEvent(createMouseEventOutsideTheDialog('mousedown'));
		};

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
			vi.spyOn(dialogEl, 'getBoundingClientRect').mockImplementation(
				() => dialogClientRect
			);
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
			clickOnScrim();
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should emit a cancel event when scrim is clicked', async function () {
			const cancelSpy = vi.fn();
			element.addEventListener('cancel', cancelSpy);
			clickOnScrim();
			await elementUpdated(element);
			expect(cancelSpy).toHaveBeenCalledTimes(1);
		});

		it('should leave the dialog open on scrim click when no light dismiss', async function () {
			element.noLightDismiss = true;
			await elementUpdated(element);

			clickOnScrim();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should leave the dialog open on scrim click when no light dismiss is implicitly set via non-dismissible', async function () {
			element.nonDismissible = true;
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
		const spy = vi.fn();
		element.addEventListener('close', spy);
		await showDialog();

		getDismissButton().click();

		expect(element.open).toEqual(false);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should emit a cancel event when dismiss button is clicked', async function () {
		const cancelSpy = vi.fn();
		element.addEventListener('cancel', cancelSpy);
		await showDialog();

		getDismissButton().click();

		expect(element.open).toEqual(false);
		expect(cancelSpy).toHaveBeenCalledTimes(1);
	});

	it('should preventDefault of cancel events on the dialog', async () => {
		const cancelEvent = new Event('cancel');
		cancelEvent.preventDefault = vi.fn();
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

	describe('a11y attributes', function () {
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

		it('should stay open on escape key press when no-dismiss-on-esc is set', async function () {
			element.noDismissOnEsc = true;
			await showModalDialog();
			await triggerEscapeKey();
			expect(element.open).toEqual(true);
		});

		it('should stay open on escape key press when no-dismiss-on-esc is implicitly set via non-dismissible', async function () {
			element.nonDismissible = true;
			await showModalDialog();
			await triggerEscapeKey();
			expect(element.open).toEqual(true);
		});

		it('should fire cancel event on escape key press', async function () {
			const cancelSpy = vi.fn();
			element.addEventListener('cancel', cancelSpy);
			await showModalDialog();
			await triggerEscapeKey();
			expect(cancelSpy).toHaveBeenCalledTimes(1);
		});

		it('should remain open on escape key when not modal', async function () {
			await showDialog();
			await triggerEscapeKey();
			expect(element.open).toEqual(true);
		});

		it('should stop propgation on escape key', async () => {
			await showModalDialog();
			const spy = vi.fn();
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
			vi.spyOn(event, 'preventDefault');
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(1);
		});

		it('should enable default if key is not Escape', async () => {
			await showModalDialog();
			const event = new KeyboardEvent('keydown', { key: ' ' });
			vi.spyOn(event, 'preventDefault');
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

		describe('dismiss-button-aria-label', () => {
			it('should set "aria-label" on the dismiss button', async () => {
				const labelId = 'label';
				element.setAttribute('dismiss-button-aria-label', labelId);
				await elementUpdated(element);
				expect(getDismissButton().getAttribute('aria-label')).toBe(labelId);
			});
		});

		it('should set localised "aria-label" on the dismiss button', async () => {
			expect(getDismissButton().getAttribute('aria-label')).toBe('Close');
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => dialogEl,
			['ariaLabel']
		);
	});
});
