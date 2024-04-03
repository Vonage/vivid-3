import {
	axe,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import { Combobox } from './combobox';
import '.';

const COMPONENT_TAG = 'vwc-combobox';

describe('vwc-combobox', () => {
	let element: Combobox;

	global.ResizeObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
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
			expect(element.selectedIndex).toEqual(-1);
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeTruthy();
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
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
			const input: HTMLInputElement = getControlElement(
				element
			) as HTMLInputElement;
			input.focus();
			input.dispatchEvent(new InputEvent('input'));
			input.dispatchEvent(new KeyboardEvent('keyup'));
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('input')?.getAttribute('placeholder')
			).toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			element.dispatchEvent(new KeyboardEvent('keydown'));
			element.dispatchEvent(new FocusEvent('focusout'));
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('placeholder')).toEqual(
				true
			);
		});
	});

	describe('selectedIndex', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2" selected>2</option>
				<option value="3">3</option>
				`;
			await elementUpdated(element);
		});

		it('should set selectedIndex to 1 when first option is selected', async () => {
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(1);
		});

		it('should change selection when changed', async () => {
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.selectedOptions).toEqual([
				element.querySelector('option:nth-child(3)'),
			]);
		});
	});

	describe('options', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of options', async () => {
			await elementUpdated(element);
			expect(element.options[1]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
		});
	});

	describe('selectedOptions', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of selectedOptions', async () => {
			await elementUpdated(element);
			expect(element.selectedOptions[0]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
		});
	});

	describe('a11y', () => {
		it('should mark the input control element with the correct a11y attributes', async () => {
			element.label = 'Test label';
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2" selected>2</option>
				<option value="3">3</option>
				`;
			await elementUpdated(element);

			const control = await getControlElement(element);
			const label = element.shadowRoot?.querySelector('.label');

			expect(control.getAttribute('role')).toBe('combobox');
			expect(control.getAttribute('aria-haspopup')).toBe('listbox');
			expect(label?.getAttribute('for')).toBe(control.id);
		});

		it('should pass html a11y test', async () => {
			element.label = 'Combobox label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
