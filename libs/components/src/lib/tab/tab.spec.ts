import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Tab, TabShape } from './tab';
import '.';

const COMPONENT_TAG = 'vwc-tab';

describe('vwc-tab', () => {
	let element: Tab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tab', async () => {
			expect(element).toBeInstanceOf(Tab);
			expect(element.shape).toBeUndefined();
			expect(element.icon).toBeUndefined();
			expect(element.label).toBeUndefined();
			expect(element.disabled).toBeFalsy();
		});
	});

	describe('label', () => {
		it('should set label property', async () => {
			expect(getBaseElement(element).textContent?.trim()).toEqual('');
			const label = 'lala';
			element.label = label;
			await elementUpdated(element);
			expect(getBaseElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('shape', () => {
		it('should set shape property', async () => {
			const shape = 'rounded' as TabShape;
			expect(getBaseElement(element).classList.contains(`shape-${shape}`)).toBeFalsy();
			element.shape = shape;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`shape-${shape}`)).toBeTruthy();
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
});
