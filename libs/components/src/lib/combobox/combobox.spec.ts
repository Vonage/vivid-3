import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Combobox } from './combobox';
import '.';

const COMPONENT_TAG = 'vwc-combobox';

describe('vwc-combobox', () => {
	let element: Combobox;

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

	describe('open', function () {
		it('should open the combobox when set to true', async function () {
			element.open = true;
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);
		});
	});
});
