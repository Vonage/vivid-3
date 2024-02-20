import { axe, elementUpdated, fixture, getControlElement, setAttribute } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { ProgressRing } from '../progress-ring/progress-ring';
import { Size } from '../enums';
import { Button } from './button';
import  '.';
import { buttonDefinition } from './definition';

const COMPONENT_TAG = 'vwc-button';
const ICON_SELECTOR = 'vwc-icon';
const PROGRESS_SELECTOR = 'vwc-progress-ring';

describe('vwc-button', () => {
	let element: Button;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Button;
	});

	describe('basic', () => {
		it('initializes as a vwc-button', async () => {
			expect(buttonDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Button);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.ariaLabel).toBeUndefined();
			expect(element.title).toBeNull();
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(element.shadowRoot?.querySelector('slot[name="icon"]')).toBeTruthy();
		});

		it('adds an icon to the button', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.name).toEqual('home');
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

	describe('pending', () => {
		it('should add a progress-ring with default size to the button', async () => {
			element.pending = true;
			await elementUpdated(element);

			const progress = element.shadowRoot?.querySelector(PROGRESS_SELECTOR) as ProgressRing;
			expect(progress).toBeInstanceOf(ProgressRing);
			expect(progress.size).toEqual('-5');
		});

		it('should NOT add a progress-ring if the button size is super-condensed', async () => {
			element.size = Size.SuperCondensed;
			element.pending = true;
			await elementUpdated(element);

			const progress = element.shadowRoot?.querySelector(PROGRESS_SELECTOR) as ProgressRing;
			expect(progress).toBeNull();
		});

		it('should replace any existing icon with a progress-ring', async () => {
			element.icon = 'home';
			element.pending = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeNull();
		});

		it('should NOT replace any existing icon if the button size is super-condensed', async () => {
			element.icon = 'home';
			element.size = Size.SuperCondensed;
			element.pending = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
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

			const control = element.shadowRoot?.querySelector(`.control.shape-${shape}`);
			expect(control).toBeInstanceOf(Element);
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

			const control = element.shadowRoot?.querySelector(`.control.size-${size}`);
			expect(control?.classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('icon-only', () => {
		it('sets correct internal icon-only style', async () => {
			const getControlIconOnly = () => element.shadowRoot?.querySelector('.control.icon-only');
			const controlIconOnlyBefore = getControlIconOnly();

			element.icon = 'home';
			await elementUpdated(element);

			const controlIconOnlyAfter = getControlIconOnly();
			expect(controlIconOnlyBefore).toBeNull();
			expect(controlIconOnlyAfter).toBeInstanceOf(Element);
		});

		it('should set icon-only class if slot name="icon" is slotted', async () => {
			const iconOnlyClassExistsWithoutSlot = getControlElement(element).classList.contains('icon-only');
			const slottedElement = document.createElement('span');
			slottedElement.slot = 'icon';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(iconOnlyClassExistsWithoutSlot).toEqual(false);
			expect(getControlElement(element).classList.contains('icon-only')).toEqual(true);
		});

	});

	describe('link', () => {
		it('should set the "href" attribute', async function () {
			const attribute = 'href';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "hreflang" attribute', async function () {
			const attribute = 'hreflang';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "download" attribute', async function () {
			const attribute = 'download';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "ping" attribute', async function () {
			const attribute = 'ping';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "referrerpolicy" attribute', async function () {
			const attribute = 'referrerpolicy';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "rel" attribute', async function () {
			const attribute = 'rel';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "target" attribute', async function () {
			const attribute = 'target';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "type" attribute', async function () {
			const attribute = 'type';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});
	});

	function getAnchorElement() {
		const anchorElement = element.shadowRoot?.querySelector('a');
		return anchorElement;
	}

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
	describe('title', function () {
		it('should set title on the button if set', async () => {
			const titleText = 'close';
			element.title = titleText;
			await elementUpdated(element);
			expect(element.getAttribute('title'))
				.toEqual(titleText);
			expect(getControlElement(element).getAttribute('title'))
				.toEqual(titleText);
		});
		it('should remove title on the button if not set or empty', async () => {
			element.title = '';
			await elementUpdated(element);
			expect(element.hasAttribute('title'))
				.toEqual(false);
			expect(getControlElement(element).hasAttribute('title'))
				.toEqual(false);
		});
	});
	describe('a11y', function () {
		it('should set aria-label on the button if set', async () => {
			const ariaLabel = 'close';
			element.ariaLabel = ariaLabel;
			await elementUpdated(element);
			expect(element.getAttribute('aria-label'))
				.toEqual(ariaLabel);
		});

		it('should pass html a11y test', async () => {
			element.label = 'Home';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		it('should pass html a11y test when anchor', async () => {
			element.label = 'Link text';
			element.href = '/somewhere';
			await elementUpdated(element);
			
			expect(await axe(element)).toHaveNoViolations();
		});

		describe('icon-only', () => {
			it('should pass html a11y test', async () => {
				element.icon = 'home';
				await elementUpdated(element);

				expect(await axe(element)).toHaveNoViolations();
			});
		});
	});
});
