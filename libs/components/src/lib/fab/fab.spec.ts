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

	const getButtonElement = () => {
		return getControlElement(element).querySelector('vwc-button') as HTMLElement;
	};

	describe('default', () => {
		it('should set default properties', async () => {
			expect(getControlElement(getButtonElement()).classList.contains('appearance-filled')).toBeTruthy();
			expect(getControlElement(getButtonElement()).classList.contains('shape-pill')).toBeTruthy();
			expect(getControlElement(getButtonElement()).classList.contains('size-base-large')).toBeTruthy();
		});
	});

	describe('label', () => {
		it('should set label property', async () => {
			expect(getControlElement(getButtonElement()).textContent?.trim()).toEqual('');
			const label = 'lala';
			element.label = label;
			await elementUpdated(element);
			expect(getControlElement(getButtonElement()).textContent?.trim()).toEqual(label);
		});
	});

	describe('icon', () => {
		it('should set icon-only property', async () => {
			expect(getControlElement(getButtonElement()).classList.contains('icon-only')).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			await elementUpdated(element);
			expect(getControlElement(getButtonElement()).classList.contains('icon-only')).toBeTruthy();
		});

		it('should set icon-trailing property', async () => {
			expect(getControlElement(getButtonElement()).classList.contains('icon-trailing')).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(getControlElement(getButtonElement()).classList.contains('icon-trailing')).toBeTruthy();
		});
	});

	describe('connotation', () => {
		it('should set connotation property', async () => {
			const connotation = 'cta' as FabConnotation;
			expect(getControlElement(getButtonElement()).classList.contains(`connotation-${connotation}`)).toBeFalsy();
			element.connotation = connotation;
			await elementUpdated(element);
			expect(getControlElement(getButtonElement()).classList.contains(`connotation-${connotation}`)).toBeTruthy();
		});
	});

	describe('disabled', () => {
		it('should set disabled property', async () => {
			expect(getControlElement(getButtonElement()).classList.contains('disabled')).toBeFalsy();
			element.disabled = true;
			await elementUpdated(element);
			expect(getControlElement(getButtonElement()).classList.contains('disabled')).toBeTruthy();
		});
	});
});
