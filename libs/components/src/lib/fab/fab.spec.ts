import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import { Fab, FabAppearance, FabConnotation } from './fab';
import '.';

const COMPONENT_TAG = 'vwc-fab';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-fab', () => {
	let element: Fab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Fab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-fab', async () => {
			expect(element).toBeInstanceOf(Fab);
			expect(element.label).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.disabled).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should add an icon to the fab', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(HTMLElement);
			expect(icon.type).toEqual('home');
		});

		it('should  set icon to end when `iconTrailing` is set', async () => {
			element.icon = 'home';
			element.iconTrailing = true;
			await elementUpdated(element);

			const trailingIcon = element.shadowRoot?.querySelector(
				`.icon-trailing ${ICON_SELECTOR}`,
			);
			expect(trailingIcon).toBeInstanceOf(HTMLElement);
		});
	});

	describe('label', () => {
		it('should set label property to node', async () => {
			const label = 'lorem';

			element.label = label;
			await elementUpdated(element);
			expect(getControlElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('should set correct connotation class', async () => {
			const connotation = 'cta';

			const expectedConnotation = `connotation-${connotation}`;
			const hasConnotationClassBefore = getControlElement(element).classList.contains(expectedConnotation);

			element.connotation = connotation as FabConnotation;
			await elementUpdated(element);

			expect(hasConnotationClassBefore).toEqual(false);
			expect(getControlElement(element).classList.contains(expectedConnotation)).toEqual(true);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';

			const expectedAppearance = `appearance-${appearance}`;
			const hasAppearanceClassBefore = getControlElement(element).classList.contains(expectedAppearance);

			element.appearance = appearance as FabAppearance;
			await elementUpdated(element);

			expect(hasAppearanceClassBefore).toEqual(false);
			expect(getControlElement(element).classList.contains(expectedAppearance)).toEqual(true);
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			const icon = 'home-line';

			const expected = 'icon-only';
			const hasClassBefore = getControlElement(element).classList.contains(expected);

			element.icon = icon;
			await elementUpdated(element);

			expect(hasClassBefore).toEqual(false);
			expect(getControlElement(element).classList.contains(expected)).toEqual(true);
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			const appearance = 'filled';
			element.appearance = appearance as FabAppearance;
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.appearance-${appearance}.disabled`);
			expect(control).toBeInstanceOf(Element);
		});
	});
});
