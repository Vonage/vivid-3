import {
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import { setLocale } from '../../shared/localization';
import { Popup } from '../popup/popup.ts';
import { Button } from '../button/button.ts';
import { TextField } from '../text-field/text-field.ts';
import enGB from '../../locales/en-GB.ts';
import enUS from '../../locales/en-US.ts';
import { TimePicker } from './time-picker';
import type { InlineTimePicker } from './inline-time-picker/inline-time-picker';
import '.';

const COMPONENT_TAG = 'vwc-time-picker';

const getActiveElementPiercingShadowRoot = () => {
	let element = document.activeElement;
	while (element?.shadowRoot) {
		element = element.shadowRoot.activeElement;
	}
	return element;
};

describe('vwc-time-picker', () => {
	let element: TimePicker;
	let textField: TextField;
	let clockButton: Button;
	let popup: Popup;
	let inlineTimePicker: InlineTimePicker;

	function typeIntoTextField(text: string) {
		textField.currentValue = text;
		textField.dispatchEvent(new InputEvent('input'));
		textField.dispatchEvent(new InputEvent('change'));
		textField.dispatchEvent(new Event('blur'));
		element.dispatchEvent(new Event('focusout'));
	}

	async function openPopup() {
		clockButton.click();
		await elementUpdated(element);
	}

	const getButtonByLabel = (label: string) =>
		(element.shadowRoot!.querySelector(`[aria-label="${label}"]`) ??
			element.shadowRoot!.querySelector(`[label="${label}"]`)) as Button;

	const pressKey = (key: string, options: KeyboardEventInit = {}) => {
		getActiveElementPiercingShadowRoot()!.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				bubbles: true,
				composed: true,
				...options,
			})
		);
	};

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TimePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		clockButton = element.shadowRoot!.querySelector('#clock-button') as Button;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		inlineTimePicker = element.shadowRoot!.querySelector(
			'#inline-time-picker'
		) as InlineTimePicker;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-time-picker', async () => {
			expect(element).toBeInstanceOf(TimePicker);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('label', () => {
		it('should forward label to the text field', async () => {
			element.label = 'label';
			await elementUpdated(element);

			expect(textField.label).toBe('label');
		});
	});

	describe('helperText', () => {
		it('should forward helperText to the text field', async () => {
			element.helperText = 'helperText';
			await elementUpdated(element);

			expect(textField.helperText).toBe('helperText');
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

	describe('errorText', () => {
		it('should forward errorText to the text field', async () => {
			element.errorText = 'errorText';
			await elementUpdated(element);

			expect(textField.errorText).toBe('errorText');
		});

		it('should have a higher priority than an internal validation error', async () => {
			element.errorText = 'errorText';
			await elementUpdated(element);

			typeIntoTextField('x');

			expect(textField.errorText).toBe('errorText');
		});
	});

	describe('value', () => {
		it('should display a formatted version of value in the text field', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('01:45 PM');
		});

		it('should ignore an invalid value', async () => {
			element.value = 'x';
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});

		it('should update value when a user enters a valid date into the text field', async () => {
			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			expect(element.value).toBe('13:45:00');
		});

		it('should have an empty value when a user enters a invalid date into the text field', async () => {
			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
		});

		it('should clear the text field when value is set to empty string', async () => {
			element.value = '12:34:56';
			await elementUpdated(element);

			element.value = '';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('');
		});

		it('should reflect on the inline-time-picker', async () => {
			element.value = '12:34:56';
			await elementUpdated(element);
			expect(inlineTimePicker.value).toBe('12:34:56');
		});

		it('should reflect as undefined on the inline-time-picker when empty', async () => {
			element.value = '';
			await elementUpdated(element);
			expect(inlineTimePicker.value).toBe(undefined);
		});
	});

	describe('helper-text slot', () => {
		it('should forward helper-text slot to the text field', async () => {
			const slotted = document.createElement('div');
			slotted.slot = 'helper-text';
			slotted.innerHTML = 'content';
			element.appendChild(slotted);
			await elementUpdated(element);

			const textFieldSlot = textField.shadowRoot?.querySelector(
				'slot[name=helper-text]'
			) as HTMLSlotElement;
			const timePickerSlot =
				textFieldSlot.assignedNodes()[0] as HTMLSlotElement;
			expect(timePickerSlot.assignedNodes()).toEqual([slotted]);
		});
	});

	describe('clock', () => {
		afterEach(() => {
			setLocale(enUS);
		});

		it('should reflect the clock on the inline-time-picker', async () => {
			element.clock = '24h';
			await elementUpdated(element);
			expect(inlineTimePicker.clock).toBe('24h');
		});

		it.each([
			[enUS, 'hh:mm aa'],
			[enGB, 'hh:mm'],
		])(
			'should default to the default clock of the locale',
			async (locale, placeholder) => {
				setLocale(locale);
				await elementUpdated(element);

				expect(textField.placeholder).toBe(placeholder);
			}
		);

		describe('12h', () => {
			beforeEach(async () => {
				element.clock = '12h';
				await elementUpdated(element);
			});

			it('should have a placeholder of "hh:mm aa"', async () => {
				expect(textField.placeholder).toBe('hh:mm aa');
			});

			it('should display a formatted version of value in the text field', async () => {
				element.value = '13:45:00';
				await elementUpdated(element);

				expect(textField.currentValue).toBe('01:45 PM');
			});
		});

		describe('24h', () => {
			beforeEach(async () => {
				element.clock = '24h';
				await elementUpdated(element);
			});

			it('should have a placeholder of "hh:mm"', async () => {
				expect(textField.placeholder).toBe('hh:mm');
			});

			it('should display a formatted version of value in the text field', async () => {
				element.value = '13:45:00';
				await elementUpdated(element);

				expect(textField.currentValue).toBe('13:45');
			});
		});

		it('should update the text field when the clock is changed', async () => {
			element.clock = '12h';
			element.value = '13:45:00';
			await elementUpdated(element);

			element.clock = '24h';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('13:45');
		});

		it('should update the text field when the locale is changed', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			setLocale(enGB);
			await elementUpdated(element);

			expect(textField.currentValue).toBe('13:45');
		});
	});

	describe('min', () => {
		it('should reflect on the inline-time-picker', async () => {
			element.min = '12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe('12:00:00');
		});

		it('should reflect as undefined on the inline-time-picker when not set', async () => {
			element.min = '';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe(undefined);
		});
	});

	describe('max', () => {
		it('should reflect max on the inline-time-picker', async () => {
			element.min = '12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe('12:00:00');
		});

		it('should reflect as undefined on the inline-time-picker when not set', async () => {
			element.min = '';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe(undefined);
		});
	});

	describe('minutesStep', () => {
		it('should reflect on the inline-time-picker', async () => {
			element.minutesStep = 15;
			await elementUpdated(element);
			expect(inlineTimePicker.minutesStep).toBe(15);
		});

		it('should default to 1 on the inline-time-picker when not set', async () => {
			element.minutesStep = null;
			await elementUpdated(element);
			expect(inlineTimePicker.minutesStep).toBe(1);
		});
	});

	describe('secondsStep', () => {
		it('should reflect secondsStep on the inline-time-picker', async () => {
			element.secondsStep = 15;
			await elementUpdated(element);
			expect(inlineTimePicker.secondsStep).toBe(15);
		});

		it('should reflect as undefined on the inline-time-picker when not set', async () => {
			element.secondsStep = null;
			await elementUpdated(element);
			expect(inlineTimePicker.secondsStep).toBe(undefined);
		});
	});

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when a user enters a valid date into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when time is changed in the inline-time-picker', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			inlineTimePicker.dispatchEvent(
				new CustomEvent('change', { detail: '12:34:56', bubbles: false })
			);

			expect(spy).toHaveBeenCalledTimes(1);
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

	describe('text field', () => {
		it.each([
			{ clock: '12h', secondsStep: null, placeholder: 'hh:mm aa' },
			{ clock: '12h', secondsStep: 1, placeholder: 'hh:mm:ss aa' },
			{ clock: '24h', secondsStep: null, placeholder: 'hh:mm' },
			{ clock: '24h', secondsStep: 1, placeholder: 'hh:mm:ss' },
		] as const)(
			'should have a placeholder of "$placeholder" when clock is $clock and secondsStep is $secondsStep',
			async ({ clock, secondsStep, placeholder }) => {
				element.clock = clock;
				element.secondsStep = secondsStep;
				expect(element.secondsStep).toBe(secondsStep);
				await elementUpdated(element);

				expect(textField.placeholder).toBe(placeholder);
			}
		);

		it('should show an invalid date error when an invalid time is entered', async () => {
			typeIntoTextField('invalid time');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid time.');
		});

		it('should clear the invalid date error when a valid time is entered', async () => {
			typeIntoTextField('invalid time');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
		});

		it('should clear the value when an empty string is entered', async () => {
			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			typeIntoTextField('');
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});
	});

	describe('clock button', () => {
		it('should have an aria-label of "Choose time" when no time is selected', async () => {
			expect(clockButton.getAttribute('aria-label')).toBe('Choose time');
		});

		it('should have an aria-label of "Change time, TIME" when a time is selected', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			expect(clockButton.getAttribute('aria-label')).toBe(
				'Change time, 01:45 PM'
			);
		});

		it('should open the popup when pressed', async () => {
			clockButton.click();
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});

		it('should scroll selected options to the top if a time is selected', async () => {
			element.secondsStep = 1;
			element.value = '12:34:56';
			await elementUpdated(element);
			inlineTimePicker.scrollSelectedOptionsToTop = vi.fn();

			clockButton.click();
			await elementUpdated(element);

			expect(inlineTimePicker.scrollSelectedOptionsToTop).toHaveBeenCalledTimes(
				1
			);
		});

		it('should close the popup when pressed and it is already open', async () => {
			await openPopup();

			clockButton.click();
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should be disabled when the date picker is disabled', async () => {
			element.disabled = true;
			await elementUpdated(element);

			expect(clockButton.disabled).toBe(true);
		});

		it('should be disabled when the date picker is readonly', async () => {
			element.readOnly = true;
			await elementUpdated(element);

			expect(clockButton.disabled).toBe(true);
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

		it('should allow propagation on escape key if closed', async () => {
			const parentSpy = vi.fn();
			element.parentElement!.addEventListener('keydown', parentSpy);
			textField.focus();

			pressKey('Escape');

			expect(parentSpy.mock.calls.length).toBe(1);
		});

		it('should stop propagation on escape key', async () => {
			await openPopup();

			const parentSpy = vi.fn();
			element.parentElement!.addEventListener('keydown', parentSpy);
			pressKey('Escape');

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

		it('should close when clicking outside the time-picker', async () => {
			await openPopup();

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should close when an option in the last picker column is selected', async () => {
			inlineTimePicker.dispatchEvent(new CustomEvent('last-column-selected'));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});
	});

	describe('trapped focus', () => {
		let firstFocusable: HTMLElement;
		let lastFocusable: HTMLElement;

		beforeEach(async () => {
			await openPopup();
			const focusable: NodeListOf<HTMLElement> =
				element.shadowRoot!.querySelectorAll(
					'#inline-time-picker, .dialog vwc-button'
				);
			firstFocusable = focusable[0];
			lastFocusable = focusable[focusable.length - 1];
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

			const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
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

		it('should clear the time and close popup when clicking the clear button', async () => {
			element.value = '12:34:56';

			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(element.value).toBeFalsy();
			expect(popup.open).toBe(false);
		});
	});

	describe('form association', () => {
		const fieldValue = '12:34:56';
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
			const { form: formElement } = createFormHTML<TimePicker>({
				componentTagName: COMPONENT_TAG,
				fieldName,
				fieldValue,
				formId,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should attach to form when given form id', async () => {
			const { otherForm } = createFormHTML<TimePicker>({
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
});
