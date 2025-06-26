import {
	createFormHTML,
	elementUpdated,
	fixture,
	getActiveElementPiercingShadowRoot,
	getBaseElement,
	listenToFormSubmission,
	setupDelegatesFocusPolyfill,
} from '@repo/shared';
import type { TextField } from '../../lib/text-field/text-field';
import type { Button } from '../../lib/button/button';
import type { Popup } from '../../lib/popup/popup';
import {
	itShouldDisplayErrorTextFeedback,
	itShouldDisplayHelperTextFeedback,
	itShouldDisplayValidationErrorFeedback,
} from '../feedback/should-display-feedback.spec';
import type { PickerField } from './picker-field';

/**
 * Common tests for picker fields components.
 */
export const pickerFieldSpec = (
	COMPONENT_TAG: string,
	getFocusableElements: (shadowRoot: ShadowRoot) => {
		firstFocusable: HTMLElement;
		lastFocusable: HTMLElement;
	},
	exampleValue: string
) => {
	let element: PickerField;
	let textField: TextField;
	let pickerButton: Button;
	let popup: Popup;

	const pressKey = (
		key: string,
		options: KeyboardEventInit = {},
		triggerEl = false
	) => {
		const triggeredElement = triggerEl
			? getBaseElement(element)
			: element.shadowRoot!.activeElement;
		triggeredElement!.dispatchEvent(
			new KeyboardEvent('keydown', { key, bubbles: true, ...options })
		);
	};

	const getButtonByLabel = (label: string) =>
		(element.shadowRoot!.querySelector(`[aria-label="${label}"]`) ??
			element.shadowRoot!.querySelector(`[label="${label}"]`)) as Button;

	async function openPopup() {
		pickerButton.click();
		await elementUpdated(element);
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as PickerField;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		pickerButton = element.shadowRoot!.querySelector(
			'#picker-button'
		) as Button;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		setupDelegatesFocusPolyfill(element);
	});

	describe('label', () => {
		it('should forward label to the text field', async () => {
			element.label = 'label';
			await elementUpdated(element);

			expect(textField.label).toBe('label');
		});
	});

	describe('disabled', () => {
		it('should forward disabled to the text field', async () => {
			element.disabled = true;
			await elementUpdated(element);

			expect(textField.disabled).toBe(true);
		});
	});

	describe('readOnly', () => {
		it('should forward readOnly to the text field', async () => {
			element.readOnly = true;
			await elementUpdated(element);

			expect(textField.readOnly).toBe(true);
		});
	});

	describe.each([
		['focus', 'focusin'],
		['blur', 'focusout'],
	])('%s event', (eventName, sourceEventName) => {
		it(`should emit a '${eventName}' event on '${sourceEventName}'`, async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			element.dispatchEvent(new Event(sourceEventName));

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('picker button', () => {
		it('should open the popup when pressed', async () => {
			pickerButton.click();
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});

		it('should close the popup when pressed and it is already open', async () => {
			await openPopup();

			pickerButton.click();
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should be disabled when the picker is disabled', async () => {
			element.disabled = true;
			await elementUpdated(element);

			expect(pickerButton.disabled).toBe(true);
		});

		it('should be disabled when the picker is readonly', async () => {
			element.readOnly = true;
			await elementUpdated(element);

			expect(pickerButton.disabled).toBe(true);
		});
	});

	describe('popup', () => {
		let eventSpy: any;
		let spy: any;

		beforeEach(() => {
			spy = vi.fn();
			getBaseElement(element).addEventListener('keydown', spy);
			eventSpy = vi.spyOn(KeyboardEvent.prototype, 'preventDefault');
		});

		afterEach(() => {
			eventSpy.mockRestore();
		});

		it('should close when pressing ESC', async () => {
			await openPopup();

			pressKey('Escape');
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should close when clicking outside the element', async () => {
			await openPopup();

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should allow propagation on escape key if closed', async () => {
			const parentSpy = vi.fn();
			element.parentElement!.addEventListener('keydown', parentSpy);
			pressKey('Escape', { composed: true }, true);
			await elementUpdated(element);
			expect(parentSpy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key', async () => {
			await openPopup();

			const parentSpy = vi.fn();
			element.parentElement!.addEventListener('keydown', parentSpy);
			pressKey('Escape', { composed: true });
			await elementUpdated(element);
			expect(parentSpy.mock.calls.length).toBe(0);
		});

		it('should prevent default if Escape was pressed', async () => {
			await openPopup();

			pressKey('Escape');
			await elementUpdated(element);
			const event = spy.mock.calls[0][0];
			expect(event.preventDefault).toBeCalledTimes(1);
		});

		it('should enable default if key is not Escape', async () => {
			await openPopup();

			pressKey(' ');
			await elementUpdated(element);
			const event = spy.mock.calls[0][0];
			expect(event.preventDefault).toBeCalledTimes(0);
		});
	});

	describe('trapped focus', () => {
		let firstFocusable: HTMLElement;
		let lastFocusable: HTMLElement;

		beforeEach(async () => {
			await openPopup();
			({ firstFocusable, lastFocusable } = getFocusableElements(
				element.shadowRoot!
			));
		});

		it('should move focus to first focusable element when pressing tab on the last focusable element', async () => {
			lastFocusable.focus();

			pressKey('Tab');

			expect(element.shadowRoot!.activeElement).toBe(firstFocusable);
		});

		it('should move focus to last focusable element when pressing shift + tab on the first focusable element', async () => {
			firstFocusable.focus();

			pressKey('Tab', { shiftKey: true });

			expect(element.shadowRoot!.activeElement).toBe(lastFocusable);
		});

		it('should keep default of unrelated keydown event', async () => {
			firstFocusable.focus();

			const event = new KeyboardEvent('keydown', {
				key: 'a',
				bubbles: true,
				composed: true,
			});
			event.preventDefault = vi.fn();
			getActiveElementPiercingShadowRoot()?.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('dialog footer', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should close the dialog when clicking the ok button', async () => {
			getButtonByLabel('OK').click();
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should not close the dialog when clicking the clear button', async () => {
			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});

		it('should fire a clear-click event when clear button is clicked', async () => {
			const spy = vi.fn();
			element.addEventListener('clear-click', spy);
			getButtonByLabel('Clear').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('form association', () => {
		const fieldValue = exampleValue;
		const formId = 'test-form-id';
		const fieldName = 'test-field';
		let formWrapper: HTMLElement;

		beforeEach(() => {
			formWrapper = document.createElement('div');
			document.body.appendChild(formWrapper);
		});

		afterEach(() => {
			formWrapper.remove();
		});

		it('should attach to closest form', async () => {
			const { form: formElement } = createFormHTML<PickerField>({
				componentTagName: COMPONENT_TAG,
				fieldName,
				fieldValue,
				formId,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			expect((await submitPromise).has(fieldName)).toBe(true);
		});

		it('should attach to form when given form id', async () => {
			const { otherForm } = createFormHTML<PickerField>({
				fieldName,
				fieldValue,
				formId,
				otherFormId: 'otherFormId',
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(otherForm);
			otherForm.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});
	});

	describe('feedback messages', () => {
		itShouldDisplayHelperTextFeedback(
			() => element,
			() => textField.querySelector('input[slot=_control]')!
		);
		itShouldDisplayErrorTextFeedback(
			() => element as any,
			() => textField.querySelector('input[slot=_control]')!
		);
		itShouldDisplayValidationErrorFeedback(
			() => element as any,
			() => textField.querySelector('input[slot=_control]')!
		);
	});
};
