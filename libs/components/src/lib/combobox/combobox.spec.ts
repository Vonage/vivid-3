import { elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
import { Combobox } from './combobox';
import '.';

const COMPONENT_TAG = 'vwc-combobox';

describe('vwc-combobox', () => {
	let element: Combobox;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Combobox;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-combobox', async () => {
			expect(element).toBeInstanceOf(Combobox);
			expect(element.open).toEqual(false);
			expect(element.placement).toBeUndefined();
			expect(element.disabled).toEqual(false);
			expect(element.value).toEqual('');
			expect(element.placeholder).toBeUndefined();
			expect(element.autocomplete).toBeUndefined();
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeTruthy();
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});

	describe('open', function () {
		it('should set open when clicked', async () => {
			expect(element.open).toEqual(false);
			element.click();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {
			element.placeholder = placeholderText;
			const input: HTMLInputElement = getControlElement(element) as HTMLInputElement;
			input.focus();
			input.dispatchEvent(new InputEvent('input'));
			input.dispatchEvent(new KeyboardEvent('keyup'));
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute('placeholder'))
				.toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			element.dispatchEvent(new KeyboardEvent('keydown'));
			element.dispatchEvent(new FocusEvent('focusout'));
			await elementUpdated(element);
			expect(getBaseElement(element)
				.classList
				.contains('placeholder'))
				.toEqual(true);
		});
	});
});
