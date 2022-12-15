import { elementUpdated, fixture } from '@vivid-nx/shared';
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
});
