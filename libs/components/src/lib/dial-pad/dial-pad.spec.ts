import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import { Updates } from '@microsoft/fast-element';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import { DialPad } from './dial-pad';
import '.';

const COMPONENT_TAG = 'vwc-dial-pad';

describe('vwc-dial-pad', () => {
	let element: DialPad;

	function getTextField(component: HTMLElement) {
		return getBaseElement(component).querySelector('.phone-field') as TextField;
	}

	function getInput(component: HTMLElement) {
		return getTextField(component).querySelector(
			'input[slot=_control]'
		) as HTMLInputElement;
	}

	function getCallButton(component: HTMLElement) {
		return getBaseElement(component).querySelector('.call-btn') as Button;
	}

	function getDigitButtons(component: HTMLElement) {
		const digits: HTMLDivElement | null =
			getBaseElement(component).querySelector('.digits');
		return digits!.querySelectorAll('vwc-button');
	}

	function getDeleteButton(component: HTMLElement) {
		return getTextField(component).querySelector('vwc-button')!;
	}

	function getZeroButton(component: HTMLElement) {
		return getDigitButtons(component)[10] as Button;
	}

	async function setValue(value: string) {
		element.value = value;
		await Updates.next();
	}

	function getActiveElement(root: ShadowRoot | Document = document) {
		const activeEl = root.activeElement;
		if (activeEl && activeEl.shadowRoot) {
			return getActiveElement(activeEl.shadowRoot);
		}
		return activeEl;
	}

	function withFakeTimers(callback: () => void) {
		vi.useFakeTimers();
		try {
			callback();
		} finally {
			vi.useRealTimers();
		}
	}

	function createPointerEvent(
		type: string,
		options: EventInit = {}
	): PointerEvent {
		// Create a mock PointerEvent for test environment
		const event = new Event(type, options) as PointerEvent;
		Object.defineProperty(event, 'pointerType', {
			value: 'mouse',
			writable: true,
		});
		Object.defineProperty(event, 'pointerId', {
			value: 1,
			writable: true,
		});
		return event;
	}

	function simulatePointerLongPress(
		button: HTMLElement,
		options: {
			duration?: number;
			onComplete?: () => void;
			onLeave?: () => void;
		} = {}
	) {
		const { duration = 600, onComplete, onLeave } = options;
		const pointerDown = createPointerEvent('pointerdown', {
			bubbles: true,
		});
		const pointerUp = createPointerEvent('pointerup', {
			bubbles: true,
		});

		Object.defineProperty(pointerDown, 'currentTarget', {
			value: button,
			writable: true,
		});
		button.dispatchEvent(pointerDown);
		vi.advanceTimersByTime(duration);

		if (onLeave) {
			onLeave();
		}
		button.dispatchEvent(pointerUp);

		if (onComplete) {
			onComplete();
		}
		vi.runAllTimers();
	}

	function simulateKeyboardLongPress(
		input: HTMLInputElement,
		options: {
			key?: string;
			pressDuration?: number;
			releaseAfter?: number;
		} = {}
	) {
		const {
			key = ' ',
			pressDuration = 650,
			releaseAfter: providedReleaseAfter,
		} = options;
		const releaseAfter =
			providedReleaseAfter !== undefined ? providedReleaseAfter : pressDuration;
		const keyDown = new KeyboardEvent('keydown', {
			key,
			bubbles: true,
			repeat: false,
		});
		input.dispatchEvent(keyDown);
		vi.advanceTimersByTime(releaseAfter);
		const keyUp = new KeyboardEvent('keyup', {
			key,
			bubbles: true,
		});
		input.dispatchEvent(keyUp);
		vi.runAllTimers();
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
			expect(element.autofocus).toBeFalsy();
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
			expect(getTextField(element)).not.toBeNull();
		});

		it('should set value in text field when has value attribute', async function () {
			const value = '123';
			await setValue(value);
			expect(getTextField(element).value).toEqual(value);
		});

		it('should set helperText in text field when has helper-text attribute', async function () {
			const helperText = '123';
			element.helperText = helperText;
			await Updates.next();
			expect(getTextField(element).helperText).toEqual(helperText);
		});

		it('should set placeholder in text field when has placeholder attribute', async function () {
			const placeholder = '123';
			element.placeholder = placeholder;
			await Updates.next();
			expect(getTextField(element).placeholder).toEqual(placeholder);
		});

		it('should activate number buttons when input event is fired a number for 200ms', async function () {
			const digitButton = getDigitButtons(element)[3];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField(element).dispatchEvent(
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
			const digitButton = getDigitButtons(element)[9];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField(element).dispatchEvent(
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
			const digitButton = getDigitButtons(element)[11];
			const activeStateBeforeTyping = digitButton.active;
			vi.useFakeTimers();

			getTextField(element).dispatchEvent(
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
				return Array.from(getDigitButtons(element)).every(
					(b) => b.active === false
				);
			}

			const allDigitButtonsFlaseBefore = areAllDigitButtonsFalse();

			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'a' })
			);
			elementUpdated(element);

			expect(allDigitButtonsFlaseBefore).toBe(true);
			expect(areAllDigitButtonsFalse()).toBe(true);
		});
	});

	describe('delete', function () {
		async function clickDeleteButton() {
			getDeleteButton(element).click();
			await Updates.next();
		}

		it('should show delete button when text field has value', async function () {
			await setValue('123');
			expect(getDeleteButton(element)).not.toBeNull();
		});

		it('should remove last character from text field when clicked on delete button', async function () {
			await setValue('123');

			await clickDeleteButton();

			expect(getTextField(element).value).toEqual('12');
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
			await Updates.next();
			getCallButton(element).click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not fire dial event when enter is pressed on text field and pending', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.pending = true;
			await Updates.next();
			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and disabled', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.disabled = true;
			await Updates.next();
			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and callActive', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.callActive = true;
			await Updates.next();
			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and noCall', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			element.noCall = true;
			await Updates.next();
			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and value is empty', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await Updates.next();
			getTextField(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire dial event when enter is pressed on input', async function () {
			const spy = vi.fn();
			element.addEventListener('dial', spy);
			await setValue('123');
			const input: HTMLInputElement = getTextField(element).querySelector(
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
			getCallButton(element).click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should prevent dial event when enter is pressed on delete button', async function () {
			const spy = vi.fn();
			await setValue('123');
			element.addEventListener('dial', spy);
			getDeleteButton(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire end-call event when clicked on call button when active', async function () {
			const spy = vi.fn();
			element.addEventListener('end-call', spy);
			element.callActive = true;
			await Updates.next();
			getCallButton(element).click();
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('events', () => {
		function dispatchEvent(eventType: string) {
			getTextField(element).dispatchEvent(
				new InputEvent(eventType, { bubbles: true, composed: true })
			);
		}

		function shouldFireEventOnceFromTextField(eventName: string) {
			it('should fire only once on the dial pad element', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				dispatchEvent(eventName);
				await Updates.next();

				expect(spy).toHaveBeenCalledTimes(1);
			});
		}

		function shouldFireOnDialPadButtonClick(eventName: string) {
			it('should fire when user clicks the dial pad buttons', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);
				getDigitButtons(element).forEach((button) => {
					button.click();
				});

				await Updates.next();
				expect(spy).toHaveBeenCalledTimes(12);
			});
		}

		function shouldSetElementValueAfterEvent(eventName: string) {
			it('should set element value after event', async () => {
				const spy = vi.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				getTextField(element).value = '55';
				dispatchEvent(eventName);
				await Updates.next();

				expect(element.value).toBe('55');
			});
		}

		describe('keypad-click', function () {
			it('should fire keypad-click event when a keypad button is clicked', async function () {
				const spy = vi.fn();
				element.addEventListener('keypad-click', spy);
				await Updates.next();
				getDigitButtons(element).forEach((button) => {
					button.click();
				});
				expect(spy).toHaveBeenCalledTimes(12);
			});

			it('should fire keypad-click event with the button which was clicked', async function () {
				const spy = vi.fn();
				element.addEventListener('keypad-click', spy);
				await Updates.next();
				getDigitButtons(element).forEach((button) => {
					button.click();
					expect(spy).toHaveBeenCalledWith(
						expect.objectContaining({ detail: button })
					);
				});
			});

			it('should set value in text field when clicked on keypad', async function () {
				await Updates.next();
				getDigitButtons(element).forEach((button) => {
					button.click();
				});
				await Updates.next();
				expect(getTextField(element).value).toEqual('123456789*0#');
			});

			it('should prevent focus and blur events on subsequent keypad buttons', async () => {
				const spy = vi.fn();
				element.addEventListener('focus', spy);
				element.addEventListener('blur', spy);
				getDigitButtons(element).forEach((button) => {
					button.focus();
					button.blur();
				});
				await Updates.next();
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
				await Updates.next();

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
				await Updates.next();

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

	describe('long press on 0', () => {
		it('should add "0" when tapping 0', async () => {
			getZeroButton(element).click();
			await Updates.next();
			expect(getTextField(element).value).toEqual('0');
		});

		it('should add "+" when long pressing 0 and suppress subsequent click', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			await Updates.next();
			const btn = getZeroButton(element);
			withFakeTimers(() => {
				simulatePointerLongPress(btn, {
					duration: 600,
					onComplete: () => {
						btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
					},
				});
			});
			await Updates.next();

			await Updates.next();
			expect(getTextField(element).value).toEqual('+');
		});

		it('should not trigger long press on 0 when disabled', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			element.disabled = true;
			await Updates.next();
			const btn = getZeroButton(element);
			withFakeTimers(() => {
				simulatePointerLongPress(btn, { duration: 600 });
			});
			await Updates.next();
			expect(getTextField(element).value).toEqual('');
		});

		it('should not add "+" when pointer leaves 0 button before long press completes', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			await Updates.next();
			const btn = getZeroButton(element);
			withFakeTimers(() => {
				simulatePointerLongPress(btn, {
					duration: 300,
					onLeave: () => {
						// Leave before long press completes
						btn.dispatchEvent(
							createPointerEvent('pointerleave', {
								bubbles: true,
							})
						);
					},
				});
				vi.advanceTimersByTime(300);
			});
			await Updates.next();
			expect(getTextField(element).value).toEqual('');
		});
	});

	describe('Methods', () => {
		describe('focus', function () {
			it('should set the focus on the text field', async function () {
				element.focus();
				await Updates.next();

				const activeElement = getActiveElement();

				expect(activeElement).toEqual(getInput(element));
			});

			it('should prevent calling focus when disabled', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} disabled></${COMPONENT_TAG}>`
				)) as DialPad;

				const inputTextFocusSpy = vi.fn();
				element.addEventListener('focus', inputTextFocusSpy);

				element.focus();
				await Updates.next();

				expect(inputTextFocusSpy).not.toHaveBeenCalled();
			});

			describe("with 'no-input' attribute", function () {
				it('should set the focus on the first digit button', async function () {
					element = (await fixture(
						`<${COMPONENT_TAG} no-input></${COMPONENT_TAG}>`
					)) as DialPad;

					element.focus();
					await Updates.next();

					const activeElement = getActiveElement();

					const digitBtns = getDigitButtons(element);
					const firstDigitBtnEl =
						digitBtns[0]?.shadowRoot?.querySelector('button');

					expect(activeElement).toEqual(firstDigitBtnEl);
				});
			});
		});
	});

	describe('disabled', function () {
		it('should set text field disabled when has disabled attribute', async function () {
			element.disabled = true;
			await Updates.next();
			expect(getTextField(element).disabled).toEqual(true);
		});

		it('should set call button disabled when has disabled attribute', async function () {
			element.disabled = true;
			await Updates.next();
			expect(getCallButton(element).disabled).toEqual(true);
		});

		it('should set digit buttons disabled when has disabled attribute', async function () {
			element.disabled = true;
			await Updates.next();
			getDigitButtons(element).forEach((button) => {
				expect(button.disabled).toEqual(true);
			});
		});

		it('should set delete button disabled when has disabled attribute', async function () {
			element.disabled = true;
			await setValue('123');
			expect(getDeleteButton(element).disabled).toEqual(true);
		});
	});

	describe('active', function () {
		it('should change call button connotation to "alert" when active', async function () {
			element.callActive = true;
			expect(getCallButton(element).connotation).toEqual('cta');
			await Updates.next();
			expect(getCallButton(element).connotation).toEqual('alert');
		});

		it('should change call buttons label when active', async function () {
			element.callActive = true;
			expect(getCallButton(element).label).toEqual('Call');
			await Updates.next();
			expect(getCallButton(element).label).toEqual('End call');
		});

		it('should set the delete button to be disabled', async function () {
			element.callActive = true;
			await setValue('123');
			expect(getDeleteButton(element).disabled).toBe(true);
		});
	});

	describe('noCall', function () {
		it('should remove call button when has no-call attribute', async function () {
			element.noCall = true;
			await Updates.next();
			expect(getCallButton(element)).toBeNull();
		});
	});

	describe('noInput', function () {
		it('should remove text field when has no-input attribute', async function () {
			element.noInput = true;
			await Updates.next();
			expect(getTextField(element)).toBeNull();
		});
	});

	describe('pending', function () {
		it('should set call button pending when has pending attribute', async function () {
			element.pending = true;
			await Updates.next();
			expect(getCallButton(element).pending).toEqual(true);
		});
	});

	describe('callButtonLabel', function () {
		it('should set call button label when has call-button-label attribute', async function () {
			const label = '123';
			element.callButtonLabel = label;
			await Updates.next();
			expect(getCallButton(element).label).toEqual(label);
		});

		it('should set call button label when has end-call-button-label attribute', async function () {
			const label = '123';
			element.callActive = true;
			element.endCallButtonLabel = label;
			await Updates.next();
			expect(getCallButton(element).label).toEqual(label);
		});
	});

	describe('autofocus', function () {
		it('should set autofocus on the input element', async function () {
			const textField = getTextField(element);
			const inputEl = getInput(element);

			expect(textField.hasAttribute('autofocus')).toEqual(false);
			expect(inputEl.hasAttribute('autofocus')).toEqual(false);

			element.autofocus = true;
			await Updates.next();

			expect(textField.hasAttribute('autofocus')).toEqual(true);
			expect(inputEl.hasAttribute('autofocus')).toEqual(true);
		});

		it('should focus the input element when connected', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} autofocus></${COMPONENT_TAG}>`
			)) as DialPad;
			await Updates.next();

			const activeElement = getActiveElement();

			expect(activeElement).toEqual(getInput(element));
		});

		describe("dial-pad has 'no-input' attribute", function () {
			it('should set autofocus on the first digit button', async function () {
				const digitBtns = getDigitButtons(element);

				element.setAttribute('no-input', '');
				await Updates.next();

				expect(getTextField(element)).toBeNull();
				expect(
					Array.from(digitBtns).every((btn) => btn.autofocus === undefined)
				).toEqual(true);

				element.setAttribute('autofocus', '');
				await Updates.next();

				expect(digitBtns[0].autofocus).toEqual(true);
				expect(
					digitBtns[0]?.shadowRoot?.querySelector('button')?.autofocus
				).toEqual(true);
				expect(
					Array.from(digitBtns)
						.slice(1)
						.every((btn) => btn.autofocus === undefined)
				).toEqual(true);
			});

			it('should focus the first digit button element when connected', async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} autofocus no-input></${COMPONENT_TAG}>`
				)) as DialPad;
				await Updates.next();

				const digitBtns = getDigitButtons(element);

				const firstDigitBtnEl =
					digitBtns[0]?.shadowRoot?.querySelector('button');
				await Updates.next();
				const activeElement = getActiveElement();

				expect(activeElement).toEqual(firstDigitBtnEl);
			});
		});
	});

	describe('announce validation errors', function () {
		it('should announce validation error when dial is called with invalid input', async function () {
			const mockCheckValidity = vi.fn().mockReturnValue(false);
			const mockErrorMessage = 'Invalid characters entered';
			const textField = getTextField(element);
			textField.checkValidity = mockCheckValidity;
			textField.errorValidationMessage = mockErrorMessage;

			getCallButton(element).click();
			await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

			expect(mockCheckValidity).toHaveBeenCalled();
			expect(element._errorAnnouncement).toBe(mockErrorMessage + '\u200B');

			getCallButton(element).click();
			await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

			expect(element._errorAnnouncement).toBe(mockErrorMessage);
		});

		it('should handle undefined errorValidationMessage with null coalescing', async function () {
			const mockCheckValidity = vi.fn().mockReturnValue(false);
			const textField = getTextField(element);
			textField.checkValidity = mockCheckValidity;

			Object.defineProperty(textField, 'errorValidationMessage', {
				get: () => undefined,
				configurable: true,
			});

			getCallButton(element).click();
			await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

			expect(mockCheckValidity).toHaveBeenCalled();
			expect(element._errorAnnouncement).toBe('');
		});
	});

	describe('keyboard events', function () {
		it('should add "+" when long pressing Space in input field', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			await Updates.next();
			const inputEl = getInput(element);
			withFakeTimers(() => {
				simulateKeyboardLongPress(inputEl, { pressDuration: 650 });
			});
			await Updates.next();

			expect(getTextField(element).value).toEqual('+');
		});

		it('should add space when short pressing Space in input field', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			await Updates.next();
			const inputEl = getInput(element);
			withFakeTimers(() => {
				simulateKeyboardLongPress(inputEl, { pressDuration: 300 });
			});
			await Updates.next();

			withFakeTimers(() => {
				simulateKeyboardLongPress(inputEl, {
					key: 'Space',
					pressDuration: 300,
				});
			});
			await Updates.next();

			expect(getTextField(element).value).toEqual('  ');
		});

		it('should not start keyboard long press when disabled', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			element.disabled = true;
			await Updates.next();
			const inputEl = getInput(element);
			withFakeTimers(() => {
				simulateKeyboardLongPress(inputEl, { pressDuration: 650 });
			});
			await Updates.next();

			expect(getTextField(element).value).toEqual('');
		});

		it('should handle edge cases: prevent timer restart and reset "skip next click" flag when click does not fire', async () => {
			element.pattern = '^\\+?[0-9#*]*$';
			await Updates.next();

			// keyboard long press timer should not restart if already running
			const inputEl = getInput(element);
			withFakeTimers(() => {
				// Start first long press
				const keyDown1 = new KeyboardEvent('keydown', {
					key: ' ',
					bubbles: true,
					repeat: false,
				});
				inputEl.dispatchEvent(keyDown1);
				vi.advanceTimersByTime(300);
				// start another long press while timer is running (should be prevented)
				const keyDown2 = new KeyboardEvent('keydown', {
					key: ' ',
					bubbles: true,
					repeat: false,
				});
				inputEl.dispatchEvent(keyDown2);
				vi.advanceTimersByTime(350);
				const keyUp = new KeyboardEvent('keyup', {
					key: ' ',
					bubbles: true,
				});
				inputEl.dispatchEvent(keyUp);
				vi.runAllTimers();
			});
			await Updates.next();

			// Should only add one '+' from the first long press
			expect(getTextField(element).value).toEqual('+');

			// pointer long press should reset suppressNextClick flag when click does not fire
			element.value = '';
			await Updates.next();
			const btn = getDigitButtons(element)[10] as Button;
			withFakeTimers(() => {
				simulatePointerLongPress(btn, {
					duration: 600,
				});
				// advance timers to execute the setTimeout in _endLongPress
				vi.advanceTimersByTime(1);
			});
			await Updates.next();

			btn.click();
			await Updates.next();
			expect(getTextField(element).value).toEqual('+0');
		});
	});
});
