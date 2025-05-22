import { createFormHTML, elementUpdated, fixture } from '@vivid-nx/shared';
import { setLocale } from '../../shared/localization';
import { Popup } from '../popup/popup';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import enGB from '../../locales/en-GB';
import enUS from '../../locales/en-US';
import { pickerFieldSpec } from '../../shared/picker-field/picker-field.spec';
import type { InlineTimePicker } from '../../shared/picker-field/mixins/inline-time-picker/inline-time-picker';
import { TimePicker } from './time-picker';
import '.';

const COMPONENT_TAG = 'vwc-time-picker';

describe('vwc-time-picker', () => {
	let element: TimePicker;
	let textField: TextField;
	let pickerButton: Button;
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
		pickerButton.click();
		await elementUpdated(element);
	}

	const getButtonByLabel = (label: string) =>
		(element.shadowRoot!.querySelector(`[aria-label="${label}"]`) ??
			element.shadowRoot!.querySelector(`[label="${label}"]`)) as Button;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TimePicker;
		textField = element.shadowRoot!.querySelector('.control') as TextField;
		pickerButton = element.shadowRoot!.querySelector(
			'#picker-button'
		) as Button;
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

	describe('picker field', () => {
		pickerFieldSpec(
			COMPONENT_TAG,
			(shadowRoot) => {
				return {
					firstFocusable: shadowRoot.querySelector('#inline-time-picker')!,
					lastFocusable: shadowRoot.querySelector('vwc-button[label="OK"]')!,
				};
			},
			'12:00:00'
		);
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

		it('should update value when a user enters a valid time into the text field', async () => {
			typeIntoTextField('01:45 PM');
			await elementUpdated(element);

			expect(element.value).toBe('13:45:00');
		});

		it('should keep an empty value when a user enters a invalid time into the text field', async () => {
			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
		});

		it('should clear the value but keep invalid input when a user enters a invalid time into the text field', async () => {
			element.value = '12:34:56';

			typeIntoTextField('x');
			await elementUpdated(element);

			expect(element.value).toBe('');
			expect(textField.value).toBe('x');
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
		it('should be fired when a user enters a valid time into the text field', async () => {
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

		it('should show an invalid time error when an invalid time is entered', async () => {
			typeIntoTextField('invalid time');
			textField.dispatchEvent(new Event('blur'));
			await elementUpdated(element);

			expect(textField.errorText).toBe('Please enter a valid time.');
		});

		it('should clear the invalid time error when a valid time is entered', async () => {
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

	describe('picker button', () => {
		it('should have an icon of "clock-line"', async () => {
			expect(pickerButton.icon).toBe('clock-line');
		});

		it('should have an aria-label of "Choose time" when no time is selected', async () => {
			expect(pickerButton.getAttribute('aria-label')).toBe('Choose time');
		});

		it('should have an aria-label of "Change time, TIME" when a time is selected', async () => {
			element.value = '13:45:00';
			await elementUpdated(element);

			expect(pickerButton.getAttribute('aria-label')).toBe(
				'Change time, 01:45 PM'
			);
		});

		it('should scroll selected options to the top if a time is selected', async () => {
			element.secondsStep = 1;
			element.value = '12:34:56';
			await elementUpdated(element);
			inlineTimePicker.scrollSelectedOptionsToTop = vi.fn();

			pickerButton.click();
			await elementUpdated(element);

			expect(inlineTimePicker.scrollSelectedOptionsToTop).toHaveBeenCalledTimes(
				1
			);
		});
	});

	describe('popup', () => {
		it('should close when an option in the last picker column is selected', async () => {
			await openPopup();

			inlineTimePicker.dispatchEvent(new CustomEvent('last-column-selected'));
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});
	});

	describe('dialog', () => {
		beforeEach(async () => {
			await openPopup();
		});

		it('should have an accessible name of "Choose time"', () => {
			expect(
				element.shadowRoot!.querySelector('.dialog')!.getAttribute('aria-label')
			).toBe('Choose time');
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
		const fieldValue = '10:10:10';
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
			const { form: formElement, element } = createFormHTML<TimePicker>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			element.value = '20:20:20';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue);
		});
	});
});
