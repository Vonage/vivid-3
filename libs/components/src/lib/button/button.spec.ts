import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import { Button } from './button';
import '.';

const COMPONENT_TAG = 'vwc-button';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-button', () => {
	let element: Button;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Button;
	});

	describe('basic', () => {
		it('initializes as a vwc-button', async () => {
			expect(element).toBeInstanceOf(Button);
			expect(element.label).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.size).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('adds an icon to the button', async () => {
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

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';

			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).shape = shape;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control shape-${shape}`);
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

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'small';

			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).size = size;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control size-${size}`);
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			const icon = 'home';

			expect(getControlElement(element).classList.toString()).toEqual('control');
			(element as any).icon = icon;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control icon-only`);
		});
	});
});
