import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { SplitButton } from './split-button';
import { splitButtonDefinition } from './definition';
import  '.';

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

			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.textContent?.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.connotation-${connotation}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const control = getControlElement(element); 
			expect(control.classList.contains(`shape-${shape}`).toBeTruthy();
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.appearance-${appearance}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			(element as any).size = size;
			await elementUpdated(element);

			const control = getControlElement(element);
			expect(control?.classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			const appearance = 'filled';
			(element as any).appearance = appearance;
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const controlHasDisabledClass = getControlElement(element).classList.contains(`appearance-${appearance}.disabled`);
			expect(controlHasDisabledClass).toBeTruthy();
		});

		it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
			element.disabled = true;
			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('aria-disabled')).toEqual('true');
		});

		it('should set the `aria-disabled` attribute with the `disabled-action` value when provided', async () => {
			element.disabledAction = true;
			await elementUpdated(element);
			expect(element.action.getAttribute('aria-disabled')).toEqual('true');
		});

		it('should set the `aria-disabled` attribute with the `disabled-indicator` value when provided', async () => {
			element.disabledIndicator = true;
			await elementUpdated(element);
			expect(element.indicator.getAttribute('aria-disabled')).toEqual('true');
		});
	});
});
