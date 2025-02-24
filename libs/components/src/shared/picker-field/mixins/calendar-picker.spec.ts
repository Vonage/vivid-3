import {
	elementUpdated,
	fixture,
	getBaseElement,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { Button } from '../../../lib/button/button';
import type { CalendarPickerElement } from './calendar-picker';

/**
 * Common tests for calendar pickers.
 */
export const calendarPickerSpec = <
	ComponentType extends CalendarPickerElement & { min: string; max: string }
>(
	COMPONENT_TAG: string
) => {
	let element: ComponentType;
	let pickerButton: Button;

	const getTitleAction = () =>
		element.shadowRoot!.querySelector('.title-action') as HTMLButtonElement;

	const getDateButton = (date: string) =>
		element.shadowRoot!.querySelector(
			`[data-date="${date}"]`
		) as HTMLButtonElement;

	const getAllDateButtons = () =>
		Array.from(
			element.shadowRoot!.querySelectorAll('[data-date]')
		) as HTMLButtonElement[];

	const getMonthButton = (month: string) =>
		element.shadowRoot!.querySelector(
			`[data-month="${month}"]`
		) as HTMLButtonElement;

	const getAllMonthButtons = () =>
		Array.from(
			element.shadowRoot!.querySelectorAll('[data-month]')
		) as HTMLButtonElement[];

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

	const getDialogTitle = () => getTitleAction().textContent!.trim();

	async function openPopup() {
		pickerButton.click();
		await elementUpdated(element);
	}

	async function openMonthView() {
		getTitleAction().click();
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
		)) as ComponentType;
		pickerButton = element.shadowRoot!.querySelector(
			'#picker-button'
		) as Button;
		setupDelegatesFocusPolyfill(element);
	});

	describe('min', () => {
		const MIN_DATE = '2023-08-05';
		const MIN_MONTH = '2023-08';

		beforeEach(async () => {
			element.min = MIN_DATE;
			await elementUpdated(element);
			await openPopup();
		});

		describe('in the calendar grid', () => {
			it('should disable dates earlier than min', async () => {
				expect(
					getAllDateButtons()
						.filter((button) => button.dataset.date! < MIN_DATE)
						.every((button) => button.disabled)
				).toBe(true);
			});

			it('should disable previous month button if the previous month is earlier than min', async () => {
				expect(getButtonByLabel('Previous month').disabled).toBe(true);
			});

			it('should enable previous month button if the previous month is not earlier than min', async () => {
				getButtonByLabel('Next month').click();
				await elementUpdated(element);

				expect(getButtonByLabel('Previous month').disabled).toBe(false);
			});

			describe('with single calendar', () => {
				beforeEach(async () => {
					element._numCalendars = 1;
					await elementUpdated(element);
				});

				it('should disable previous year button if the previous year is earlier than min', async () => {
					expect(getButtonByLabel('Previous year').disabled).toBe(true);
				});

				it('should enable previous year button if the previous year is not earlier than min', async () => {
					getButtonByLabel('Next year').click();
					await elementUpdated(element);

					expect(getButtonByLabel('Previous year').disabled).toBe(false);
				});
			});
		});

		describe('in the month picker', () => {
			beforeEach(async () => {
				await openMonthView();
			});

			it('should disable months earlier than min', async () => {
				expect(
					getAllMonthButtons()
						.filter((button) => button.dataset.month! < MIN_MONTH)
						.every((button) => button.disabled)
				).toBe(true);
			});

			describe('with single calendar', () => {
				beforeEach(async () => {
					element._numCalendars = 1;
					await elementUpdated(element);
				});

				it('should disable previous year button if the previous year is earlier than min', async () => {
					expect(getButtonByLabel('Previous year').disabled).toBe(true);
				});
			});
		});
	});

	describe('max', () => {
		const MAX_DATE = '2023-08-15';
		const MAX_MONTH = '2023-08';

		beforeEach(async () => {
			element.max = MAX_DATE;
			await elementUpdated(element);
			await openPopup();
		});

		describe('in the calendar grid', () => {
			it('should disable dates later than max', async () => {
				expect(
					getAllDateButtons()
						.filter((button) => button.dataset.date! > MAX_DATE)
						.every((button) => button.disabled)
				).toBe(true);
			});

			it('should disable next month button if the next month is later than max', async () => {
				expect(getButtonByLabel('Next month').disabled).toBe(true);
			});

			it('should enable next month button if the next month is not later than max', async () => {
				getButtonByLabel('Previous month').click();
				await elementUpdated(element);

				expect(getButtonByLabel('Next month').disabled).toBe(false);
			});

			describe('with single calendar', () => {
				beforeEach(async () => {
					element._numCalendars = 1;
					await elementUpdated(element);
				});

				it('should disable next year button if the next year is later than max', async () => {
					expect(getButtonByLabel('Next year').disabled).toBe(true);
				});

				it('should enable next year button if the next year is not later than max', async () => {
					getButtonByLabel('Previous year').click();
					await elementUpdated(element);

					expect(getButtonByLabel('Next year').disabled).toBe(false);
				});
			});
		});

		describe('in the month picker', () => {
			beforeEach(async () => {
				await openMonthView();
			});

			it('should disable months later than max', async () => {
				expect(
					getAllMonthButtons()
						.filter((button) => button.dataset.month! > MAX_MONTH)
						.every((button) => button.disabled)
				).toBe(true);
			});

			describe('with single calendar', () => {
				beforeEach(async () => {
					element._numCalendars = 1;
					await elementUpdated(element);
				});

				it('should disable next year button if the next year is later than max', async () => {
					expect(getButtonByLabel('Next year').disabled).toBe(true);
				});
			});
		});
	});

	describe('calendar', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should initially show the current month', () => {
			expect(getDialogTitle()).toBe('August 2023');
		});

		it('should highlight the current date', () => {
			expect(getDateButton('2023-08-10').classList).toContain('current');
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

		describe('with single calendar', () => {
			beforeEach(async () => {
				element._numCalendars = 1;
				await elementUpdated(element);
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
		});

		describe('with multiple calendars', () => {
			beforeEach(async () => {
				element._numCalendars = 2;
				await elementUpdated(element);
			});

			it('should hide the buttons to change year', async () => {
				expect(getButtonByLabel('Previous year')).toBe(null);
				expect(getButtonByLabel('Next year')).toBe(null);
			});
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

		it('should enable default of keydown event when pressing any other key', async () => {
			getDateButton('2023-08-01').focus();

			const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
			event.preventDefault = vi.fn();
			getDateButton('2023-08-01').dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should remain on the current date when attempting to move into a date outside valid range', async () => {
			element.max = '2023-08-01';
			await elementUpdated(element);
			const focusedDate = getDateButton('2023-08-01');
			focusedDate.focus();

			pressKey('ArrowRight');

			expect(element.shadowRoot!.activeElement).toBe(focusedDate);
		});

		it('should allow hovering over a date', async () => {
			const hoverDate = getDateButton('2023-08-01');
			hoverDate.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
			hoverDate.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		});
	});

	describe('month picker', () => {
		beforeEach(async () => {
			element._numCalendars = 1;
			await elementUpdated(element);
			await openPopup();
			await openMonthView();
		});

		it('should highlight the current month', () => {
			expect(getMonthButton('2023-08').classList).toContain('current');
		});

		it('should highlight the selected month', async () => {
			expect(getMonthButton('2023-08').classList).toContain('selected');
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
			getMonthButton('2023-01').click();
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('January 2023');
		});

		it('should close the month picker when clicking on the title action', async () => {
			getTitleAction().click();
			await elementUpdated(element);

			expect(element.shadowRoot!.querySelector('.month-grid')).toBeNull();
		});
	});

	describe('month grid button', () => {
		beforeEach(async () => {
			element._numCalendars = 1;
			await elementUpdated(element);
			await openPopup();
			await openMonthView();
		});

		it.each([
			['2023-08', 'ArrowRight'],
			['2023-06', 'ArrowLeft'],
			['2023-11', 'ArrowDown'],
			['2023-03', 'ArrowUp'],
		])(
			'should move focus to %s when pressing %s while focused on 2023-07',
			async (expectedDate, key) => {
				getMonthButton('2023-07').focus();
				pressKey(key);
				await elementUpdated(element);

				expect(element.shadowRoot!.activeElement).toBe(
					getMonthButton(expectedDate)
				);
			}
		);

		it('should switch to the new year when navigating to a month of a different year', async () => {
			getMonthButton('2023-01').focus();
			pressKey('ArrowLeft');
			await elementUpdated(element);

			expect(getDialogTitle()).toBe('2022');
		});

		it('should enable default of keydown event when pressing any other key', async () => {
			getMonthButton('2023-01').focus();

			const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
			event.preventDefault = vi.fn();
			getMonthButton('2023-01').dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should remain on the current month when attempting to move into a month outside valid range', async () => {
			element.max = '2023-08-01';
			await elementUpdated(element);
			getMonthButton('2023-08').focus();

			pressKey('ArrowRight');

			expect(element.shadowRoot!.activeElement).toBe(getMonthButton('2023-08'));
		});
	});
};
