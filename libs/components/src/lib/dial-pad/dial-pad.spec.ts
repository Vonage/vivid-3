import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import { DialPad } from './dial-pad';
import { dialPadDefinition } from './definition';
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
			expect(dialPadDefinition()).toBeInstanceOf(FoundationElementRegistry);
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
	});

	describe('text-field', function () {
		it('should set text field in dial pad', async function () {
			expect(getTextField()).not.toBeNull();
		});

		it('should set value in text field when has value attribute', async function () {
			const value = '123';
			element.value = value;
			await elementUpdated(element);
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

		it('should activate number buttons when input event is fired a number', async function () {
			expect(getDigitButtons()[3].active).toBeFalsy();
			getTextField().dispatchEvent(new KeyboardEvent('keydown', { key: '4' }));
			elementUpdated(element);
			expect(getDigitButtons()[3].active).toBeTruthy();
		});

		it('should activate * button when input event is fired with *', async function () {
			expect(getDigitButtons()[9].active).toBeFalsy();
			getTextField().dispatchEvent(new KeyboardEvent('keydown', { key: '*' }));
			elementUpdated(element);
			expect(getDigitButtons()[9].active).toBeTruthy();
		});

		it('should activate # button when input event is fired with #', async function () {
			expect(getDigitButtons()[11].active).toBeFalsy();
			getTextField().dispatchEvent(new KeyboardEvent('keydown', { key: '#' }));
			elementUpdated(element);
			expect(getDigitButtons()[11].active).toBeTruthy();
		});

		it('should not activate any button when input event is fired with an undefined key', async function () {
			for (let i = 0; i < 12; i++) {
				expect(getDigitButtons()[i].active).toBeFalsy();
			}
			getTextField().dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
			elementUpdated(element);
			for (let i = 0; i < 12; i++) {
				expect(getDigitButtons()[i].active).toBeFalsy();
			}
		});
	});

	describe('delete', function () {
		it('should show delete button when text field has value', async function () {
			element.value = '123';
			await elementUpdated(element);
			expect(getDeleteButton()).not.toBeNull();
		});

		it('should remove last character from text field when clicked on delete button', async function () {
			element.value = '123';
			await elementUpdated(element);
			getDeleteButton().click();
			await elementUpdated(element);
			expect(getTextField().value).toEqual('12');
		});
	});

	describe('keypad-click', function () {
		it('should fire keypad-click event when clicked on keypad', async function () {
			const spy = jest.fn();
			element.addEventListener('keypad-click', spy);
			await elementUpdated(element);
			getDigitButtons().forEach((button) => {
				button.click();
			});
			expect(spy).toHaveBeenCalledTimes(12);
		});

		it('should fire keypad-click event with the button which was clicked', async function () {
			const spy = jest.fn();
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

		it('should not set value in text field when clicked on digits div', async function () {
			const digits: HTMLDivElement | null =
				getBaseElement(element).querySelector('.digits');
			digits?.click();
			await elementUpdated(element);
			expect(getTextField().value).toEqual('');
		});
	});

	describe('dial', function () {
		it('should fire dial event when clicked on call button', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			await elementUpdated(element);
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not fire dial event when enter is pressed on text field and pending', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.pending = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and disabled', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.disabled = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and callActive', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.callActive = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and noCall', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.noCall = true;
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should not fire dial event when enter is pressed on text field and value is empty', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			await elementUpdated(element);
			getTextField().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire dial event when enter is pressed on input', async function () {
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.value = '123';
			await elementUpdated(element);
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
			const spy = jest.fn();
			element.addEventListener('dial', spy);
			element.value = '123';
			await elementUpdated(element);
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not fire dial event when enter is pressed on delete button', async function () {
			const spy = jest.fn();
			element.value = '123';
			element.addEventListener('dial', spy);
			await elementUpdated(element);
			getDeleteButton().dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			expect(spy).toHaveBeenCalledTimes(0);
		});

		it('should fire end-call event when clicked on call button when active', async function () {
			const spy = jest.fn();
			element.addEventListener('end-call', spy);
			element.callActive = true;
			await elementUpdated(element);
			getCallButton().click();
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe.each(['input', 'change', 'blur', 'focus'])(
		'%s event',
		(eventName) => {
			it('should be fired when user enters a valid text into the text field', async () => {
				const spy = jest.fn();
				element.addEventListener(eventName, spy);

				element.value = '123';
				getTextField().dispatchEvent(new InputEvent(eventName));
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(1);
			});
		}
	);

	describe.each(['input', 'change'])('%s event', (eventName) => {
		it('should be fired when user clicks the keyboard buttons', async () => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);
			getDigitButtons().forEach((button) => {
				button.click();
			});

			await elementUpdated(element);
			expect(spy).toHaveBeenCalledTimes(12);
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
			element.value = '123';
			await elementUpdated(element);
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
			element.value = '123';
			await elementUpdated(element);
			expect(getDeleteButton().disabled).toBe(true);
		});
	});

	describe('no call', function () {
		it('should not show call button when has no-call attribute', async function () {
			element.noCall = true;
			await elementUpdated(element);
			expect(getCallButton()).toBeNull();
		});
	});

	describe('no input', function () {
		it('should not show text field when has no-input attribute', async function () {
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

	describe('call button label', function () {
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
