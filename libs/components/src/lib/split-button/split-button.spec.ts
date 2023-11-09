import {
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { SplitButton } from './split-button';
import { splitButtonDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-split-button';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-split-button', () => {
	let element: SplitButton;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as SplitButton;
		await elementUpdated(element);
	});

	describe('basic', () => {
		it('initializes as a vwc-split-button', async () => {
			expect(splitButtonDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(SplitButton);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.indicator).toBeInstanceOf(HTMLButtonElement);
			expect(element.action).toBeInstanceOf(HTMLButtonElement);
			expect(element.getAttribute('role')).toEqual('presentation');
		});
	});

	describe('icon', () => {
		it('adds an icon to the button', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.name).toEqual('home');
		});
	});

	describe('split indicator', () => {
		it('adds a split indicator to the button', async () => {
			element.splitIndicator = 'home';
			await elementUpdated(element);

			const icon = element.indicator.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.name).toEqual('home');
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
			(element as any).connotation = connotation;
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains(`connotation-${connotation}`)).toBeTruthy();
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains(`shape-${shape}`)).toBeTruthy();
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains(`appearance-${appearance}`)).toBeTruthy();
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			(element as any).size = size;
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style on control', async () => {
			const getControlIconOnly = () => element.shadowRoot?.querySelector('.control.icon-only');
			const controlIconOnlyBefore = getControlIconOnly();

			element.icon = 'home';
			await elementUpdated(element);

			const controlIconOnlyAfter = getControlIconOnly();
			expect(controlIconOnlyBefore).toBeNull();
			expect(controlIconOnlyAfter).toBeInstanceOf(Element);
		});
	});


	describe('disabled', function () {
		it('should disable control and indicator buttons when disabled is true', async () => {
			element.disabled = true;
			await elementUpdated(element);

			expect(element.action.disabled).toBe(true);
			expect(element.indicator.disabled).toBe(true);
		});
	});

	describe('default slot', () => {
		it('should should have a default slot', () => {
			expect(element.shadowRoot?.querySelector('slot:not([name])')).toBeTruthy();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Button label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		describe('aria-label', function () {
			it('should set "aria-label" on control if set on host', async function () {
				const labelId = 'label';
				element.setAttribute('aria-label', labelId);
				await elementUpdated(element);
				expect(getControlElement(element).getAttribute('aria-label')).toEqual(labelId);
			});
		});

		describe('indicator', function () {
			it('should have a localised "aria-label"', async function () {
				expect(element.indicator.getAttribute('aria-label')).toBe('Show more actions');
			});

			it('should allow overriding the "aria-label" with indicatorAriaLabel', async function () {
				element.indicatorAriaLabel = 'Custom aria label';
				await elementUpdated(element);

				expect(element.indicator.getAttribute('aria-label')).toBe('Custom aria label');
			});
		});

		describe('aria-expanded', function () {
			it('should set "aria-expanded" on indicator if set on host', async function () {
				element.setAttribute('aria-expanded', 'true');
				await elementUpdated(element);

				const indicator = element.shadowRoot?.querySelector('.indicator') as HTMLElement;
				expect(indicator.getAttribute('aria-expanded')).toEqual('true');
			});
		});
	});
});
