import { elementUpdated, fixture, getControlElement } from '@repo/shared';
import { Icon } from '../icon/icon';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { SplitButton } from './split-button';
import '.';

const COMPONENT_TAG = 'vwc-split-button';
describe('vwc-split-button', () => {
	let element: SplitButton;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SplitButton;
		await elementUpdated(element);
	});

	describe('basic', () => {
		it('initializes as a vwc-split-button', async () => {
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

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('icon', () => {
		it('adds an icon to the button', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot!.querySelector('vwc-icon')!;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.name).toEqual('home');
		});

		it('should have an icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});
	});

	describe('split indicator', () => {
		it('adds a split indicator to the button', async () => {
			element.splitIndicator = 'home';
			await elementUpdated(element);

			const icon = element.indicator.querySelector('vwc-icon')!;
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
			element.connotation = connotation;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeTruthy();
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			element.shape = shape;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(`shape-${shape}`)
			).toBeTruthy();
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';
			element.appearance = appearance;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(
					`appearance-${appearance}`
				)
			).toBeTruthy();
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			element.size = size;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(`size-${size}`)
			).toBeTruthy();
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style on control', async () => {
			const getControlIconOnly = () =>
				element.shadowRoot?.querySelector('.control.icon-only');
			const controlIconOnlyBefore = getControlIconOnly();

			element.icon = 'home';
			await elementUpdated(element);

			const controlIconOnlyAfter = getControlIconOnly();
			expect(controlIconOnlyBefore).toBeNull();
			expect(controlIconOnlyAfter).toBeInstanceOf(Element);
		});

		it('should set icon-only class if slot name="icon" is slotted', async () => {
			const iconOnlyClassExistsWithoutSlot =
				getControlElement(element).classList.contains('icon-only');
			const slottedElement = document.createElement('span');
			slottedElement.slot = 'icon';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(iconOnlyClassExistsWithoutSlot).toEqual(false);
			expect(
				getControlElement(element).classList.contains('icon-only')
			).toEqual(true);
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
			expect(
				element.shadowRoot?.querySelector('slot:not([name])')
			).toBeTruthy();
		});
	});

	describe('action-click', () => {
		it('should fire a non-bubbling action-click event when action button is clicked', async () => {
			const spy = vi.fn();
			element.addEventListener('action-click', spy);
			element.action.click();

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('indicator-click', () => {
		it('should fire a non-bubbling indicator-click event when indicator button is clicked', async () => {
			const spy = vi.fn();
			element.addEventListener('indicator-click', spy);
			element.indicator.click();

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('a11y attributes', () => {
		describe('indicator', function () {
			it('should have a localised "aria-label"', async function () {
				expect(element.indicator.getAttribute('aria-label')).toBe(
					'Show more actions'
				);
			});

			it('should allow overriding the "aria-label" with indicatorAriaLabel', async function () {
				element.indicatorAriaLabel = 'Custom aria label';
				await elementUpdated(element);

				expect(element.indicator.getAttribute('aria-label')).toBe(
					'Custom aria label'
				);
			});
		});

		describe('ARIA delegation to action', function () {
			itShouldDelegateAriaAttributes(
				() => element,
				() => element.action,
				['ariaLabel']
			);
		});

		describe('ARIA delegation to indicator', function () {
			itShouldDelegateAriaAttributes(
				() => element,
				() => element.indicator,
				['ariaExpanded']
			);
		});
	});
});
