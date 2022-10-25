import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Listbox } from './listbox';
import '.';

const COMPONENT_TAG = 'vwc-listbox';

describe('vwc-listbox', () => {
	let element: Listbox;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Listbox;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-listbox', async () => {
			expect(element).toBeInstanceOf(Listbox);
			expect(element.disabled).toBeUndefined();
			expect(element.multiple).toBeUndefined();
			expect(element.appearance).toBeUndefined();
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'ghost';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains(`appearance-${appearance}`)).toBeTruthy();
		});
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		element.disabled = true;
		await elementUpdated(element);
		element.slottedOptions.forEach(optionElement => {
			expect((optionElement as any).disabled).toEqual(false);
		});
	});

	it('should set the `aria-multiselectable` attribute with the `multiple` value when provided', async () => {
		element.multiple = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-multiselectable')).toEqual('true');
	});
});
