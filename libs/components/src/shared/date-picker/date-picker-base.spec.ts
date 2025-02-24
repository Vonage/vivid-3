import {
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { TextField } from '../../lib/text-field/text-field';
import { Popup } from '../../lib/popup/popup';
import { Button } from '../../lib/button/button';
import { CalendarPicker } from '../picker-field/mixins/calendar-picker';
import '../../lib/date-picker';
import '../../lib/date-range-picker';

// Mock current date to be 2023-08-10 for the tests
vi.mock('./calendar/month.ts', async () => ({
	...(await vi.importActual('./calendar/month.ts')),
	getCurrentMonth: vi.fn().mockReturnValue({ month: 7, year: 2023 }),
}));
vi.mock('./calendar/dateStr.ts', async () => ({
	...(await vi.importActual('./calendar/dateStr.ts')),
	currentDateStr: vi.fn().mockReturnValue('2023-08-10'),
}));

/**
 * Run common tests for the abstract DatePickerBase component against implementations.
 */
describe.each([['vwc-date-picker'], ['vwc-date-range-picker']])(
	'%s',
	(COMPONENT_TAG) => {
		let element: CalendarPicker;
		let textField: TextField;
		let calendarButton: Button;
		let popup: Popup;

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
			calendarButton.click();
			await elementUpdated(element);
		}

		async function openMonthView() {
			getTitleAction().click();
			await elementUpdated(element);
		}

		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as CalendarPicker;
			textField = element.shadowRoot!.querySelector('.control') as TextField;
			calendarButton = element.shadowRoot!.querySelector(
				'#calendar-button'
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

		describe('calendar button', () => {
			it('should open the popup when pressed', async () => {
				calendarButton.click();
				await elementUpdated(element);

				expect(popup.open).toBe(true);
			});

			it('should close the popup when pressed and it is already open', async () => {
				await openPopup();

				calendarButton.click();
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});

			it('should be disabled when the date picker is disabled', async () => {
				element.disabled = true;
				await elementUpdated(element);

				expect(calendarButton.disabled).toBe(true);
			});

			it('should be disabled when the date picker is readonly', async () => {
				element.readOnly = true;
				await elementUpdated(element);

				expect(calendarButton.disabled).toBe(true);
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

			it('should close when clicking outside the date-picker', async () => {
				await openPopup();

				document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});

			it('should allow propgation on escape key if closed', async () => {
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
				const buttons: NodeListOf<HTMLElement> =
					element.shadowRoot!.querySelectorAll(
						'.dialog button, .dialog vwc-button'
					);
				firstFocusable = buttons[0];
				lastFocusable = buttons[buttons.length - 1];
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
				hoverDate.dispatchEvent(
					new MouseEvent('mouseenter', { bubbles: true })
				);
				hoverDate.dispatchEvent(
					new MouseEvent('mouseleave', { bubbles: true })
				);
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

				expect(element.shadowRoot!.activeElement).toBe(
					getMonthButton('2023-08')
				);
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

			it('should close the dialog when clicking the clear button', async () => {
				getButtonByLabel('Clear').click();
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});

			it('should fire a clear-click event when clear button is clicked', async () => {
				const spy = vi.fn();
				element.addEventListener('clear-click', spy);
				getButtonByLabel('Clear').click();

				expect(spy).toHaveBeenCalledTimes(1);
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

			it('should attach to closest form', async () => {
				const { form: formElement } = createFormHTML<CalendarPicker>({
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
				const { otherForm } = createFormHTML<TextField>({
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
	}
);
