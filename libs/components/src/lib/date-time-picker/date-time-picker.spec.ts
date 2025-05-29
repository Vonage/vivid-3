import { createFormHTML, elementUpdated, fixture } from '@vivid-nx/shared';
import enGB from '../../locales/en-GB';
import enUS from '../../locales/en-US';
import deDE from '../../locales/de-DE';
import { setLocale } from '../../shared/localization';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import { pickerFieldSpec } from '../../shared/picker-field/picker-field.spec';
import { calendarPickerSpec } from '../../shared/picker-field/mixins/calendar-picker.spec';
import type { InlineTimePicker } from '../../shared/picker-field/mixins/inline-time-picker/inline-time-picker';
import type { DateStr } from '../../shared/datetime/dateStr';
import { DateTimePicker } from './date-time-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-time-picker';

describe('vwc-date-time-picker', () => {
	let element: DateTimePicker;
	let textField: TextField;
	let pickerButton: Button;
	let titleAction: HTMLButtonElement;
	let inlineTimePicker: InlineTimePicker;

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

	async function areDatesDisabled(predicate: (date: DateStr) => boolean) {
		await openPopup();

		const calendarButtons = Array.from(
			element.shadowRoot!.querySelectorAll('[data-date]')
		) as HTMLButtonElement[];
		return calendarButtons.every(
			(button) => predicate(button.dataset.date!) === button.disabled
		);
	}

	async function calendarUsesMinDate(minDate: DateStr) {
		element.value = `${minDate}T00:00:00`; // open month of min date
		await elementUpdated(element);
		return areDatesDisabled((date) => date < minDate);
	}

	async function calendarUsesMaxDate(maxDate: DateStr) {
		element.value = `${maxDate}T00:00:00`; // open month of max date
		await elementUpdated(element);
		return areDatesDisabled((date) => date > maxDate);
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
		)) as DateTimePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		pickerButton = element.shadowRoot!.querySelector(
			'#picker-button'
		) as Button;
		titleAction = element.shadowRoot!.querySelector(
			'.title-action'
		) as HTMLButtonElement;
		inlineTimePicker = element.shadowRoot!.querySelector(
			'#inline-time-picker'
		) as InlineTimePicker;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-date-picker', async () => {
			expect(element).toBeInstanceOf(DateTimePicker);
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
			'2020-02-02T02:02:02'
		);
	});

	describe('calendar picker', () => {
		calendarPickerSpec(
			COMPONENT_TAG,
			(element: DateTimePicker, min: string) => {
				element.minDate = min;
			},
			(element: DateTimePicker, max: string) => {
				element.maxDate = max;
			}
		);
	});

	describe('value', () => {
		it('should display a formatted version of value in the text field', async () => {
			element.value = '2021-01-21T12:34:56';
			await elementUpdated(element);

			expect(textField.value).toBe('01/21/2021 12:34 PM');
		});

		it('should ignore an invalid value', async () => {
			element.value = 'x';
			await elementUpdated(element);

			expect(textField.value).toBe('');
		});

		it('should update value when a user enters a valid date time into the text field', async () => {
			typeIntoTextField('01/21/2021 12:34:56 PM');
			await elementUpdated(element);

			expect(element.value).toBe('2021-01-21T12:34:56');
		});

		it('should keep an empty value when a user enters a invalid date time into the text field', async () => {
			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
		});

		it('should clear the value but keep invalid input when a user enters a invalid date time into the text field', async () => {
			element.value = '2021-01-21T12:34:56';

			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
			expect(textField.value).toBe('x');
		});

		it('should clear the text field when value is set to empty string', async () => {
			element.value = '2021-01-21T12:34:56';
			await elementUpdated(element);

			element.value = '';
			await elementUpdated(element);

			expect(textField.value).toBe('');
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
			[enUS, 'MM/DD/YYYY hh:mm aa'],
			[enGB, 'DD/MM/YYYY hh:mm'],
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

			it('should have a time placeholder of "hh:mm aa"', async () => {
				expect(textField.placeholder).toBe('MM/DD/YYYY hh:mm aa');
			});

			it('should display a formatted version of value in the text field', async () => {
				element.value = '2020-02-20T13:45:00';
				await elementUpdated(element);

				expect(textField.value).toBe('02/20/2020 01:45 PM');
			});
		});

		describe('24h', () => {
			beforeEach(async () => {
				element.clock = '24h';
				await elementUpdated(element);
			});

			it('should have a time placeholder of "hh:mm"', async () => {
				expect(textField.placeholder).toBe('MM/DD/YYYY hh:mm');
			});

			it('should display a formatted version of value in the text field', async () => {
				element.value = '2020-02-20T13:45:00';
				await elementUpdated(element);

				expect(textField.value).toBe('02/20/2020 13:45');
			});
		});

		it('should update the text field when the clock is changed', async () => {
			element.clock = '12h';
			element.value = '2020-02-20T13:45:00';
			await elementUpdated(element);

			element.clock = '24h';
			await elementUpdated(element);

			expect(textField.value).toBe('02/20/2020 13:45');
		});
	});

	describe('min', () => {
		it('should be used by the calendar', async () => {
			element.min = '2023-08-15T00:00:00';
			expect(await calendarUsesMinDate('2023-08-15')).toBe(true);
		});

		it('should reflect as undefined on the inline-time-picker when not set', async () => {
			element.min = '';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe(undefined);
		});

		it('should reflect the time on the inline-time-picker if value has the same date as min', async () => {
			element.min = '2020-02-02T12:00:00';
			element.value = '2020-02-02T15:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe('12:00:00');
		});

		it('should not reflect the time on the inline-time-picker if value has a different date then min', async () => {
			element.min = '2020-02-02T12:00:00';
			element.value = '2020-02-03T15:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe(undefined);
		});

		it('should not reflect the time on the inline-time-picker if value is not set', async () => {
			element.min = '2020-02-02T12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe(undefined);
		});
	});

	describe('minTime', () => {
		it('should reflect on the inline-time-picker', async () => {
			element.minTime = '12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe('12:00:00');
		});

		it('should override time from min', async () => {
			element.min = '2020-02-02T12:00:00';
			element.value = '2020-02-02T15:00:00';
			element.minTime = '13:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.min).toBe('13:00:00');
		});
	});

	describe('minDate', () => {
		it('should be used by the calendar', async () => {
			element.minDate = '2023-08-15';
			expect(await calendarUsesMinDate('2023-08-15')).toBe(true);
		});

		it('should override date from min', async () => {
			element.min = '2023-08-01T00:00:00';
			element.minDate = '2023-08-15';
			expect(await calendarUsesMinDate('2023-08-15')).toBe(true);
		});
	});

	describe('max', () => {
		it('should be used by the calendar', async () => {
			element.max = '2023-08-15T00:00:00';
			expect(await calendarUsesMaxDate('2023-08-15')).toBe(true);
		});

		it('should reflect as undefined on the inline-time-picker when not set', async () => {
			element.max = '';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe(undefined);
		});

		it('should reflect the time on the inline-time-picker if value has the same date as min', async () => {
			element.max = '2020-02-02T20:00:00';
			element.value = '2020-02-02T15:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe('20:00:00');
		});

		it('should not reflect the time on the inline-time-picker if value has a different date then min', async () => {
			element.max = '2020-02-02T20:00:00';
			element.value = '2020-02-01T15:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe(undefined);
		});

		it('should not reflect the time on the inline-time-picker if value is not set', async () => {
			element.max = '2020-02-02T12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe(undefined);
		});
	});

	describe('maxTime', () => {
		it('should reflect on the inline-time-picker', async () => {
			element.maxTime = '12:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe('12:00:00');
		});

		it('should override time from min', async () => {
			element.max = '2020-02-02T20:00:00';
			element.value = '2020-02-02T15:00:00';
			element.maxTime = '18:00:00';
			await elementUpdated(element);
			expect(inlineTimePicker.max).toBe('18:00:00');
		});
	});

	describe('maxDate', () => {
		it('should be used by the calendar', async () => {
			element.maxDate = '2023-08-15';
			expect(await calendarUsesMaxDate('2023-08-15')).toBe(true);
		});

		it('should override date from max', async () => {
			element.max = '2023-08-30T00:00:00';
			element.maxDate = '2023-08-15';
			expect(await calendarUsesMaxDate('2023-08-15')).toBe(true);
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
		it('should be fired when a user enters a valid date time into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01/21/2021 12:34:56 PM');
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

	describe('text field', () => {
		it('should clear the invalid value error when a valid date time is entered', async () => {
			typeIntoTextField('invalid');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			typeIntoTextField('01/21/2021 12:34:56 PM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
		});

		it('should clear the value when an empty string is entered', async () => {
			typeIntoTextField('01/21/2021 12:34:56 PM');
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
		it('should have an icon of "calendar-clock-line"', async () => {
			expect(pickerButton.icon).toBe('calendar-clock-line');
		});

		it('should have an aria-label of "Choose date and time" when no date time is selected', async () => {
			expect(pickerButton.getAttribute('aria-label')).toBe(
				'Choose date and time'
			);
		});

		it('should have an aria-label of "Change date and time, DATETIME" when a date time is selected', async () => {
			element.value = '2021-01-01T12:34:56';
			await elementUpdated(element);

			expect(pickerButton.getAttribute('aria-label')).toBe(
				'Change date and time, 01/01/2021 12:34 PM'
			);
		});
	});

	describe('date picker', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should update current month to the month of the selected date time when the user enters a new date time', async () => {
			typeIntoTextField('01/21/2021 12:34 AM');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2021');
		});

		it('should highlight the selected date', async () => {
			element.value = '2023-08-20T12:34:56';
			await elementUpdated(element);

			expect(getDateButton('2023-08-20').classList).toContain('selected');
		});

		it('should set value and initialize time to 00:00:00 when clicking on a date and there is no current value', async () => {
			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.value).toBe('2023-08-01T00:00:00');
		});

		it('should update date of the current value when clicking on a date', async () => {
			element.value = '2023-08-20T12:34:56';
			await elementUpdated(element);

			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.value).toBe('2023-08-01T12:34:56');
		});
	});

	describe('time picker', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should set value and initialize date to the current date when time is changed in the inline-time-picker and there is no current value', async () => {
			inlineTimePicker.dispatchEvent(
				new CustomEvent('change', { detail: '12:34:56', bubbles: false })
			);

			expect(element.value).toBe('2023-08-10T12:34:56');
		});

		it('should update time of the current value when time is changed in the inline-time-picker', async () => {
			element.value = '2023-08-01T11:11:11';
			await elementUpdated(element);

			inlineTimePicker.dispatchEvent(
				new CustomEvent('change', { detail: '22:22:22', bubbles: false })
			);

			expect(element.value).toBe('2023-08-01T22:22:22');
		});
	});

	describe('dialog', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should have an accessible name of "Choose date and time"', () => {
			expect(
				element.shadowRoot!.querySelector('.dialog')!.getAttribute('aria-label')
			).toBe('Choose date and time');
		});

		it('should clear the value when clicking the clear button', async () => {
			element.value = '2023-08-01T12:34:56';

			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(element.value).toBeFalsy();
		});
	});

	describe('validation', () => {
		it('should show an invalid date time error when an invalid value is entered', async () => {
			typeIntoTextField('invalid');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid date and time.');
			expect(element.validity.valid).toBe(false);
		});

		it('should show an min date error when a date earlier than minDate is entered', async () => {
			element.minDate = '2023-08-01';
			typeIntoTextField('07/01/2023 12:00:00 PM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Date must be 08/01/2023 or later.');
			expect(element.validity.valid).toBe(false);
		});

		it('should show an max date error when a date later than maxDate is entered', async () => {
			element.maxDate = '2023-08-01';
			typeIntoTextField('09/01/2023 12:00:00 PM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Date must be 08/01/2023 or earlier.');
			expect(element.validity.valid).toBe(false);
		});

		it('should show an min time error when a time earlier than minTime is entered', async () => {
			element.minTime = '10:00:00';
			typeIntoTextField('07/01/2023 09:00:00 AM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Time must be 10:00 AM or later.');
			expect(element.validity.valid).toBe(false);
		});

		it('should show an max time error when a time later than maxTime is entered', async () => {
			element.maxTime = '20:00:00';
			typeIntoTextField('07/01/2023 09:00:00 PM');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Time must be 08:00 PM or earlier.');
			expect(element.validity.valid).toBe(false);
		});
	});

	describe('form association', () => {
		const fieldValue = '2020-02-02T12:34:56';
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

			element.value = '2012-12-12T12:34:56';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue);
		});
	});

	describe('localization', () => {
		afterEach(() => {
			setLocale(enUS);
		});

		it('should format the date and time according to the locale', async () => {
			setLocale(deDE);

			element.value = '2021-01-21T13:13:13';
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021 13:13');
		});

		it('should update the text field when the locale changes', async () => {
			element.value = '2021-01-21T13:13:13';
			await elementUpdated(element);

			setLocale(deDE);
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021 13:13');
		});
	});
});
