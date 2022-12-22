import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {Icon} from '../icon/icon';
import {Badge} from './badge';
import { badgeDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-badge';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-badge', () => {
	let element: Badge;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Badge;
	});

	describe('basic', () => {
		it('initializes as a vwc-badge', async () => {
			expect(badgeDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Badge);
			expect(element.text).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('adds an icon to the badge', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
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

			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.textContent?.trim())
				.toEqual(text);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'information';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.connotation-${connotation}`);
			expect(base)
				.toBeInstanceOf(Element);
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.shape-${shape}`);
			expect(base)
				.toBeInstanceOf(Element);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'soft';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.appearance-${appearance}`);
			expect(base)
				.toBeInstanceOf(Element);
		});
	});


	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			const getControlIconOnly = () => element.shadowRoot?.querySelector('.base.icon-only');
			const baseIconOnlyBefore = getControlIconOnly();

			element.icon = 'home';
			await elementUpdated(element);

			const baseIconOnlyAfter = getControlIconOnly();
			expect(baseIconOnlyBefore).toBeNull();
			expect(baseIconOnlyAfter).toBeInstanceOf(Element);
		});
	});
});
