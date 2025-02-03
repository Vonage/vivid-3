import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import { DialPad } from './dial-pad';
import '.';

const COMPONENT_TAG = 'vwc-dial-pad';

describe('vwc-dial-pad', () => {
	let element: DialPad;

	function getTextField() {
		return getBaseElement(element).querySelector('.phone-field') as TextField;
	}

	function getCallButton() {
		return getBaseElement(element).querySelector('.call-btn') as Button;
	}

	function getDigitButtons() {
		const digits: HTMLDivElement | null =
			getBaseElement(element).querySelector('.digits');
		return digits?.querySelectorAll('vwc-button') as NodeListOf<Button>;
	}

	function getDeleteButton() {
		return getTextField().querySelector('vwc-button') as Button;
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DialPad;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-dial-pad', async () => {
			expect(element).toBeInstanceOf(DialPad);
			expect(element.pattern).toEqual('^[0-9#*]*$');
			expect(element.value).toEqual('');
			expect(element.disabled).toBeFalsy();
			expect(element.pending).toBeFalsy();
			expect(element.callActive).toBeFalsy();
			expect(element.noCall).toBeFalsy();
			expect(element.callButtonLabel).toBeNull();
			expect(element.endCallButtonLabel).toBeNull();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('text-field', function () {
		it('should set text field in dial pad', async function () {
			expect(getTextField()).not.toBeNull();
		});

		it('should set value in text field when has value attribute', async function () {
			const value = '123';
			await setValue(value);
			expect(getTextField().value).toEqual(value);
		});

		it('should set helperText in text field when has helper-text attribute', async function () {
			const helperText = '123';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(getTextField().helperText).toEqual(helperText);
		});

		it('should set placeholder in text field when has placeholder attribute', async function () {
			const placeholder = '123';
			element.placeholder = placeholder;
			await elementUpdated(element);
			expect(getTextField().placeholder).toEqual(placeholder);
		});

		it('should activate number buttons when input event is fired a number for 200ms', async function () {
			const digitButton = getDigitButtons()[3];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: digitButton.value })
			);
			const activeStateAfterTyping = digitButton.active;

			vi.advanceTimersByTime(200);
			vi.useRealTimers();

			expect(activeStateBeforeTyping).toBe(false);
			expect(activeStateAfterTyping).toBe(true);
			expect(digitButton.active).toBe(false);
		});

		it('should activate * buttons when input event is fired a * for 200ms', async function () {
			const digitButton = getDigitButtons()[9];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: digitButton.value })
			);
			const activeStateAfterTyping = digitButton.active;

			vi.advanceTimersByTime(200);
			vi.useRealTimers();

			expect(activeStateBeforeTyping).toBe(false);
			expect(activeStateAfterTyping).toBe(true);
			expect(digitButton.active).toBe(false);
		});

		it('should activate # buttons when input event is fired a # for 200ms', async function () {
			const digitButton = getDigitButtons()[11];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: digitButton.value })
			);
			const activeStateAfterTyping = digitButton.active;

			vi.advanceTimersByTime(200);
			vi.useRealTimers();

			expect(activeStateBeforeTyping).toBe(false);
			expect(activeStateAfterTyping).toBe(true);
			expect(digitButton.active).toBe(false);
		});

		it('should ignore input with unsupported keys', async function () {
			function areAllDigitButtonsFalse() {
				return Array.from(getDigitButtons()).every((b) => b.active === false);
			}

			const allDigitButtonsFlaseBefore = areAllDigitButtonsFalse();

			getTextField().dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
			elementUpdated(element);

			expect(allDigitButtonsFlaseBefore).toBe(true);
			expect(areAllDigitButtonsFalse()).toBe(true);
		});
	});

	async function setValue(value: string) {
		element.value = value;
		await elementUpdated(element);
	}

	describe('delete', function () {
		async function clickDeleteButton() {
			getDeleteButton().click();
			await elementUpdated(element);
		}

		it('should show delete button when text field has value', async function () {
			await setValue('123');
			expect(getDeleteButton()).not.toBeNull();
		});

		it('should remove last character from text field when clicked on delete button', async function () {
			await setValue('123');

			await clickDeleteButton();

			expect(getTextField().value).toEqual('12');
		});

		it('should emit a change event', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);
			await setValue('123');

			await clickDeleteButton();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit an input event', async () => {
			const spy = vi.fn();
			element.addEventListener('input', spy);
			await setValue('123');

			await clickDeleteButton();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should prevent blur event after deleting the last value', async () => {
			const spy = vi.fn();
			element.addEventListener('blur', spy);
			await setValue('1');

			await clickDeleteButton();

			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should focus on the dialpad after deleting the last element', async () => {
			await setValue('1');

			await clickDeleteButton();

			expect(document.activeElement === element).toBe(true);
		});
	});

	describe('dial', function () {
		it('should fire dial event when clicked on call button', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await elementUpdated(element);
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not fire dial event when enter is pressed on text field and pending', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.pending = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and disabled', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.disabled = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and callActive', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.callActive = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and noCall', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.noCall = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and value is empty', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire dial event when enter is pressed on input', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await setValue('123');
			const input: HTMLInputElement = getTextField().querySelector(
				'input'
			) as HTMLInputElement;
			input.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Enter',
					bubbles: true,
					composed: true,
				})
			);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should fire dial event with value when clicked on call button', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await setValue('123');
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should prevent dial event when enter is pressed on delete button', async function () {
			const spy = vi.fn();
			await setValue('123');
			element.addEventListener('dial', spy);
			getDeleteButton().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire end-call event when clicked on call button when active', async function () {
			const spy = vi.fn();
			element.addEventListener('end-call', spy);
			element.callActive = true;
			await elementUpdated(element);
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('events', () => {
		function dispatchEvent(eventType: string) {
			getTextField().dispatchEvent(
				new InputEvent(eventType, { bubbles: true, composed: true })
			);
		}

		function shouldFireEventOnceFromTextField(eventName: string) {
			it('should fire only once on the dial pad element', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				dispatchEvent(eventName);
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(1);
			});
		}

		function shouldFireOnDialPadButtonClick(eventName: string) {
			it('should fire when user clicks the dial pad buttons', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);
				getDigitButtons().forEach((button) => {
					button.click();
				});

				await elementUpdated(element);
				expect(spy).toHaveBeenCalledTimes(12);
			});
		}

		function shouldSetElementValueAfterEvent(eventName: string) {
			it('should set element value after event', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				getTextField().value = '55';
				dispatchEvent(eventName);
				await elementUpdated(element);

				expect(element.value).toBe('55');
			});
		}

		describe('keypad-click', function () {
			it('should fire keypad-click event when a keypad button is clicked', async function () {
				const spy = vi.fn();
				element.addEventListener('keypad-click', spy);
				await elementUpdated(element);
				getDigitButtons().forEach((button) => {
					button.click();
				});
				expect(spy).toHaveBeenCalledTimes(12);
			});

			it('should fire keypad-click event with the button which was clicked', async function () {
				const spy = vi.fn();
				element.addEventListener('keypad-click', spy);
				await elementUpdated(element);
				getDigitButtons().forEach((button) => {
					button.click();
					expect(spy).toHaveBeenCalledWith(
						expect.objectContaining({ detail: button })
					);
				});
			});

			it('should set value in text field when clicked on keypad', async function () {
				await elementUpdated(element);
				getDigitButtons().forEach((button) => {
					button.click();
				});
				await elementUpdated(element);
				expect(getTextField().value).toEqual('123456789*0#');
			});

			it('should prevent focus and blur events on subsequent keypad buttons', async () => {
				const spy = vi.fn();
				element.addEventListener('focus', spy);
				element.addEventListener('blur', spy);
				getDigitButtons().forEach((button) => {
					button.focus();
					button.blur();
				});
				await elementUpdated(element);
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});

		describe('focus event', () => {
			const eventName = 'focus';
			it('should prevent propagation of focus event from textfield', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				dispatchEvent(eventName);
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(0);
			});
		});

		describe('blur event', () => {
			const eventName = 'blur';
			it('should prevent propagation of blur event from textfield', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				dispatchEvent(eventName);
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(0);
			});
		});

		describe('input event', () => {
			const eventName = 'input';
			shouldFireOnDialPadButtonClick(eventName);
			shouldFireEventOnceFromTextField(eventName);
			shouldSetElementValueAfterEvent(eventName);
		});

		describe('change event', () => {
			const eventName = 'change';
			shouldFireOnDialPadButtonClick(eventName);
			shouldFireEventOnceFromTextField(eventName);
			shouldSetElementValueAfterEvent(eventName);
		});
	});

	describe('disabled', function () {
		it('should set text field disabled when has disabled attribute', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(getTextField().disabled).toEqual(true);
		});

		it('should set call button disabled when has disabled attribute', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(getCallButton().disabled).toEqual(true);
		});

		it('should set digit buttons disabled when has disabled attribute', async function () {
			element.disabled = true;
			await elementUpdated(element);
			getDigitButtons().forEach((button) => {
				expect(button.disabled).toEqual(true);
			});
		});

		it('should set delete button disabled when has disabled attribute', async function () {
			element.disabled = true;
			await setValue('123');
			expect(getDeleteButton().disabled).toEqual(true);
		});
	});

	describe('active', function () {
		it('should change call button connotation to "alert" when active', async function () {
			element.callActive = true;
			expect(getCallButton().connotation).toEqual('cta');
			await elementUpdated(element);
			expect(getCallButton().connotation).toEqual('alert');
		});

		it('should change call buttons label when active', async function () {
			element.callActive = true;
			expect(getCallButton().label).toEqual('Call');
			await elementUpdated(element);
			expect(getCallButton().label).toEqual('End call');
		});

		it('should set the delete button to be disabled', async function () {
			element.callActive = true;
			await setValue('123');
			expect(getDeleteButton().disabled).toBe(true);
		});
	});

	describe('noCall', function () {
		it('should remove call button when has no-call attribute', async function () {
			element.noCall = true;
			await elementUpdated(element);
			expect(getCallButton()).toBeNull();
		});
	});

	describe('noInput', function () {
		it('should remove text field when has no-input attribute', async function () {
			element.noInput = true;
			await elementUpdated(element);
			expect(getTextField()).toBeNull();
		});
	});

	describe('pending', function () {
		it('should set call button pending when has pending attribute', async function () {
			element.pending = true;
			await elementUpdated(element);
			expect(getCallButton().pending).toEqual(true);
		});
	});

	describe('callButtonLabel', function () {
		it('should set call button label when has call-button-label attribute', async function () {
			const label = '123';
			element.callButtonLabel = label;
			await elementUpdated(element);
			expect(getCallButton().label).toEqual(label);
		});

		it('should set call button label when has end-call-button-label attribute', async function () {
			const label = '123';
			element.callActive = true;
			element.endCallButtonLabel = label;
			await elementUpdated(element);
			expect(getCallButton().label).toEqual(label);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
