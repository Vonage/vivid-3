import {
	elementUpdated,
	fixture,
	getControlElement,
	setProperty,
} from '@repo/shared';
import { Icon } from '../icon/icon';
import { ProgressRing } from '../progress-ring/progress-ring';
import { Size } from '../enums';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Button } from './button';
import '.';

const COMPONENT_TAG = 'vwc-button';
const ICON_SELECTOR = 'vwc-icon';
const PROGRESS_SELECTOR = 'vwc-progress-ring';

describe('vwc-button', () => {
	let element: Button;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Button;
	});

	describe('basic', () => {
		it('initializes as a vwc-button', async () => {
			expect(element).toBeInstanceOf(Button);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.title).toBeNull();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
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
				`.icon-trailing ${ICON_SELECTOR}`
			);
			expect(trailingIcon).toBeInstanceOf(HTMLElement);
		});
	});

	describe('pending', () => {
		it('should add a progress-ring with default size to the button', async () => {
			element.pending = true;
			await elementUpdated(element);

			const progress = element.shadowRoot?.querySelector(
				PROGRESS_SELECTOR
			) as ProgressRing;
			expect(progress).toBeInstanceOf(ProgressRing);
			expect(progress.size).toEqual('-5');
		});

		it('should NOT add a progress-ring if the button size is super-condensed', async () => {
			element.size = Size.SuperCondensed;
			element.pending = true;
			await elementUpdated(element);

			const progress = element.shadowRoot?.querySelector(
				PROGRESS_SELECTOR
			) as ProgressRing;
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

	describe('dropdown-indicator', () => {
		const getChevron = () => element.shadowRoot?.querySelector('.chevron');

		it('should not display a chevron if not set', async () => {
			expect(getChevron()).toBe(null);
		});

		it('should display a chevron if set', async () => {
			element.dropdownIndicator = true;
			await elementUpdated(element);

			expect(getChevron()).toBeInstanceOf(Element);
		});
	});

	describe('active', () => {
		it('should set active class when active is true', async () => {
			element.active = true;
			await elementUpdated(element);

			expect(getControlElement(element).classList).toContain('active');
		});
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control .text');
			expect(control?.textContent?.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
			element.connotation = connotation;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.connotation-${connotation}`
			);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			element.shape = shape;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.shape-${shape}`
			);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'filled';
			element.appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.appearance-${appearance}`
			);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			element.size = size;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.size-${size}`
			);
			expect(control?.classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('icon-only', () => {
		it('should sets correct internal icon-only style when icon is set and label is undefined', async () => {
			const control = element.shadowRoot?.querySelector(`.control`);

			element.icon = 'home';
			element.label = undefined;
			await elementUpdated(element);

			expect(control?.classList.contains(`icon-only`)).toBeTruthy();

			element.label = 'button';
			await elementUpdated(element);

			expect(control?.classList.contains(`icon-only`)).toBeFalsy();
		});

		it('should remove icon-only when drop-down-indicator is added, icon is set and label is undefined', async () => {
			const control = element.shadowRoot?.querySelector(`.control`);

			element.icon = 'home';
			element.label = undefined;
			element.dropdownIndicator = true;
			await elementUpdated(element);

			expect(control?.classList.contains(`icon-only`)).toBeFalsy();

			element.dropdownIndicator = false;
			await elementUpdated(element);

			expect(control?.classList.contains(`icon-only`)).toBeTruthy();
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

		it('should add icon-only when drop-down-indicator is added, slotted icon is set and label is undefined', async () => {
			const control = element.shadowRoot?.querySelector(`.control`);

			const slottedElement = document.createElement('span');
			slottedElement.slot = 'icon';
			element.appendChild(slottedElement);
			element.label = undefined;
			element.dropdownIndicator = true;

			await elementUpdated(element);
			expect(control?.classList.contains(`icon-only`)).toBeFalsy();

			element.dropdownIndicator = false;
			await elementUpdated(element);

			expect(control?.classList.contains(`icon-only`)).toBeTruthy();
		});
	});

	describe('type', () => {
		it('should have type="submit" on button by default', async () => {
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector(`.control`)?.getAttribute('type')
			).toBe('submit');
		});

		it('should set the type attribute if was set in host', async () => {
			const type = 'button';
			element.type = type;
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector(`.control`)?.getAttribute('type')
			).toBe('button');
		});

		it('should have type="submit" on the button if anything other than "reset", "button" or "submit" is provided', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} type="wrongtype" label="Button"></${COMPONENT_TAG}>`
			)) as Button;
			expect(
				element.shadowRoot?.querySelector(`.control`)?.getAttribute('type')
			).toBe('submit');
		});
	});

	describe.each([
		'href',
		'hreflang',
		'download',
		'ping',
		'referrerpolicy',
		'rel',
		'target',
		'type',
	] as const)('%s attribute', (attribute) => {
		beforeEach(async () => {
			element.href = '/somewhere';
			await elementUpdated(element);
		});

		it('should be forwarded to the anchor element', async () => {
			const text = 'link';
			await setProperty(element, attribute, text);

			expect(
				element.shadowRoot?.querySelector('a')?.getAttribute(attribute)
			).toEqual(text);
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			const appearance = 'filled';
			element.appearance = appearance;
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.appearance-${appearance}.disabled`
			);
			expect(control).toBeInstanceOf(Element);
		});

		it('should set aria-disabled on <button> when disabled', async () => {
			element.disabled = true;
			await elementUpdated(element);

			const control = getControlElement(element);
			expect(control?.getAttribute('aria-disabled')).toBe('true');
		});

		it('should not emit click when disabled', async () => {
			const listener = vi.fn();
			element.addEventListener('click', listener);

			element.disabled = true;
			await elementUpdated(element);

			const control = getControlElement(element);
			control?.click();

			expect(listener).not.toHaveBeenCalled();
		});

		it('should not emit keyboard activation when disabled (Enter)', async () => {
			const listener = vi.fn();
			element.addEventListener('click', listener);

			element.disabled = true;
			await elementUpdated(element);

			const control = getControlElement(element);
			const event = new KeyboardEvent('keydown', {
				key: 'Enter',
				bubbles: true,
			});
			control?.dispatchEvent(event);

			expect(listener).not.toHaveBeenCalled();
		});

		it('should not emit keyboard activation when disabled (Space)', async () => {
			const listener = vi.fn();
			element.addEventListener('click', listener);

			element.disabled = true;
			await elementUpdated(element);

			const control = getControlElement(element);
			const event = new KeyboardEvent('keydown', {
				key: ' ',
				code: 'Space',
				bubbles: true,
			});
			control?.dispatchEvent(event);

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('title', function () {
		it('should set title on the button if set', async () => {
			const titleText = 'close';
			element.title = titleText;
			await elementUpdated(element);
			expect(element.getAttribute('title')).toEqual(titleText);
			expect(getControlElement(element).getAttribute('title')).toEqual(
				titleText
			);
		});
		it('should remove title on the button if not set or empty', async () => {
			element.title = '';
			await elementUpdated(element);
			expect(element.hasAttribute('title')).toEqual(false);
			expect(getControlElement(element).hasAttribute('title')).toEqual(false);
		});
	});

	describe('ARIA delegation', () => {
		describe('when rendered as button', () => {
			itShouldDelegateAriaAttributes(
				() => element,
				() => getControlElement(element),
				[
					'ariaAtomic',
					'ariaBusy',
					'ariaCurrent',
					'ariaExpanded',
					'ariaHasPopup',
					'ariaHidden',
					'ariaInvalid',
					'ariaKeyShortcuts',
					'ariaLive',
					'ariaPressed',
					'ariaRelevant',
					'ariaRoleDescription',
				]
			);
		});

		describe('when rendered as anchor', () => {
			beforeEach(async () => {
				element.href = '#';
				await elementUpdated(element);
			});

			it('should render a button with href attribute as anchor element', async function () {
				expect(getControlElement(element)?.tagName).toEqual('A');
			});

			describe.each([
				'href',
				'hreflang',
				'download',
				'ping',
				'referrerpolicy',
				'rel',
				'target',
			] as const)('%s attribute', (attribute) => {
				it('should be forwarded to the anchor element', async () => {
					const text = 'link';
					await setProperty(element, attribute, text);

					expect(
						element.shadowRoot?.querySelector('a')?.getAttribute(attribute)
					).toEqual(text);
				});
			});

			itShouldDelegateAriaAttributes(
				() => element,
				() => getControlElement(element),
				[
					'ariaAtomic',
					'ariaBusy',
					'ariaCurrent',
					'ariaDisabled',
					'ariaExpanded',
					'ariaHasPopup',
					'ariaHidden',
					'ariaInvalid',
					'ariaKeyShortcuts',
					'ariaLive',
					'ariaRelevant',
					'ariaRoleDescription',
				]
			);
		});
	});
});
