import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Fab, FabConnotation } from './fab';
import '.';

const COMPONENT_TAG = 'vwc-fab';

describe('vwc-fab', () => {
	let element: Fab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Fab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-fab', async () => {
			expect(element).toBeInstanceOf(Fab);
			expect(element.label).toBeUndefined();
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.disabled).toBeFalsy();
		});
	});

	describe('label', () => {
		it('should set label property', async () => {
			expect(getControlElement(element).textContent?.trim()).toEqual('');
			const label = 'lala';
			element.label = label;
			await elementUpdated(element);
			expect(getControlElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('icon', () => {
		it('should set icon-only property', async () => {
			expect(getControlElement(element).classList.contains('icon-only')).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('icon-only')).toBeTruthy();
		});

		it('should set icon-trailing property', async () => {
			expect(getControlElement(element).classList.contains('icon-trailing')).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('icon-trailing')).toBeTruthy();
		});
	});

	describe('connotation', () => {
		it('should set connotation property', async () => {
			const connotation = 'cta' as FabConnotation;
			expect(getControlElement(element).classList.contains(`connotation-${connotation}`)).toBeFalsy();
			element.connotation = connotation;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains(`connotation-${connotation}`)).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector(`.disabled`)).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector(`.disabled`)).toBeTruthy();
		});
	});
});
