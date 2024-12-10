import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { ListboxOption } from '../option/option';
import { Listbox } from './listbox';
import '../option';
import '.';

const COMPONENT_TAG = 'vwc-listbox';

Element.prototype.scrollIntoView = jest.fn();

describe('vwc-listbox', () => {
	let element: Listbox;
	let option1: ListboxOption;
	let option2: ListboxOption;

	beforeEach(async function () {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-option value="1" text="Option" role="option" id="option1"></vwc-option>
				<vwc-option value="2" text="Option" role="option" id="option2"></vwc-option>
			</${COMPONENT_TAG}>`
		)) as Listbox;

		await elementUpdated(element);
		option1 = element.querySelector('#item1') as ListboxOption;
		option2 = element.querySelector('#item2') as ListboxOption;
		await elementUpdated(option1);
		await elementUpdated(option2);
	});

	describe('basic', function () {
		it('should be initialized as a vwc-listbox', async function () {
			expect(element).toBeInstanceOf(Listbox);
			expect(element.disabled).toBeUndefined();
			expect(element.multiple).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.orientation).toBeUndefined();
			expect(element.selectedIndex).toEqual(-1);
		});
	});

	describe('appearance', function () {
		it('should set correct internal appearance style', async function () {
			const appearance = 'ghost';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('orientation', function () {
		it('should set correct internal orientation style', async function () {
			const orientation = 'horizontal';
			(element as any).orientation = orientation;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`orientation-${orientation}`)
			).toBeTruthy();
		});

		it('should not remove keydown event listener when orientation is horizontal', async function () {
			const spy = jest.spyOn(element, 'removeEventListener');
			const orientation = 'horizontal';
			(element as any).orientation = orientation;
			await elementUpdated(element);

			expect((spy as any).mock.calls.length).toEqual(0);
		});

		it('should remove keydown event listener when orientation is vertical', async function () {
			const spy = jest.spyOn(element, 'removeEventListener');
			const orientation = 'vertical';
			(element as any).orientation = orientation;
			await elementUpdated(element);

			expect((spy as any).mock.calls.length).toEqual(1);
		});
	});

	describe('shape', function () {
		it('should set correct internal shape style if orientation is vertical', async function () {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`shape-${shape}`)
			).toBeFalsy();
		});

		it('should set correct internal shape style if orientation is horizontal', async function () {
			const shape = 'pill';
			element.orientation = 'horizontal';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`shape-${shape}`)
			).toBeTruthy();
		});
	});

	describe('disabled', function () {
		test('should have a tabindex of 0 when `disabled` is not defined', async () => {
			expect(element.tabIndex).toEqual(0);
		});

		test('should NOT have a tabindex when `disabled` is true', async () => {
			element.disabled = true;
			await elementUpdated(element);
			expect(element.getAttribute('tabindex')).toBeNull();
		});
	});

	describe('multiselectable', function () {
		it('should set the `aria-multiselectable` attribute with the `multiple` value when provided', async function () {
			element.multiple = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-multiselectable')).toEqual('true');
		});
	});

	describe('activedescendant', function () {
		it('should set the `aria-activedescendant` attribute with option id when clicked', async function () {
			const firstOption = element.slottedOptions.pop() as HTMLElement;
			firstOption?.click();
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual(
				firstOption.id
			);
		});

		it('should set the `aria-activedescendant` attribute with option when listbox is multiple and focused', async function () {
			element.multiple = true;
			element.focus();
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual('option1');
		});

		it('should set the `aria-activedescendant` attribute with option id when keydown', async () => {
			element.focus();
			await elementUpdated(element);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual('option2');
		});

		it('should not set the `aria-activedescendant` attribute with option id when mousedown', async () => {
			element.dispatchEvent(new MouseEvent('mousedown'));
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual('');
		});
	});

	describe('selectedIndex', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				`;
			await elementUpdated(element);
		});

		it('should set selectedIndex to -1 when first option is selected', async () => {
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should change selection when changed', async () => {
			element.selectedIndex = 1;
			await elementUpdated(element);
			expect(element.selectedOptions).toEqual([
				element.querySelector('option:nth-child(2)'),
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

	describe('horizontal keydown', () => {
		it('should not focus if disabled', async () => {
			element.orientation = 'horizontal';
			element.disabled = true;
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			await elementUpdated(element);
			expect(element.getAttribute('aria-activedescendant')).not.toEqual(
				'option1'
			);
		});

		it('should focus on the next element when ArrowRight is pressed', async () => {
			element.orientation = 'horizontal';
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			await elementUpdated(element);
			expect(element.getAttribute('aria-activedescendant')).toEqual('option1');

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			await elementUpdated(element);
			expect(element.getAttribute('aria-activedescendant')).toEqual('option2');
		});

		it('should focus on the next element when ArrowLeft is pressed', async () => {
			element.orientation = 'horizontal';
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			await elementUpdated(element);
			expect(element.getAttribute('aria-activedescendant')).toEqual('option2');

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

			await elementUpdated(element);
			expect(element.getAttribute('aria-activedescendant')).toEqual('option1');
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
