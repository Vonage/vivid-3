import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Fab, type FabConnotation } from './fab';
import '.';

const COMPONENT_TAG = 'vwc-fab';
describe('vwc-fab', () => {
	let element: Fab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Fab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-fab', async () => {
			expect(element).toBeInstanceOf(Fab);
			expect(element.label).toBeUndefined();
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.size).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('label', () => {
		it('should set label property', async () => {
			expect(getControlElement(element).textContent?.trim()).toEqual('');
			const label = 'lala';
			element.label = label;
			await elementUpdated(element);
			expect(getControlElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector('vwc-icon');
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
		});

		it('should set icon-trailing property', async () => {
			expect(
				getControlElement(element).classList.contains('icon-trailing')
			).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains('icon-trailing')
			).toBeTruthy();
		});
	});

	describe('icon-only class', () => {
		it('should set icon-only property when icon is set', async () => {
			expect(
				getControlElement(element).classList.contains('icon-only')
			).toBeFalsy();
			const icon = 'home-line';
			element.icon = icon;
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains('icon-only')
			).toBeTruthy();
		});

		it('should have an icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
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

		it('should leave the slotted elements unreflected', async () => {
			const slottedElement = document.createElement('span');
			slottedElement.slot = 'icon';
			element.appendChild(slottedElement);
			await elementUpdated(element);
			expect(element.iconSlottedContent?.length).toEqual(1);
			expect(element.hasAttribute('iconSlottedContent')).toEqual(false);
		});
	});

	describe('connotation', () => {
		it('should set connotation property', async () => {
			const connotation = 'cta' as FabConnotation;
			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeFalsy();
			element.connotation = connotation;
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeTruthy();
		});
	});

	describe('fab size', function () {
		it('sets correct internal size style', async () => {
			const size = 'expanded';
			(element as any).size = size;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.control.size-${size}`
			);
			expect(control?.classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});

	describe('ARIA delegation', () => {
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
				'ariaLabel',
				'ariaLive',
				'ariaPressed',
				'ariaRelevant',
				'ariaRoleDescription',
			]
		);
	});
});
