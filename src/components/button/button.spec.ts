import { elementUpdated, fixture } from '@open-wc/testing';
import { Icon } from '../icon/icon';
import { Button } from './button';
import '.';

const COMPONENT_TAG = 'vwc-button';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-button', () => {
	let element: Button;

	beforeEach(async () => {
		element = await fixture<Button>(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`);
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

			const icon = element.shadowRoot.querySelector(ICON_SELECTOR);
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.type).toEqual('home');
		});

		it(
			'setting `iconTrailing` set the order of element',
			async () => {
				element.icon = 'home';
				element.iconTrailing = true;
				await elementUpdated(element);

				const trailingIcon = element.shadowRoot.querySelector(
					`.icon-trailing ${ICON_SELECTOR}`,
				);
				expect(trailingIcon).toBeInstanceOf(Icon);
			},
		);
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			const control = element.shadowRoot.querySelector('.control');
			expect(control.textContent.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const control = element.shadowRoot.querySelector(`.control.connotation-${connotation}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const control = element.shadowRoot.querySelector(`.control.shape-${shape}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot.querySelector(`.control.appearance-${appearance}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'small';
			(element as any).size = size;
			await elementUpdated(element);

			const control = element.shadowRoot.querySelector(`.control.size-${size}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			element.icon = 'home';
			await elementUpdated(element);
			debugger;

			const control = element.shadowRoot.querySelector('.control.icon-only');
			expect(control).toBeInstanceOf(Element);
		});
	});
});
