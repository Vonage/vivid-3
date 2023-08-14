import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { TextField } from '../text-field/text-field';
import { Popup } from '../popup/popup';
import { Button } from '../button/button';
import { DatePicker } from './date-picker';
import { datePickerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-date-picker';

// Mock current date to be 2023-08-10 for the tests

jest.mock('./calendar/month.ts', () => ({
	...jest.requireActual('./calendar/month.ts'),
	getCurrentMonth: jest.fn().mockReturnValue({ month: 7, year: 2023 }),
}));

jest.mock('./calendar/dateStr.ts', () => ({
	...jest.requireActual('./calendar/dateStr.ts'),
	currentDateStr: jest.fn().mockReturnValue('2023-08-10'),
}));

// In jsdom does not currently support delegatesFocus, see https://github.com/jsdom/jsdom/issues/3418
// Workaround to allow us to test focus behaviour:
// Unfortunately it causes jest to throw "TypeError: Converting circular structure to JSON" when a test fails
let activeElement: Element | null = null;
Object.defineProperty(window.ShadowRoot.prototype, 'activeElement', {
	get: () => activeElement,
});
const focus = window.HTMLElement.prototype.focus;
window.HTMLElement.prototype.focus = function () {
	activeElement = this as Element;
	focus.call(this);
};

describe('vwc-date-picker', () => {
	let element: DatePicker;
	let textField: TextField;
	let popup: Popup;
	let titleAction: HTMLButtonElement;

	const getDateButton = (date: string) =>
		element.shadowRoot!.querySelector(
			`[data-date="${date}"]`
		) as HTMLButtonElement;

	const getMonthButton = (month: string) =>
		element.shadowRoot!.querySelector(
			`[data-month="${month}"]`
		) as HTMLButtonElement;

	const pressKey = (
		key: string,
		target = element.shadowRoot!.activeElement!
	) => {
		target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	};

	const getButtonByLabel = (label: string) =>
		element.shadowRoot!.querySelector(
			`[aria-label="${label}"],[label="${label}"]`
		) as Button;

	const getDialogTitle = () => titleAction.textContent!.trim();

	function typeIntoTextField(text: string) {
		textField.currentValue = text;
		textField.dispatchEvent(new InputEvent('input'));
		textField.dispatchEvent(new InputEvent('change'));
	}

	async function openPopup() {
		textField.focus();
		textField.dispatchEvent(new FocusEvent('focus'));
		await elementUpdated(element);
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DatePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		titleAction = element.shadowRoot!.querySelector(
			'.title-action'
		) as HTMLButtonElement;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-date-picker', async () => {
			expect(datePickerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(DatePicker);
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
			element.value = '2021-01-21';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('01/21/2021');
		});

		it('should ignore an invalid value', async () => {
			element.value = 'x';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('');
		});

		it('should update value when a user enters a valid date into the text field', async () => {
			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(element.value).toBe('2021-01-21');
		});

		it('should have an empty value when a user enters a invalid date into the text field', async () => {
			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBeFalsy();
		});

		it('should clear the text field when value is set to empty string', async () => {
			element.value = '2021-01-21';
			await elementUpdated(element);

			element.value = '';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('');
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

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when a user enters a valid date into the text field', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user clicks on a date in the calendar', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			getDateButton('2023-08-01').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('text field', () => {
		it('should show an invalid date error when an invalid date is entered', async () => {
			typeIntoTextField('invalid date');
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid date.');
		});

		it('should clear the invalid date error when a valid date is entered', async () => {
			typeIntoTextField('invalid date');
			await elementUpdated(element);

			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(textField.errorText).toBe('');
		});
	});

	describe('popup', () => {
		it('should open when the text field receives focus', async () => {
			textField.dispatchEvent(new FocusEvent('focus'));
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});

		it('should remain closed when readonly text field receives focus', async () => {
			element.readOnly = true;

			textField.dispatchEvent(new FocusEvent('focus'));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should close when pressing ESC', async () => {
			await openPopup();

			pressKey('Escape', textField);
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should close when clicking outside the date-picker', async () => {
			await openPopup();

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});
	});

	describe('date picker', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should initially show the current month', () => {
			expect(getDialogTitle()).toBe('August 2023');
		});

		it('should update current month to the month of the selected date when the user enters a new date', async () => {
			typeIntoTextField('01/21/2021');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2021');
		});

		it('should highlight the current date', () => {
			expect(getDateButton('2023-08-10').classList).toContain('current');
		});

		it('should highlight the current date', async () => {
			element.value = '2023-08-20';
			await elementUpdated(element);

			expect(getDateButton('2023-08-20').classList).toContain('selected');
		});

		it('should switch to the previous year when clicking the previous year button', async () => {
			getButtonByLabel('Previous year').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('August 2022');
		});

		it('should switch to the next year when clicking the next year button', async () => {
			getButtonByLabel('Next year').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('August 2024');
		});

		it('should switch to the previous month when clicking the previous month button', async () => {
			getButtonByLabel('Previous month').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('July 2023');
		});

		it('should switch to the next month when clicking the next month button', async () => {
			getButtonByLabel('Next month').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('September 2023');
		});

		it('should select a date when clicking on a date', async () => {
			getDateButton('2023-08-01').click();
			await elementUpdated(element);

			expect(element.value).toBe('2023-08-01');
		});

		it('should move focus to the tabbable date when pressing tab in the text-field', async () => {
			pressKey('Tab', textField);

			expect(element.shadowRoot!.activeElement).toBe(
				getDateButton('2023-08-10')
			);
		});
	});

	describe('date grid button', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it.each([
			['2023-08-18', 'ArrowRight'],
			['2023-08-16', 'ArrowLeft'],
			['2023-08-24', 'ArrowDown'],
			['2023-08-10', 'ArrowUp'],
		])(
			'should move focus to %s when pressing %s while focused on 2023-08-17',
			async (expectedDate, key) => {
				getDateButton('2023-08-17').focus();
				pressKey(key);
				await elementUpdated(element);

				expect(element.shadowRoot!.activeElement).toBe(
					getDateButton(expectedDate)
				);
			}
		);

		it('should switch to the new month when navigating to a date of a different month', async () => {
			getDateButton('2023-08-01').focus();
			pressKey('ArrowLeft');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('July 2023');
		});
	});

	describe('month picker', () => {
		beforeEach(async () => {
			await openPopup();
			titleAction.click();
			await elementUpdated(element);
		});

		it('should highlight the current month', () => {
			expect(getMonthButton('2023-8').classList).toContain('current');
		});

		it('should highlight the selected month', async () => {
			expect(getMonthButton('2023-8').classList).toContain('selected');
		});

		it('should switch to the previous year when clicking the previous year button', async () => {
			getButtonByLabel('Previous year').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('2022');
		});

		it('should switch to the next year when clicking the next year button', async () => {
			getButtonByLabel('Next year').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('2024');
		});

		it('should select a month when clicking on a month', async () => {
			getMonthButton('2023-1').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2023');
		});

		it('should close the month picker when clicking on the title action', async () => {
			titleAction.click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('August 2023');
		});

		it('should move focus to the tabbable month when pressing tab in the text-field', async () => {
			textField.focus();
			pressKey('Tab', textField);

			expect(element.shadowRoot!.activeElement).toBe(getMonthButton('2023-8'));
		});
	});

	describe('month grid button', () => {
		beforeEach(async () => {
			await openPopup();
			titleAction.click();
			await elementUpdated(element);
		});

		it.each([
			['2023-8', 'ArrowRight'],
			['2023-6', 'ArrowLeft'],
			['2023-11', 'ArrowDown'],
			['2023-3', 'ArrowUp'],
		])(
			'should move focus to %s when pressing %s while focused on 2023-7',
			async (expectedDate, key) => {
				getMonthButton('2023-7').focus();
				pressKey(key);
				await elementUpdated(element);

				expect(element.shadowRoot!.activeElement).toBe(
					getMonthButton(expectedDate)
				);
			}
		);

		it('should switch to the new year when navigating to a month of a different year', async () => {
			getMonthButton('2023-1').focus();
			pressKey('ArrowLeft');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('2022');
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

		it('should clear the date when clicking the clear button', async () => {
			getButtonByLabel('Clear').click();
			await elementUpdated(element);

			expect(element.value).toBeFalsy();
		});
	});
});
