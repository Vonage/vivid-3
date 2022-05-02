import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import { Fab } from './fab';
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
		it('adds an icon to the fab', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(HTMLElement);
			expect(icon.type).toEqual('home');
		});

		it('setting `iconTrailing` set the order of element', async () => {
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
		it('set label property to node', async () => {
			const label = 'lorem';

			element.label = label;
			await elementUpdated(element);
			expect(getControlElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
  
			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).connotation = connotation;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control connotation-${connotation}`);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';

			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).appearance = appearance;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control appearance-${appearance}`);
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			const icon = 'home-line';

			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).icon = icon;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual('control icon-only');
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			const appearance = 'filled';
			(element as any).appearance = appearance;
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.appearance-${appearance}.disabled`);
			expect(control).toBeInstanceOf(Element);
		});
	});
});
