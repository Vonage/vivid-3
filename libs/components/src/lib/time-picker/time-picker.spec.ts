import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { setLocale } from '../../shared/localization';
import { Popup } from '../popup/popup.ts';
import { Button } from '../button/button.ts';
import { TextField } from '../text-field/text-field.ts';
import enGB from '../../locales/en-GB.ts';
import enUS from '../../locales/en-US.ts';
import { TimePicker } from './time-picker';
import { timePickerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-time-picker';

describe('vwc-time-picker', () => {
	let element: TimePicker;
	let textField: TextField;
	let clockButton: Button;
	let popup: Popup;

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
		element.shadowRoot!.querySelector(
			`[aria-label="${label}"],[label="${label}"]`
		) as Button;

	const getPickerItem = (
		type: 'hours' | 'minutes' | 'seconds' | 'meridies',
		value: string
	) => element.shadowRoot!.querySelector(`#${type}-${value}`) as HTMLElement;

	const getAllPickerItems = (
		type: 'hours' | 'minutes' | 'seconds' | 'meridies'
	) => Array.from(element.shadowRoot!.querySelectorAll(`[id^="${type}-"]`));

	const pressKey = (
		key: string,
		options: KeyboardEventInit = {},
		triggerElement = false
	) => {
		const triggeredElement = triggerElement
			? element
			: element.shadowRoot!.activeElement;
		triggeredElement!.dispatchEvent(
			new KeyboardEvent('keydown', { key, bubbles: true, ...options })
		);
	};

	const isScrolledToTop = (element: HTMLElement) =>
		element.parentElement!.scrollTop === element.offsetTop;

	const isScrolledIntoView = (element: HTMLElement) =>
		element.offsetTop >= element.parentElement!.scrollTop &&
		element.offsetTop + element.offsetHeight <=
			element.parentElement!.scrollTop + element.parentElement!.offsetHeight;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TimePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		clockButton = element.shadowRoot!.querySelector('#clock-button') as Button;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		setupDelegatesFocusPolyfill(element);

		// Give elements heights so that they can be scrolled
		Object.defineProperties(window.HTMLElement.prototype, {
			offsetTop: {
				get() {
					const index = Array.from(this.parentElement!.children).indexOf(this);
					return index * 30;
				},
			},
			offsetHeight: {
				get() {
					if (this.tagName === 'UL') {
						return 90;
					} else {
						return 30;
					}
				},
			},
		});
	});

	describe('basic', () => {
		it('should be initialized as a vwc-time-picker', async () => {
			expect(timePickerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(TimePicker);
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

			expect(element.value).toBeFalsy();
		});

		it('should clear the text field when value is set to empty string', async () => {
			element.value = '12:34:56';
			await elementUpdated(element);

			element.value = '';
			await elementUpdated(element);

			expect(textField.currentValue).toBe('');
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

			it('should show the meridies picker in the popup', async () => {
				await openPopup();

				expect(element.shadowRoot?.querySelector('#meridies')).toBeInstanceOf(
					HTMLElement
				);
			});

			it.each(['AM', 'PM'])(
				'should show the %s hours options from 12-11',
				async (meridiem) => {
					await openPopup();

					getPickerItem('meridies', meridiem).click();
					await elementUpdated(element);
					await openPopup();

					expect(
						getAllPickerItems('hours').map((item) => item.innerHTML.trim())
					).toEqual([
						'12',
						'01',
						'02',
						'03',
						'04',
						'05',
						'06',
						'07',
						'08',
						'09',
						'10',
						'11',
					]);
				}
			);
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

			it('should hide the meridies picker in the popup', async () => {
				await openPopup();

				expect(element.shadowRoot?.querySelector('#meridies')).toBe(null);
			});

			it('should show the hours options from 0-23', async () => {
				await openPopup();

				expect(
					getAllPickerItems('hours').map((item) => item.innerHTML.trim())
				).toEqual([
					'00',
					'01',
					'02',
					'03',
					'04',
					'05',
					'06',
					'07',
					'08',
					'09',
					'10',
					'11',
					'12',
					'13',
					'14',
					'15',
					'16',
					'17',
					'18',
					'19',
					'20',
					'21',
					'22',
					'23',
				]);
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
		it('should hide hours before the min time', async () => {
			element.clock = '24h';
			element.min = '12:00:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('hours', '11')).toBe(null);
			expect(getPickerItem('hours', '12')).toBeInstanceOf(HTMLElement);
		});

		it('should hide minutes before the min time if the hour is the min hour', async () => {
			element.clock = '24h';
			element.min = '12:15:00';
			element.value = '12:30:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('minutes', '14')).toBe(null);
			expect(getPickerItem('minutes', '15')).toBeInstanceOf(HTMLElement);
		});

		it('should not hide minutes if the selected hour is not the min hour', async () => {
			element.clock = '24h';
			element.min = '12:15:00';
			element.value = '13:30:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('minutes', '14')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('minutes', '15')).toBeInstanceOf(HTMLElement);
		});

		it('should hide seconds before the min time if hour and minute are the min time', async () => {
			element.clock = '24h';
			element.min = '12:15:15';
			element.value = '12:15:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('seconds', '14')).toBe(null);
			expect(getPickerItem('seconds', '15')).toBeInstanceOf(HTMLElement);
		});

		it('should not hide seconds before the min time if hour and minute are not the min time', async () => {
			element.clock = '24h';
			element.min = '12:15:15';
			element.value = '12:30:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('seconds', '14')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('seconds', '15')).toBeInstanceOf(HTMLElement);
		});

		it('should hide AM option if min is in PM', async () => {
			element.clock = '12h';
			element.min = '12:00:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('meridies', 'AM')).toBe(null);
			expect(getPickerItem('meridies', 'PM')).toBeInstanceOf(HTMLElement);
		});
	});

	describe('max', () => {
		it('should hide hours after the max time', async () => {
			element.clock = '24h';
			element.max = '12:00:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('hours', '12')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('hours', '13')).toBe(null);
		});

		it('should hide minutes after the max time if the hour is the max hour', async () => {
			element.clock = '24h';
			element.max = '12:45:00';
			element.value = '12:30:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('minutes', '45')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('minutes', '46')).toBe(null);
		});

		it('should not hide minutes if the selected hour is not the max hour', async () => {
			element.clock = '24h';
			element.max = '12:45:00';
			element.value = '11:30:00';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('minutes', '45')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('minutes', '46')).toBeInstanceOf(HTMLElement);
		});

		it('should hide seconds after the max time if hour and minute are the max time', async () => {
			element.clock = '24h';
			element.max = '12:45:45';
			element.value = '12:45:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('seconds', '45')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('seconds', '46')).toBe(null);
		});

		it('should not hide seconds after the max time if hour and minute are not the max time', async () => {
			element.clock = '24h';
			element.max = '12:45:45';
			element.value = '11:45:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('seconds', '45')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('seconds', '46')).toBeInstanceOf(HTMLElement);
		});

		it('should hide PM option if max is in AM', async () => {
			element.clock = '12h';
			element.max = '11:59:59';
			await elementUpdated(element);

			await openPopup();

			expect(getPickerItem('meridies', 'AM')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('meridies', 'PM')).toBe(null);
		});
	});

	describe('minutesStep', () => {
		it('should hide minutes that are not a multiple of minutesStep', async () => {
			element.clock = '24h';
			element.minutesStep = 15;
			await elementUpdated(element);

			await openPopup();

			expect(
				getAllPickerItems('minutes').map((item) => item.innerHTML.trim())
			).toEqual(['00', '15', '30', '45']);
		});

		it('should ignore minutesStep of less than 1', async () => {
			element.clock = '24h';
			element.minutesStep = 0;
			await elementUpdated(element);

			await openPopup();

			expect(getAllPickerItems('minutes').length).toBe(60);
		});
	});

	describe('secondsStep', () => {
		it('should show seconds picker when secondsStep is set', async () => {
			element.clock = '24h';
			element.secondsStep = 1;
			await elementUpdated(element);

			await openPopup();

			expect(element.shadowRoot?.querySelector('#seconds')).toBeInstanceOf(
				HTMLElement
			);
		});

		it('should hide seconds that are not a multiple of secondsStep', async () => {
			element.clock = '24h';
			element.secondsStep = 15;
			await elementUpdated(element);

			await openPopup();

			expect(
				getAllPickerItems('seconds').map((item) => item.innerHTML.trim())
			).toEqual(['00', '15', '30', '45']);
		});

		it('should ignore secondsStep of less than 1', async () => {
			element.clock = '24h';
			element.secondsStep = 0;
			await elementUpdated(element);

			await openPopup();

			expect(getAllPickerItems('seconds').length).toBe(60);
		});
	});

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when a user enters a valid date into the text field', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);

			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired when a user clicks on an item in the picker', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			getPickerItem('hours', '03').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be fired if a user select a value from the picker via keyboard', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);
			await openPopup();

			pressKey('ArrowDown');

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe.each([
		['focus', 'focusin'],
		['blur', 'focusout'],
	])('%s event', (eventName, sourceEventName) => {
		it(`should emit a '${eventName}' event on '${sourceEventName}'`, async () => {
			const spy = jest.fn();
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

		it('should scroll selected items to the top if a time is selected', async () => {
			element.secondsStep = 1;
			element.value = '12:34:56';
			await elementUpdated(element);

			clockButton.click();
			await elementUpdated(element);

			expect(isScrolledToTop(getPickerItem('hours', '12'))).toBe(true);
			expect(isScrolledToTop(getPickerItem('minutes', '34'))).toBe(true);
			expect(isScrolledToTop(getPickerItem('seconds', '56'))).toBe(true);
			expect(isScrolledToTop(getPickerItem('meridies', 'PM'))).toBe(true);
		});

		it('should do nothing if the items of the selected time are not available', async () => {
			element.min = '23:00:00';
			element.value = '12:34:56';
			await elementUpdated(element);

			expect(() => {
				clockButton.click();
			}).not.toThrow();
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

	describe('time picker', () => {
		beforeEach(async () => {
			element.clock = '24h';
			await openPopup();
		});

		it('should highlight the selected time buttons', async () => {
			element.clock = '12h';
			element.secondsStep = 1;
			element.value = '13:45:00';
			await elementUpdated(element);

			[
				getPickerItem('hours', '13'),
				getPickerItem('minutes', '45'),
				getPickerItem('meridies', 'PM'),
			].map((item) => expect(item.classList).toContain('selected'));
		});

		it('should set a time when clicking on an hour', async () => {
			getPickerItem('hours', '13').click();
			await elementUpdated(element);

			expect(element.value).toBe('13:00:00');
		});

		it('should change the hour when clicking on an hour', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			getPickerItem('hours', '14').click();
			await elementUpdated(element);

			expect(element.value).toBe('14:45:00');
		});

		it('should set a time when clicking on a minute', async () => {
			getPickerItem('minutes', '30').click();
			await elementUpdated(element);

			expect(element.value).toBe('00:30:00');
		});

		it('should change the minute when clicking on an minute', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			getPickerItem('minutes', '30').click();
			await elementUpdated(element);

			expect(element.value).toBe('13:30:00');
		});

		it('should set a time when clicking on a second', async () => {
			element.secondsStep = 1;
			await elementUpdated(element);
			getPickerItem('seconds', '30').click();
			await elementUpdated(element);

			expect(element.value).toBe('00:00:30');
		});

		it('should change the second when clicking on a second', async () => {
			element.secondsStep = 1;
			element.value = '13:45:45';
			await elementUpdated(element);

			getPickerItem('seconds', '30').click();
			await elementUpdated(element);

			expect(element.value).toBe('13:45:30');
		});

		it.each([
			['00:00:00', 'AM'],
			['12:00:00', 'PM'],
		])(
			'should set the time to %s when clicking on %s',
			async (expectedValue, meridiem) => {
				element.clock = '12h';
				await elementUpdated(element);
				getPickerItem('meridies', meridiem).click();
				await elementUpdated(element);

				expect(element.value).toBe(expectedValue);
			}
		);

		it('should set a time when clicking on a meridiem', async () => {
			element.clock = '12h';
			await elementUpdated(element);
			getPickerItem('meridies', 'PM').click();
			await elementUpdated(element);

			expect(element.value).toBe('12:00:00');
		});

		it('should change the meridiem to PM when clicking PM', async () => {
			element.clock = '12h';
			element.value = '01:00:00';
			await elementUpdated(element);

			getPickerItem('meridies', 'PM').click();
			await elementUpdated(element);

			expect(element.value).toBe('13:00:00');
		});

		it('should change the meridiem to AM when clicking AM', async () => {
			element.clock = '12h';
			element.value = '13:00:00';
			await elementUpdated(element);

			getPickerItem('meridies', 'AM').click();
			await elementUpdated(element);

			expect(element.value).toBe('01:00:00');
		});

		describe('picker', () => {
			it.each(['ArrowDown', 'ArrowUp'])(
				'should select the first item when pressing %s while nothing is selected',
				async (key) => {
					pressKey(key);
					await elementUpdated(element);

					expect(element.value).toBe('00:00:00');
				}
			);

			it('should select the next item when pressing ArrowDown', async () => {
				element.value = '01:00:00';
				await elementUpdated(element);

				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(element.value).toBe('02:00:00');
			});

			it('should select the first item when pressing ArrowDown while the last item is selected', async () => {
				element.value = '23:00:00';
				await elementUpdated(element);

				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(element.value).toBe('00:00:00');
			});

			it('should select the previous item when pressing ArrowUp', async () => {
				element.value = '03:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);

				expect(element.value).toBe('02:00:00');
			});

			it('should select the last item when pressing ArrowUp while the first item is selected', async () => {
				element.value = '00:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);

				expect(element.value).toBe('23:00:00');
			});

			it('should scroll the selected item into view if it is below the view', async () => {
				element.value = '00:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);

				expect(isScrolledIntoView(getPickerItem('hours', '23'))).toBe(true);
			});

			it('should scroll the selected item into view if it is above the view', async () => {
				element.value = '00:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);
				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(isScrolledIntoView(getPickerItem('hours', '00'))).toBe(true);
			});

			it('should move focus to the next picker when clicking on an item', async () => {
				getPickerItem('hours', '00').click();
				await elementUpdated(element);

				expect(element.shadowRoot?.activeElement?.id).toBe('minutes');
			});

			it('should close the popup when clicking on an item in the last picker', async () => {
				getPickerItem('minutes', '30').click();
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});
		});
	});

	describe('popup', () => {
		let eventSpy: any;
		let spy: any;

		beforeEach(() => {
			spy = jest.fn();
			getBaseElement(element).addEventListener('keydown', spy);
			eventSpy = jest.spyOn(KeyboardEvent.prototype, 'preventDefault');
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

		it('should allow propgation on escape key if closed', async () => {
			const parentSpy = jest.fn();
			element.addEventListener('keydown', parentSpy);
			pressKey('Escape', {}, true);
			await elementUpdated(element);
			expect(parentSpy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key', async () => {
			await openPopup();

			const parentSpy = jest.fn();
			element.addEventListener('keydown', parentSpy);
			pressKey('Escape');
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
		it('should close when clicking outside the time-picker', async () => {
			await openPopup();

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
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
					'.dialog [tabindex="0"], .dialog vwc-button'
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
			event.preventDefault = jest.fn();
			element.shadowRoot!.activeElement?.dispatchEvent(event);

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

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
