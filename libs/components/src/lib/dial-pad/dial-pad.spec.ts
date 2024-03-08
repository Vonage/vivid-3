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
		const digits: HTMLDivElement | null = getBaseElement(element).querySelector('.digits');
		return digits?.querySelectorAll('vwc-button') as NodeListOf<Button>;

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
			expect(element.active).toBeFalsy();
			expect(element.noCall).toBeFalsy();
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

		describe('errorText', () => {
			it('should forward errorText to the text field', async () => {
				element.errorText = 'errorText';
				await elementUpdated(element);

				expect(getTextField().errorText).toBe('errorText');
			});
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
			getDigitButtons().forEach(button => {
				expect(button.disabled).toEqual(true);
			});
		});
	});

	describe('active', function () {
		it('should change call button connotation to "alert" when active', async function () {
			element.active = true;
			expect(getCallButton().connotation).toEqual('cta');
			await elementUpdated(element);
			expect(getCallButton().connotation).toEqual('alert');
		});

		it('should change call buttons label when active', async function () {
			element.active = true;
			expect(getCallButton().label).toEqual('Call');
			await elementUpdated(element);
			expect(getCallButton().label).toEqual('End call');
		});
	});

	describe('no call', function () {
		it('should not show call button when has no-call attribute', async function () {
			element.noCall = true;
			await elementUpdated(element);
			expect(getCallButton()).toBeNull();
		});
	});
	
	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});

});
