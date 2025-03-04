import {
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { setLocale } from '../../shared/localization';
import deDE from '../../locales/de-DE';
import enUS from '../../locales/en-US';
import { TextField } from '../text-field/text-field';
import { Popup } from '../popup/popup';
import { Button } from '../button/button';
import { DateRangePicker } from './date-range-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-range-picker';

// Mock current date to be 2023-08-10 for the tests

vi.mock('../../shared/date-picker/calendar/month.ts', async () => ({
	...(await vi.importActual('../../shared/date-picker/calendar/month.ts')),
	getCurrentMonth: vi.fn().mockReturnValue({ month: 7, year: 2023 }),
}));

vi.mock('../../shared/date-picker/calendar/dateStr.ts', async () => ({
	...(await vi.importActual('../../shared/date-picker/calendar/dateStr.ts')),
	currentDateStr: vi.fn().mockReturnValue('2023-08-10'),
}));

describe('vwc-date-range-picker', () => {
	let element: DateRangePicker;
	let textField: TextField;
	let calendarButton: Button;
	let popup: Popup;
	let titleAction: HTMLButtonElement;

	const getDateButton = (date: string) =>
		element.shadowRoot!.querySelector(
			`[data-date="${date}"]`
		) as HTMLButtonElement;

	const getAllDateButtons = () =>
		Array.from(
			element.shadowRoot!.querySelectorAll('[data-date]')
		) as HTMLButtonElement[];

	const getButtonByLabel = (label: string) =>
		(element.shadowRoot!.querySelector(`[aria-label="${label}"]`) ??
			element.shadowRoot!.querySelector(`[label="${label}"]`)) as Button;

	const getDialogTitle = () => titleAction.textContent!.trim();

	function typeIntoTextField(text: string) {
		textField.currentValue = text;
		textField.dispatchEvent(new InputEvent('input'));
		textField.dispatchEvent(new InputEvent('change'));
		textField.dispatchEvent(new Event('blur'));
		element.dispatchEvent(new Event('focusout'));
	}

	async function openPopup() {
		calendarButton.click();
		await elementUpdated(element);
	}

	async function openMonthView() {
		titleAction.click();
		await elementUpdated(element);
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DateRangePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		calendarButton = element.shadowRoot!.querySelector(
			'#calendar-button'
		) as Button;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		titleAction = element.shadowRoot!.querySelector(
			'.title-action'
		) as HTMLButtonElement;
		setupDelegatesFocusPolyfill(element);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-range-date-picker', async () => {
			expect(element).toBeInstanceOf(DateRangePicker);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

	describe('start', () => {
		it('should set the start date', async () => {
			element.start = '2021-01-10';
			await openPopup();
			getDateButton('2021-01-20').click();
			await elementUpdated(element);

			expect(textField.value).toBe('01/10/2021 – 01/20/2021');
		});

		it('should be set to the start date when the user enters a new range', async () => {
			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(element.start).toBe('2021-01-21');
		});

		it('should be set to empty when attempting to set an invalid date', async () => {
			element.start = 'invalid';
			await elementUpdated(element);

			expect(element.start).toBe('');
		});
	});

	describe('initialStart', () => {
		it('should be set by the start attribute', async () => {
			element.setAttribute('start', '2021-01-10');
			expect(element.initialStart).toBe('2021-01-10');
		});

		it('should set the start date if the field is not dirty', async () => {
			element.initialStart = '2021-01-10';
			expect(element.start).toBe('2021-01-10');
		});

		it('should not set the start date if the field is dirty', async () => {
			typeIntoTextField('01/01/2021 – 01/02/2021');

			element.initialStart = '2022-02-02';

			expect(element.start).toBe('2021-01-01');
		});
	});

	describe('currentStart', () => {
		it('should set the start value', async () => {
			element.currentStart = '2021-01-10';

			expect(element.start).toBe('2021-01-10');
		});

		it('should be set by the start value', async () => {
			element.start = '2021-01-10';

			expect(element.currentStart).toBe('2021-01-10');
		});
	});

	describe('end', () => {
		it('should set the end date', async () => {
			element.end = '2021-01-20';
			await openPopup();
			getDateButton('2021-01-10').click();
			await elementUpdated(element);

			expect(textField.value).toBe('01/10/2021 – 01/20/2021');
		});

		it('should be set to the start date when the user enters a new range', async () => {
			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(element.end).toBe('2021-01-22');
		});

		it('should be set to empty when attempting to set an invalid date', async () => {
			element.end = 'invalid';

			expect(element.end).toBe('');
		});
	});

	describe('initialEnd', () => {
		it('should be set by the end attribute', async () => {
			element.setAttribute('end', '2021-01-10');
			expect(element.initialEnd).toBe('2021-01-10');
		});

		it('should set the end date if the field is not dirty', async () => {
			element.initialEnd = '2021-01-10';
			expect(element.end).toBe('2021-01-10');
		});

		it('should not set the end date if the field is dirty', async () => {
			typeIntoTextField('01/01/2021 – 01/02/2021');

			element.initialEnd = '2022-02-02';

			expect(element.end).toBe('2021-01-02');
		});
	});

	describe('currentEnd', () => {
		it('should set the end value', async () => {
			element.currentEnd = '2021-01-10';

			expect(element.end).toBe('2021-01-10');
		});

		it('should be set by the end value', async () => {
			element.end = '2021-01-10';

			expect(element.currentEnd).toBe('2021-01-10');
		});
	});

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when a user enters a valid date range into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user selects a start date in the calendar', async () => {
			const spy = vi.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			getDateButton('2023-08-01').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user selects an end date in the calendar', async () => {
			await openPopup();
			getDateButton('2023-08-01').click();
			const spy = vi.fn();
			element.addEventListener(eventName, spy);

			getDateButton('2023-08-10').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('input:start event', () => {
		it('should be fired when a user enters a valid date range into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener('input:start', spy);

			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user select a start date in the calendar', async () => {
			const spy = vi.fn();
			element.addEventListener('input:start', spy);
			await openPopup();

			getDateButton('2023-08-01').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('input:end event', () => {
		it('should be fired when a user enters a valid date range into the text field', async () => {
			const spy = vi.fn();
			element.addEventListener('input:end', spy);

			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user select an end date in the calendar', async () => {
			const spy = vi.fn();
			element.addEventListener('input:end', spy);
			await openPopup();
			getDateButton('2023-08-01').click();

			getDateButton('2023-08-10').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('text field', () => {
		it('should show a human readable date range when start and end values are set', async () => {
			element.start = '2021-01-21';
			element.end = '2021-01-22';
			await elementUpdated(element);

			expect(textField.value).toBe('01/21/2021 – 01/22/2021');
		});

		it('should show an invalid date range error when an invalid date range is entered', async () => {
			typeIntoTextField('invalid date');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid date range.');
		});

		it('should clear the error when a valid date range is entered', async () => {
			typeIntoTextField('invalid date');
			await elementUpdated(element);

			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
		});

		it('should clear the values when an empty string is entered', async () => {
			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			typeIntoTextField('');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
			expect(element.start).toBe('');
			expect(element.end).toBe('');
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable date', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = vi.fn();
			element.min = '2023-12-31';
			element.start = '2023-01-01';
			await openPopup();

			textField.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable month', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = vi.fn();
			element.min = '2024-01-01';
			element.start = '2023-01-01';
			await openPopup();
			await openMonthView();

			textField.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('calendar button', () => {
		it('should have an aria-label of "Choose dates" when no date is selected', async () => {
			expect(calendarButton.getAttribute('aria-label')).toBe('Choose dates');
		});

		it('should have an aria-label of "Change dates, DATES" when both dates are selected', async () => {
			element.start = '2021-01-01';
			element.end = '2021-01-02';
			await elementUpdated(element);

			expect(calendarButton.getAttribute('aria-label')).toBe(
				'Change dates, 01/01/2021 – 01/02/2021'
			);
		});
	});

	describe('date range picker', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should update current month to the month of the selected start date when the user enters a new date range', async () => {
			typeIntoTextField('01/21/2021 – 02/21/2021');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2021');
		});

		it('should highlight the selected date range', async () => {
			element.start = '2023-08-10';
			element.end = '2023-08-20';
			await elementUpdated(element);

			expect(getDateButton('2023-08-10').classList).toContain('start');
			expect(getDateButton('2023-08-20').classList).toContain('end');
			expect(
				getAllDateButtons()
					.filter(
						(button) =>
							button.dataset.date! >= '2023-08-10' &&
							button.dataset.date! <= '2023-08-20'
					)
					.every((button) => button.classList.contains('range'))
			).toBe(true);
		});

		it('should preview the date range when hovering over a date', async () => {
			element.start = '2023-08-10';
			await elementUpdated(element);

			const hoverDateButton = getDateButton('2023-08-20');
			hoverDateButton.dispatchEvent(
				new MouseEvent('mouseenter', { bubbles: true })
			);
			await elementUpdated(element);

			expect(getDateButton('2023-08-10').classList).toContain('start');
			expect(getDateButton('2023-08-20').classList).toContain('end');
			expect(
				getAllDateButtons()
					.filter(
						(button) =>
							button.dataset.date! >= '2023-08-10' &&
							button.dataset.date! <= '2023-08-20'
					)
					.every((button) => button.classList.contains('range'))
			).toBe(true);
		});

		it('should stop previewing the date range when mouse leaves a date', async () => {
			element.start = '2023-08-10';
			await elementUpdated(element);

			const hoverDateButton = getDateButton('2023-08-20');
			hoverDateButton.dispatchEvent(
				new MouseEvent('mouseenter', { bubbles: true })
			);
			hoverDateButton.dispatchEvent(
				new MouseEvent('mouseleave', { bubbles: true })
			);
			await elementUpdated(element);

			expect(getDateButton('2023-08-20').classList).not.toContain('end');
		});

		it('should allow selecting a start and end date by clicking on them and closes the popup', async () => {
			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			expect(element.start).toBe('2023-08-01');
			expect(element.end).toBe('2023-08-10');
			expect(popup.open).toBe(false);
		});

		it('should allow selecting an end date if start date is already present', async () => {
			element.start = '2023-08-01';
			await elementUpdated(element);

			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			expect(element.start).toBe('2023-08-01');
			expect(element.end).toBe('2023-08-10');
		});

		it('should allow selecting an start date if end date is already present', async () => {
			element.start = '2023-08-10';
			await elementUpdated(element);

			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.start).toBe('2023-08-01');
			expect(element.end).toBe('2023-08-10');
		});

		it('should reset an existing date range when clicking on a date', async () => {
			element.start = '2023-08-01';
			element.end = '2023-08-10';
			await elementUpdated(element);

			getDateButton('2023-08-20').click();
			await elementUpdated(element);

			expect(element.start).toBe('2023-08-20');
			expect(element.end).toBe('');
		});

		it('should swap start and end dates when an end date before start date is selected', async () => {
			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.start).toBe('2023-08-01');
			expect(element.end).toBe('2023-08-10');
		});
	});

	describe('dialog footer', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should clear start and end date when clicking the clear button', async () => {
			element.start = '2023-08-01';
			element.end = '2023-08-02';

			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(element.start).toBeFalsy();
			expect(element.end).toBeFalsy();
		});
	});

	describe('validation errors', () => {
		it('should show a validation error when the start date is before the min date', async () => {
			element.min = '2023-08-10';
			element.start = '2023-08-01';
			element.end = '2023-08-01';

			expect(element.validationMessage).toBe(
				'The start date must be 08/10/2023 or later.'
			);
		});

		it('should show a validation error when the end date is after the max date', async () => {
			element.max = '2023-08-10';
			element.start = '2023-08-10';
			element.end = '2023-08-11';

			expect(element.validationMessage).toBe(
				'The end date must be 08/10/2023 or earlier.'
			);
		});
	});

	describe('form reset', () => {
		it('should reset the date range to initial values when the form is reset', async () => {
			const ORIGINAL_START_DATE = '2023-08-01';
			const ORIGINAL_END_DATE = '2023-08-10';
			const form = fixture(`
				<form>
					<${COMPONENT_TAG} start="${ORIGINAL_START_DATE}" end="${ORIGINAL_END_DATE}"></${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			element = form.querySelector(COMPONENT_TAG) as DateRangePicker;
			element.start = '2020-01-01';
			element.end = '2020-01-02';
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(element.start).toBe(ORIGINAL_START_DATE);
			expect(element.end).toBe(ORIGINAL_END_DATE);
		});
	});

	describe('form value', () => {
		// Cannot properly end-to-end test form value because jsdom does not support ElementInternals
		// Instead we mock the setFormValue method and test that it is called with the correct value
		const getFormValue = () =>
			vi.mocked(element.setFormValue).mock.lastCall![0] as FormData;

		beforeEach(() => {
			element.setFormValue = vi.fn();
		});

		it('should set the form value when name, start and end date are set', () => {
			element.name = 'name';
			element.start = '2023-08-01';
			element.end = '2023-08-02';

			expect(getFormValue().getAll('name')).toEqual([
				'2023-08-01',
				'2023-08-02',
			]);
		});

		it.each([
			['name', '', ''],
			['', '2023-08-01', ''],
			['', '', '2023-08-02'],
		])(
			'should set form value to null when not all values are set (name=%s, start=%s, end=%s)',
			(name, start, end) => {
				element.name = name;
				element.start = start;
				element.end = end;

				expect(getFormValue()).toBeNull();
			}
		);
	});

	describe('localization', () => {
		afterEach(() => {
			setLocale(enUS);
		});

		it('should format the date according to the locale', async () => {
			setLocale(deDE);

			element.start = '2021-01-21';
			element.end = '2021-01-22';
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021 – 22.01.2021');
		});

		it('should update the text field when the locale changes', async () => {
			element.start = '2021-01-21';
			element.end = '2021-01-22';
			await elementUpdated(element);

			setLocale(deDE);
			await elementUpdated(element);

			expect(textField.value).toBe('21.01.2021 – 22.01.2021');
		});
	});
});
