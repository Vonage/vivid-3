import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { ListboxOption } from '../option/option';
import { Listbox } from './listbox';
import '../option';
import '.';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';

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
			expect(listboxDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Listbox);
			expect(element.disabled).toBeUndefined();
			expect(element.multiple).toBeUndefined();
			expect(element.appearance).toBeUndefined();
		});
	});

	describe('appearance', function () {
		it('sets correct internal appearance style', async function () {
			const appearance = 'ghost';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains(`appearance-${appearance}`)).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set the `aria-disabled` attribute with the `disabled` value when provided', async function () {
			element.disabled = true;
			await elementUpdated(element);
			element.slottedOptions.forEach(optionElement => {
				expect((optionElement as any).disabled).toEqual(true);
			});
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

			expect(element.getAttribute('aria-activedescendant')).toEqual(firstOption.id);
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
			element.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual('option2');
		});

		it('should not set the `aria-activedescendant` attribute with option id when mousedown', async () => {
			element.dispatchEvent(new MouseEvent('mousedown'));
			await elementUpdated(element);

			expect(element.getAttribute('aria-activedescendant')).toEqual('');
		});
	});
});
/**
 *
 */
function listboxDefinition(): any {
	throw new Error('Function not implemented.');
}

