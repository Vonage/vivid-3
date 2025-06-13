import { elementUpdated, fixture } from '@repo/shared';
import * as TrappedFocus from '../../../patterns/trapped-focus';
import { InlineTimePicker } from './inline-time-picker';
import '.';

const COMPONENT_TAG = 'vwc-inline-time-picker';

const labelsFrom = (from: number, to: number, step = 1) =>
	Array.from({ length: (to - from) / step + 1 }, (_, i) => from + i * step).map(
		(n) => n.toString().padStart(2, '0')
	);

describe('vwc-inline-time-picker', () => {
	let element: InlineTimePicker;

	const getPickerItem = (
		type: 'hours' | 'minutes' | 'seconds' | 'meridies',
		value: string
	) => element.shadowRoot!.querySelector(`#${type}-${value}`) as HTMLElement;

	const getAllPickerItems = (
		type: 'hours' | 'minutes' | 'seconds' | 'meridies'
	) => Array.from(element.shadowRoot!.querySelectorAll(`[id^="${type}-"]`));

	const getLabels = (type: 'hours' | 'minutes' | 'seconds' | 'meridies') =>
		getAllPickerItems(type).map((item) => item.innerHTML.trim());

	const pressKey = (key: string, options: KeyboardEventInit = {}) => {
		const event = new KeyboardEvent('keydown', {
			key,
			bubbles: true,
			composed: true,
			...options,
		});
		element.shadowRoot!.activeElement!.dispatchEvent(event);
		return event;
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
		)) as InlineTimePicker;

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

	describe('initialization', () => {
		it('should display the list of minutes', () => {
			expect(getLabels('minutes')).toEqual(labelsFrom(0, 59));
		});
	});

	describe('value', () => {
		it('should initialize to undefined', () => {
			expect(element.value).toBe(undefined);
		});

		it('should accept a valid time string', () => {
			element.value = '12:00:00';
			expect(element.value).toBe('12:00:00');
		});

		it('should revert to undefined if set to an invalid value', () => {
			element.value = 'x';
			expect(element.value).toBe(undefined);
		});
	});

	describe('min', () => {
		it('should default to undefined', () => {
			expect(element.min).toBe(undefined);
		});

		it('should hide hours before the min time', async () => {
			element.min = '12:00:00';
			await elementUpdated(element);

			expect(getLabels('hours')).toEqual(labelsFrom(12, 23));
		});

		it('should hide minutes before the min time if the hour is the min hour', async () => {
			element.min = '12:15:00';
			element.value = '12:30:00';
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(15, 59));
		});

		it('should show all minutes if the hour is not the min hour', async () => {
			element.min = '12:15:00';
			element.value = '13:30:00';
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(0, 59));
		});

		it('should hide seconds before the min time if hour and minute are the min time', async () => {
			element.min = '12:15:15';
			element.value = '12:15:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(15, 59));
		});

		it('should show all seconds if hour and minute are not the min time', async () => {
			element.min = '12:15:15';
			element.value = '12:30:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 59));
		});

		it('should hide AM option if min is in PM', async () => {
			element.clock = '12h';
			element.min = '12:00:00';
			await elementUpdated(element);

			expect(getPickerItem('meridies', 'AM')).toBe(null);
			expect(getPickerItem('meridies', 'PM')).toBeInstanceOf(HTMLElement);
		});
	});

	describe('max', () => {
		it('should default to undefined', () => {
			expect(element.max).toBe(undefined);
		});

		it('should hide hours after the max time', async () => {
			element.max = '12:00:00';
			await elementUpdated(element);

			expect(getLabels('hours')).toEqual(labelsFrom(0, 12));
		});

		it('should hide minutes after the max time if the hour is the max hour', async () => {
			element.max = '12:45:00';
			element.value = '12:30:00';
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(0, 45));
		});

		it('should show all minutes if hour is not the max hour', async () => {
			element.max = '12:45:00';
			element.value = '11:30:00';
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(0, 59));
		});

		it('should hide seconds after the max time if hour and minute are the max time', async () => {
			element.max = '12:45:45';
			element.value = '12:45:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 45));
		});

		it('should show all seconds if hour and minute are not the max time', async () => {
			element.max = '12:45:45';
			element.value = '11:45:30';
			element.secondsStep = 1;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 59));
		});

		it('should hide PM option if max is in AM', async () => {
			element.clock = '12h';
			element.max = '11:59:59';
			await elementUpdated(element);

			expect(getPickerItem('meridies', 'AM')).toBeInstanceOf(HTMLElement);
			expect(getPickerItem('meridies', 'PM')).toBe(null);
		});
	});

	describe('clock', () => {
		it('should default to 24h', () => {
			expect(element.clock).toBe('24h');
		});

		describe('12h', () => {
			beforeEach(async () => {
				element.clock = '12h';
				await elementUpdated(element);
			});

			it('should show the meridies picker', async () => {
				expect(element.shadowRoot?.querySelector('#meridies')).toBeInstanceOf(
					HTMLElement
				);
			});

			it('should show the hours options from 12-11', async () => {
				expect(getLabels('hours')).toEqual(['12', ...labelsFrom(1, 11)]);
			});
		});

		describe('24h', () => {
			beforeEach(async () => {
				element.clock = '24h';
				await elementUpdated(element);
			});

			it('should hide the meridies picker', async () => {
				expect(element.shadowRoot?.querySelector('#meridies')).toBe(null);
			});

			it('should show the hours options from 0-23', async () => {
				expect(getLabels('hours')).toEqual(labelsFrom(0, 23));
			});
		});
	});

	describe('minutesStep', () => {
		it('should default to 1', () => {
			expect(element.minutesStep).toBe(1);
		});

		it('should hide minutes that are not a multiple of minutesStep', async () => {
			element.minutesStep = 15;
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(0, 45, 15));
		});

		it('should ignore minutesStep of less than 1', async () => {
			element.minutesStep = 0;
			await elementUpdated(element);

			expect(getLabels('minutes')).toEqual(labelsFrom(0, 59));
		});
	});

	describe('secondsStep', () => {
		it('should default to undefined', () => {
			expect(element.secondsStep).toBe(undefined);
		});

		it('should not display list of seconds options when null', () => {
			expect(element.shadowRoot!.querySelector('#seconds')).toBe(null);
		});

		it('should display the list of seconds when provided', async () => {
			element.secondsStep = 1;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 59));
		});

		it('should hide seconds that are not a multiple of secondsStep', async () => {
			element.secondsStep = 15;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 45, 15));
		});

		it('should ignore secondsStep of less than 1', async () => {
			element.secondsStep = 0;
			await elementUpdated(element);

			expect(getLabels('seconds')).toEqual(labelsFrom(0, 59));
		});
	});

	describe('change event', () => {
		it('should be fired with the updated time when a user clicks on an item in the picker', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getPickerItem('hours', '03').click();

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ detail: '03:00:00' })
			);
		});

		it('should be fired if a user select a value from the picker via keyboard', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);
			(element.shadowRoot!.querySelector('#hours') as HTMLElement).focus();

			pressKey('ArrowDown');

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ detail: '00:00:00' })
			);
		});

		it('should be prevented from bubbling', () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getPickerItem('hours', '03').click();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});

		it('should be emitted with composed set to false', () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getPickerItem('hours', '03').click();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ composed: false })
			);
		});
	});

	describe('last-column-selected event', () => {
		it('should be fired when clicking on an item in the last picker', async () => {
			const spy = vi.fn();
			element.addEventListener('last-column-selected', spy);

			getPickerItem('minutes', '30').click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be prevented from bubbling', () => {
			const spy = vi.fn();
			element.addEventListener('last-column-selected', spy);

			getPickerItem('minutes', '30').click();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('scrollSelectedOptionsToTop method', () => {
		it('should scroll selected items to the top if a time is selected', async () => {
			element.clock = '12h';
			element.secondsStep = 1;
			element.value = '12:34:56';
			await elementUpdated(element);

			element.scrollSelectedOptionsToTop();

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
				element.scrollSelectedOptionsToTop();
			}).not.toThrow();
		});
	});

	describe('time picker', () => {
		let lastValue: string | undefined;
		beforeEach(() => {
			lastValue = undefined;
			element.addEventListener('change', (event) => {
				lastValue = (event as CustomEvent<string>).detail;
			});
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

			expect(lastValue).toBe('13:00:00');
		});

		it('should change the hour when clicking on an hour', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			getPickerItem('hours', '14').click();
			await elementUpdated(element);

			expect(lastValue).toBe('14:45:00');
		});

		it('should set a time when clicking on a minute', async () => {
			getPickerItem('minutes', '30').click();
			await elementUpdated(element);

			expect(lastValue).toBe('00:30:00');
		});

		it('should change the minute when clicking on an minute', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			getPickerItem('minutes', '30').click();
			await elementUpdated(element);

			expect(lastValue).toBe('13:30:00');
		});

		it('should set a time when clicking on a second', async () => {
			element.secondsStep = 1;
			await elementUpdated(element);
			getPickerItem('seconds', '30').click();
			await elementUpdated(element);

			expect(lastValue).toBe('00:00:30');
		});

		it('should change the second when clicking on a second', async () => {
			element.secondsStep = 1;
			element.value = '13:45:45';
			await elementUpdated(element);

			getPickerItem('seconds', '30').click();
			await elementUpdated(element);

			expect(lastValue).toBe('13:45:30');
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

				expect(lastValue).toBe(expectedValue);
			}
		);

		it('should set a time when clicking on a meridiem', async () => {
			element.clock = '12h';
			await elementUpdated(element);
			getPickerItem('meridies', 'PM').click();
			await elementUpdated(element);

			expect(lastValue).toBe('12:00:00');
		});

		it('should change the meridiem to PM when clicking PM', async () => {
			element.clock = '12h';
			element.value = '01:00:00';
			await elementUpdated(element);

			getPickerItem('meridies', 'PM').click();
			await elementUpdated(element);

			expect(lastValue).toBe('13:00:00');
		});

		it('should change the meridiem to AM when clicking AM', async () => {
			element.clock = '12h';
			element.value = '13:00:00';
			await elementUpdated(element);

			getPickerItem('meridies', 'AM').click();
			await elementUpdated(element);

			expect(lastValue).toBe('01:00:00');
		});

		it('should scroll an item to top when clicking on it', async () => {
			element.value = '00:00:00';
			await elementUpdated(element);

			getPickerItem('hours', '12').click();
			await elementUpdated(element);

			expect(isScrolledToTop(getPickerItem('hours', '12'))).toBe(true);
		});

		it('should move focus to the next picker when clicking on an item', async () => {
			getPickerItem('hours', '00').click();
			await elementUpdated(element);

			expect(element.shadowRoot?.activeElement?.id).toBe('minutes');
		});

		describe('keyboard navigation', () => {
			beforeEach(() => {
				(element.shadowRoot!.querySelector('#hours') as HTMLElement).focus();
			});

			it.each(['ArrowDown', 'ArrowUp'])(
				'should select the first item when pressing %s while nothing is selected',
				async (key) => {
					pressKey(key);
					await elementUpdated(element);

					expect(lastValue).toBe('00:00:00');
				}
			);

			it('should select the next item when pressing ArrowDown', async () => {
				element.value = '01:00:00';
				await elementUpdated(element);

				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(lastValue).toBe('02:00:00');
			});

			it('should select the first item when pressing ArrowDown while the last item is selected', async () => {
				element.value = '23:00:00';
				await elementUpdated(element);

				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(lastValue).toBe('00:00:00');
			});

			it('should select the previous item when pressing ArrowUp', async () => {
				element.value = '03:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);

				expect(lastValue).toBe('02:00:00');
			});

			it('should select the last item when pressing ArrowUp while the first item is selected', async () => {
				element.value = '00:00:00';
				await elementUpdated(element);

				pressKey('ArrowUp');
				await elementUpdated(element);

				expect(lastValue).toBe('23:00:00');
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
				element.value = '23:00:00';
				await elementUpdated(element);
				pressKey('ArrowDown');
				await elementUpdated(element);

				expect(isScrolledIntoView(getPickerItem('hours', '00'))).toBe(true);
			});

			describe('focus trap support', () => {
				beforeEach(() => {
					vi.spyOn(TrappedFocus, 'ignoreEventInFocusTraps');
				});
				afterEach(() => {
					vi.restoreAllMocks();
				});

				it('should call focus trap ignoreEventInFocusTraps on tab keydown when focused on non-terminal picker element', () => {
					(element.shadowRoot!.querySelector('#hours') as HTMLElement).focus();

					const event = pressKey('Tab');

					expect(TrappedFocus.ignoreEventInFocusTraps).toHaveBeenCalledTimes(1);
					expect(TrappedFocus.ignoreEventInFocusTraps).toHaveBeenCalledWith(
						event
					);
				});

				it('should prevent call to focus trap ignoreEventInFocusTraps on shift + tab keydown when focused on first picker element', () => {
					(element.shadowRoot!.querySelector('#hours') as HTMLElement).focus();
					pressKey('Tab', { shiftKey: true });

					expect(TrappedFocus.ignoreEventInFocusTraps).not.toHaveBeenCalled();
				});

				it('should prevent call to focus trap ignoreEventInFocusTraps on tab keydown when focused on last picker element', () => {
					(
						element.shadowRoot!.querySelector('#minutes') as HTMLElement
					).focus();
					pressKey('Tab');

					expect(TrappedFocus.ignoreEventInFocusTraps).not.toHaveBeenCalled();
				});
			});
		});
	});

	describe('focus method', () => {
		it('should focus the first picker programmatically to avoid visual focus', async () => {
			const firstPicker = element.shadowRoot!.querySelector(
				'#hours'
			) as HTMLElement;
			const focusSpy = vi.spyOn(firstPicker, 'focus');
			const options = {};

			element.focus(options);

			expect(element.shadowRoot!.activeElement).toBe(firstPicker);
			expect(focusSpy).toHaveBeenCalledWith(options);
		});
	});
});
