import {
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { TextField } from '../text-field/text-field';
import { Popup } from '../popup/popup';
import { Button } from '../button/button';
import { type Value } from '../value/value.ts';
import { DateRangePicker } from './date-range-picker';
import { dateRangePickerDefinition } from './definition';
import '.';
import '../value';

const COMPONENT_TAG = 'vwc-date-range-picker';
const VALUE_TAG = 'vwc-value';

// Mock current date to be 2023-08-10 for the tests

jest.mock('../../shared/date-picker/calendar/month.ts', () => ({
	...jest.requireActual('../../shared/date-picker/calendar/month.ts'),
	getCurrentMonth: jest.fn().mockReturnValue({ month: 7, year: 2023 }),
}));

jest.mock('../../shared/date-picker/calendar/dateStr.ts', () => ({
	...jest.requireActual('../../shared/date-picker/calendar/dateStr.ts'),
	currentDateStr: jest.fn().mockReturnValue('2023-08-10'),
}));

describe('vwc-date-range-picker', () => {
	let element: DateRangePicker;
	let startValue: Value;
	let endValue: Value;
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
		element.shadowRoot!.querySelector(
			`[aria-label="${label}"],[label="${label}"]`
		) as Button;

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
		element = (await fixture(`
			<${COMPONENT_TAG}>
				<${VALUE_TAG} key="start"></${VALUE_TAG}>
				<${VALUE_TAG} key="end"></${VALUE_TAG}>
			</${COMPONENT_TAG}>`
		)) as DateRangePicker;
		startValue = element.querySelector('[key=start]') as Value;
		endValue = element.querySelector('[key=end]') as Value;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		calendarButton = element.shadowRoot!.querySelector('#calendar-button') as Button;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		titleAction = element.shadowRoot!.querySelector(
			'.title-action'
		) as HTMLButtonElement;
		setupDelegatesFocusPolyfill(element);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-range-date-picker', async () => {
			expect(dateRangePickerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(DateRangePicker);
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

	describe('value elements', () => {
		it.each(['input', 'change'] as const)
		('should set value on the value elements and emit %s event when dates change', async (eventName) => {
			const startSpy = jest.fn();
			const endSpy = jest.fn();
			startValue.addEventListener(eventName, startSpy);
			endValue.addEventListener(eventName, endSpy);

			typeIntoTextField('01/21/2021 – 01/22/2021');
			await elementUpdated(element);

			expect(startValue.value).toBe('2021-01-21');
			expect(endValue.value).toBe('2021-01-22');
			expect(startSpy).toHaveBeenCalledTimes(1);
			expect(endSpy).toHaveBeenCalledTimes(1);
		});

		it.each(['start', 'end'])('should set the value on %s element even when it is the only value element', async (key: string) => {
			element = fixture(`
				<${COMPONENT_TAG}>
					<${VALUE_TAG} key="${key}"></${VALUE_TAG}>
				</${COMPONENT_TAG}>
			`) as DateRangePicker;
			await elementUpdated(element);
			textField = element.shadowRoot!.querySelector('.control') as TextField;
			const valueEl = element.querySelector(`[key="${key}"]`) as Value;

			typeIntoTextField('01/21/2021 – 01/21/2021');
			await elementUpdated(element);

			expect(element._startValue).toBe('2021-01-21');
			expect(valueEl.value).toBe('2021-01-21');
		});
	});

	describe('text field', () => {
		it('should show a human readable date range when start and end values are set', async () => {
			startValue.value = '2021-01-21';
			endValue.value = '2021-01-22';
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
			expect(startValue.value).toBe('');
			expect(endValue.value).toBe('');
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable date', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = jest.fn();
			element.min = '2023-12-31';
			startValue.value = '2023-01-01';
			await openPopup();

			textField.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should keep default behaviour when pressing tab in the text-field without a tabbable month', async () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
			event.preventDefault = jest.fn();
			element.min = '2024-01-01';
			startValue.value = '2023-01-01';
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
			startValue.value = '2021-01-01';
			endValue.value = '2021-01-02';
			await elementUpdated(element);

			expect(calendarButton.getAttribute('aria-label')).toBe('Change dates, 01/01/2021 – 01/02/2021');
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
			startValue.value = '2023-08-10';
			endValue.value = '2023-08-20';
			await elementUpdated(element);

			expect(getDateButton('2023-08-10').classList).toContain('start');
			expect(getDateButton('2023-08-20').classList).toContain('end');
			expect(getAllDateButtons()
				.filter((button) => button.dataset.date! >= '2023-08-10' && button.dataset.date! <= '2023-08-20')
				.every((button) => button.classList.contains('range'))).toBe(true);
		});

		it('should preview the date range when hovering over a date', async () => {
			startValue.value = '2023-08-10';
			await elementUpdated(element);

			const hoverDateButton = getDateButton('2023-08-20');
			hoverDateButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
			await elementUpdated(element);

			expect(getDateButton('2023-08-10').classList).toContain('start');
			expect(getDateButton('2023-08-20').classList).toContain('end');
			expect(getAllDateButtons()
				.filter((button) => button.dataset.date! >= '2023-08-10' && button.dataset.date! <= '2023-08-20')
				.every((button) => button.classList.contains('range'))).toBe(true);
		});

		it('should stop previewing the date range when mouse leaves a date', async () => {
			startValue.value = '2023-08-10';
			await elementUpdated(element);

			const hoverDateButton = getDateButton('2023-08-20');
			hoverDateButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
			hoverDateButton.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
			await elementUpdated(element);

			expect(getDateButton('2023-08-20').classList).not.toContain('end');
		});


		it('should allow selecting a start and end date by clicking on them and closes the popup', async () => {
			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			expect(startValue.value).toBe('2023-08-01');
			expect(endValue.value).toBe('2023-08-10');
			expect(popup.open).toBe(false);
		});

		it('should allow selecting an end date if start date is already present', async () => {
			startValue.value = '2023-08-01';
			await elementUpdated(element);

			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			expect(startValue.value).toBe('2023-08-01');
			expect(endValue.value).toBe('2023-08-10');
		});

		it('should allow selecting an start date if end date is already present', async () => {
			endValue.value = '2023-08-10';
			await elementUpdated(element);

			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(startValue.value).toBe('2023-08-01');
			expect(endValue.value).toBe('2023-08-10');
		});

		it('should reset an existing date range when clicking on a date', async () => {
			startValue.value = '2023-08-01';
			endValue.value = '2023-08-10';
			await elementUpdated(element);

			getDateButton('2023-08-20').click();
			await elementUpdated(element);

			expect(startValue.value).toBe('2023-08-20');
			expect(endValue.value).toBe('');
		});

		it('should swap start and end dates when an end date before start date is selected', async () => {
			getDateButton('2023-08-10').click();
			await elementUpdated(element);

			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(startValue.value).toBe('2023-08-01');
			expect(endValue.value).toBe('2023-08-10');
		});
	});

	describe('dialog footer', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should clear start and end date when clicking the clear button', async () => {
			startValue.value = '2023-08-01';
			endValue.value = '2023-08-02';

			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(startValue.value).toBeFalsy();
			expect(endValue.value).toBeFalsy();
		});
	});

	describe('validation errors', () => {
		it('should show a validation error when the start date is before the min date', async () => {
			element.min = '2023-08-10';
			startValue.value = '2023-08-01';
			endValue.value = '2023-08-01';

			expect(element.validationMessage).toBe('The start date must be 08/10/2023 or later.');
		});

		it('should show a validation error when the end date is after the max date', async () => {
			element.max = '2023-08-10';
			startValue.value = '2023-08-10';
			endValue.value = '2023-08-11';

			expect(element.validationMessage).toBe('The end date must be 08/10/2023 or earlier.');
		});
	});

	describe('form reset', () => {
		it('should reset the date range when the form is reset', async () => {
			const ORIGINAL_START_DATE= '2023-08-01';
			const ORIGINAL_END_DATE = '2023-08-10';
			const form = fixture(`
				<form>
					<${COMPONENT_TAG}>
						<${VALUE_TAG} key="start" value="${ORIGINAL_START_DATE}"></${VALUE_TAG}>
						<${VALUE_TAG} key="end" value="${ORIGINAL_END_DATE}"></${VALUE_TAG}>
					</${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			const startValue = form.querySelector('[key="start"]') as Value;
			const endValue = form.querySelector('[key="end"]') as Value;
			startValue.value = '2020-01-01';
			endValue.value = '2020-01-02';
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(startValue.value).toBe(ORIGINAL_START_DATE);
			expect(endValue.value).toBe(ORIGINAL_END_DATE);
		});

		it('should clear the date range when the form is reset without value elements', async () => {
			const form = fixture(`<form><${COMPONENT_TAG}></${COMPONENT_TAG}></form>`) as HTMLFormElement;
			await elementUpdated(form);
			element = form.querySelector(COMPONENT_TAG) as DateRangePicker;
			textField = element.shadowRoot!.querySelector('.control') as TextField;
			typeIntoTextField('09/01/2023 – 09/02/2023');
			await elementUpdated(element);

			form.reset();
			await elementUpdated(form);

			expect(textField.value).toBe('');
		});

	});
});
