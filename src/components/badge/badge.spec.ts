import { elementUpdated, fixture } from '../../core/test-utils';
import {Icon} from '../icon/icon';
import {Badge} from './badge';
import '.';

const COMPONENT_TAG = 'vwc-badge';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-badge', () => {
	let element: Badge;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Badge;
	});

	describe('basic', () => {
		it('initializes as a vwc-badge', async () => {
			expect(element)
				.toBeInstanceOf(Badge);
			expect(element.text)
				.toEqual('');
			expect(element.icon)
				.toBeUndefined();
			expect(element.iconTrailing)
				.toBeFalsy();
			expect(element.connotation)
				.toBeUndefined();
			expect(element.shape)
				.toBeUndefined();
			expect(element.appearance)
				.toBeUndefined();
			expect(element.size)
				.toBeUndefined();
		});
	});

	describe('icon', () => {
		it('adds an icon to the badge', async () => {
			element.icon = 'home';
			await elementUpdated();

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR);
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon.type)
				.toEqual('home');
		});

		it('setting `iconTrailing` set the order of element', async () => {
			element.icon = 'home';
			element.iconTrailing = true;
			await elementUpdated(element);

			const trailingIcon = element.shadowRoot?.querySelector(
				`.icon-trailing ${ICON_SELECTOR}`,
			);
			expect(trailingIcon)
				.toBeInstanceOf(Icon);
		},
		);
	});

	describe('text', () => {
		it('set text property to node', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');
			expect(control.textContent.trim())
				.toEqual(text);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'info';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.connotation-${connotation}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.shape-${shape}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'soft';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.appearance-${appearance}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'small';
			(element as any).size = size;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.size-${size}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});
});
