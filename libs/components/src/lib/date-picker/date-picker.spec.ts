import {
	createFormHTML,
	elementUpdated,
	fixture,
	getResolvedTextContent,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import enUS from '../../locales/en-US';
import deDE from '../../locales/de-DE';
import { setLocale } from '../../shared/localization';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import { pickerFieldSpec } from '../../shared/picker-field/picker-field.spec';
import { calendarPickerSpec } from '../../shared/picker-field/mixins/calendar-picker.spec';
import { DatePicker } from './date-picker';
import '.';

const cleanWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

const COMPONENT_TAG = 'vwc-date-picker';

describe('vwc-date-picker', () => {
	let element: DatePicker;
	let textField: TextField;
	let pickerButton: Button;
	let titleAction: HTMLButtonElement;

	const getDateButton = (date: string) =>
		element.shadowRoot!.querySelector(
			`[data-date="${date}"]`
		) as HTMLButtonElement;

	const getButtonByLabel = (label: string) =>
		(element.shadowRoot!.querySelector(`[aria-label="${label}"]`) ??
			element.shadowRoot!.querySelector(`[label="${label}"]`)) as Button;

	const getDialogTitle = () => titleAction.textContent!.trim();

	function typeIntoTextField(text: string) {
		textField.value = text;
		textField.dispatchEvent(new InputEvent('input'));
		textField.dispatchEvent(new InputEvent('change'));
		textField.dispatchEvent(new Event('blur'));
		element.dispatchEvent(new Event('focusout'));
	}

	async function openPopup() {
		pickerButton.click();
		await elementUpdated(element);
	}

	async function openMonthView() {
		titleAction.click();
		await elementUpdated(element);
	}

	beforeAll(() => {
		// Use a fixed date of 2023-08-10 for all tests
		vi.useFakeTimers({
			now: new Date(2023, 7, 10),
			toFake: ['Date'],
		});
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DatePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		pickerButton = element.shadowRoot!.querySelector(
			'#picker-button'
		) as Button;
		titleAction = element.shadowRoot!.querySelector(
			'.title-action'
		) as HTMLButtonElement;

		setupDelegatesFocusPolyfill(element);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-date-picker', async () => {
			expect(element).toBeInstanceOf(DatePicker);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('picker field', () => {
		pickerFieldSpec(
			COMPONENT_TAG,
			(shadowRoot) => {
				return {
					firstFocusable: shadowRoot.querySelector(
						'vwc-button[aria-label="Previous year"]'
					)!,
					lastFocusable: shadowRoot.querySelector('vwc-button[label="OK"]')!,
				};
			},
			'2020-02-02'
		);
	});

	describe('calendar picker', () => {
		calendarPickerSpec(
			COMPONENT_TAG,
			(element: DatePicker, min: string) => {
				element.min = min;
			},
			(element: DatePicker, max: string) => {
				element.max = max;
			}
		);
	});

	describe('value', () => {
		it('should display a formatted version of value in the text field', async () => {
			element.value = '2021-01-21';
			await elementUpdated(element);

			expect(textField.value).toBe('01/21/2021');
		});

		it('should ignore an invalid value', async () => {
			element.value = 'x';
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});

		it('should update value when a user enters a valid date into the text field', async () => {
			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(element.value).toBe('2021-01-21');
		});

		it('should keep an empty value when a user enters a invalid date into the text field', async () => {
			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
		});

		it('should clear the value but keep invalid input when a user enters a invalid date into the text field', async () => {
			element.value = '2021-01-21';

			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
			expect(textField.value).toBe('x');
		});

		it('should clear the text field when value is set to empty string', async () => {
			element.value = '2021-01-21';
			await elementUpdated(element);

			element.value = '';
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});
	});

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when a user enters a valid date into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user clicks on a date in the calendar', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			getDateButton('2023-08-01').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('text field', () => {
		it('should show an invalid date error when an invalid date is entered', async () => {
			typeIntoTextField('invalid date');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid date.');
		});

		it('should clear the invalid date error when a valid date is entered', async () => {
			typeIntoTextField('invalid date');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
		});

		it('should clear the value when an empty string is entered', async () => {
			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			typeIntoTextField('');
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable date', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = vi.fn();
			element.min = '2023-12-31';
			element.value = '2023-01-01';
			await openPopup();

			textField.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable month', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = vi.fn();
			element.min = '2024-01-01';
			element.value = '2023-01-01';
			await openPopup();
			await openMonthView();

			textField.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('picker button', () => {
		it('should have an icon of "calendar-line"', async () => {
			expect(pickerButton.icon).toBe('calendar-line');
		});

		it('should have an aria-label of "Choose date" when no date is selected', async () => {
			expect(pickerButton.getAttribute('aria-label')).toBe('Choose date');
		});

		it('should have an aria-label of "Change date, DATE" when a date is selected', async () => {
			element.value = '2021-01-01';
			await elementUpdated(element);

			expect(pickerButton.getAttribute('aria-label')).toBe(
				'Change date, 01/01/2021'
			);
		});
	});

	describe('date picker', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should update current month to the month of the selected date when the user enters a new date', async () => {
			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2021');
		});

		it('should highlight the selected date', async () => {
			element.value = '2023-08-20';
			await elementUpdated(element);

			expect(getDateButton('2023-08-20').classList).toContain('selected');
		});

		it('should announce a selected date with the selected label', async () => {
			element.value = '2023-08-15';
			await elementUpdated(element);

			expect(
				cleanWhitespace(getResolvedTextContent(getDateButton('2023-08-15')))
			).toBe('15 selected');
		});

		it('should announce both today and selected labels when today is selected', async () => {
			element.value = '2023-08-10';
			await elementUpdated(element);

			expect(
				cleanWhitespace(getResolvedTextContent(getDateButton('2023-08-10')))
			).toBe('10 today selected');
		});

		it('should select a date when clicking on a date', async () => {
			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.value).toBe('2023-08-01');
		});
	});

	describe('dialog', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should have an accessible name of "Choose date"', () => {
			expect(
				element.shadowRoot!.querySelector('.dialog')!.getAttribute('aria-label')
			).toBe('Choose date');
		});

		it('should clear the date when clicking the clear button', async () => {
			element.value = '2023-08-01';

			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(element.value).toBeFalsy();
		});
	});

	describe('form association', () => {
		const fieldValue = '2020-02-02';
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

		it('should reset the value of the custom element to default on form reset', async () => {
			const { form: formElement, element } = createFormHTML<TextField>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			element.value = '2012-12-12';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue);
		});
	});

	describe('localization', () => {
		afterEach(() => {
			setLocale(enUS);
		});

		it('should format the date according to the locale', async () => {
			setLocale(deDE);

			element.value = '2021-01-21';
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021');
		});

		it('should update the text field when the locale changes', async () => {
			element.value = '2021-01-21';
			await elementUpdated(element);

			setLocale(deDE);
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021');
		});
	});
});
