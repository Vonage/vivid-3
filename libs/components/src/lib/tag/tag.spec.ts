import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { Tag } from './tag';
import '.';

const COMPONENT_TAG = 'vwc-tag';
async function toggleRemovable(element: Tag, removable = true) {
	element.removable = removable;
	await elementUpdated(element);
}

async function toggleSelectable(element: Tag, selectable = true) {
	element.selectable = selectable;
	await elementUpdated(element);
}

describe('vwc-tag', () => {
	let element: Tag;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tag;
	});

	describe('basic', () => {
		it('initializes as a vwc-tag', async () => {
			expect(element).toBeInstanceOf(Tag);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.selectable).toBe(false);
			expect(element.selected).toBe(false);
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
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot!.querySelector('vwc-icon');
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
		});
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.textContent?.trim()).toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const baseElementContainsConnotationClass = getBaseElement(
				element
			).classList.contains(`connotation-${connotation}`);
			expect(baseElementContainsConnotationClass).toBeTruthy();
		});
	});

	describe('shape', () => {
		it('sets correct internal shape style', async () => {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const baseElementContainsShapeClass = getBaseElement(
				element
			).classList.contains(`shape-${shape}`);
			expect(baseElementContainsShapeClass).toBeTruthy();
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'duotone';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const baseElementContainsAppearanceClass = getBaseElement(
				element
			).classList.contains(`appearance-${appearance}`);
			expect(baseElementContainsAppearanceClass).toBeTruthy();
		});
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const baseElementContainsDisabledClass =
				getBaseElement(element).classList.contains('disabled');
			expect(baseElementContainsDisabledClass).toBeTruthy();
		});

		it('should reflect as aria-disabled on the base element', async () => {
			element.disabled = true;
			await elementUpdated(element);

			expect(getBaseElement(element).getAttribute('aria-disabled')).toEqual(
				'true'
			);
		});
	});

	describe('selectable', () => {
		it('should init to false', async () => {
			expect(element.selectable).toEqual(false);
			expect(element.hasAttribute('selectable')).toEqual(false);
		});

		it('should toggle attribute on host', async () => {
			await toggleSelectable(element);
			const removeAttributeExistsWhenTrue = element.hasAttribute('selectable');

			await toggleSelectable(element, false);
			const removeAttributeExistsWhenFalse = element.hasAttribute('selectable');

			expect(removeAttributeExistsWhenTrue).toEqual(true);
			expect(removeAttributeExistsWhenFalse).toEqual(false);
		});

		it('should set selectable property on attribute change', async () => {
			element.toggleAttribute('selectable');
			await elementUpdated(element);
			expect(element.selectable).toEqual(true);
		});

		it('should remove the selectable icon when selectable is false', async () => {
			expect(element.shadowRoot?.querySelector('.selectable-icon')).toEqual(
				null
			);
		});

		it('should remove the selectable icon on click', async () => {
			await toggleSelectable(element, true);
			element.click();
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.selectable-icon')).toEqual(
				null
			);
		});

		it('should update selected to true when selectable', async () => {
			await toggleSelectable(element, true);
			getBaseElement(element).click();
			await elementUpdated(element);
			expect(element.selected).toBeTruthy();
		});

		it('should leave selected unchanged when not selectable', async () => {
			await toggleSelectable(element, false);
			getBaseElement(element).click();
			await elementUpdated(element);
			expect(element.selected).toBeFalsy();
		});

		it('should update selected to true when Enter is pressed', async () => {
			await toggleSelectable(element, true);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter' })
			);
			await elementUpdated(element);
			expect(element.selected).toBeTruthy();
		});

		it('should dispatch selected-changed', async () => {
			const spy = vi.fn();

			element.selected = true;
			await elementUpdated(element);

			element.addEventListener('selected-change', spy);
			element.dispatchEvent(new CustomEvent('selected-change'));

			element.selected = true;
			await elementUpdated(element);

			expect(spy).toBeCalled();
		});
	});

	describe('selected', () => {
		it('should reflect as aria-selected on the base element when selectable is true', async () => {
			element.selectable = true;
			element.selected = true;
			await elementUpdated(element);

			expect(getBaseElement(element).getAttribute('aria-selected')).toEqual(
				'true'
			);
		});
	});

	describe('removable', () => {
		it('should init to false', async () => {
			expect(element.removable).toEqual(false);
			expect(element.hasAttribute('removable')).toEqual(false);
		});

		it('should toggle attribute on host', async () => {
			await toggleRemovable(element);
			const removeAttributeExistsWhenTrue = element.hasAttribute('removable');

			await toggleRemovable(element, false);
			const removeAttributeExistsWhenFalse = element.hasAttribute('removable');

			expect(removeAttributeExistsWhenTrue).toEqual(true);
			expect(removeAttributeExistsWhenFalse).toEqual(false);
		});

		it('should set removable property on attribute change', async () => {
			element.toggleAttribute('removable');
			await elementUpdated(element);
			expect(element.removable).toEqual(true);
		});

		it('should add a remove button when true', async () => {
			expect(element.shadowRoot?.querySelector('.dismiss-button')).toEqual(
				null
			);
			await toggleRemovable(element, true);
			expect(element.shadowRoot?.querySelector('.dismiss-button')).toBeTruthy();
		});

		it('should remove tag on remove button click', async () => {
			await toggleRemovable(element, true);
			const dismissButton = element.shadowRoot?.querySelector(
				'.dismiss-button'
			) as HTMLElement;
			dismissButton.click();
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(false);
		});

		it('should remove tag on remove', async () => {
			await toggleRemovable(element, true);
			element.remove();
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(false);
		});
	});

	describe('remove', () => {
		it('should remove tag', async () => {
			await toggleRemovable(element, true);
			element.remove();
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(false);
		});

		it('should remove tag on Delete press and removable is true', async () => {
			await toggleRemovable(element, true);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Delete' })
			);
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(false);
		});

		it('should remove tag on Backspace press and removable is true', async () => {
			await toggleRemovable(element, true);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Backspace' })
			);
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(false);
		});

		it('should still show tag after Delete press when removable is false', async () => {
			await toggleRemovable(element, false);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Delete' })
			);
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(true);
		});

		it('should c on keydown when disabled', async () => {
			element.disabled = false;
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Delete' })
			);
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(true);
		});

		it('should still show tag when selectable is true', async () => {
			await toggleSelectable(element, true);
			await toggleRemovable(element, true);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Delete' })
			);
			await elementUpdated(element);
			expect(document.body.contains(element)).toEqual(true);
		});

		it('should fire removed event', async () => {
			const spy = vi.fn();
			await toggleRemovable(element, true);
			element.addEventListener('removed', spy);
			element.remove();
			expect(spy).toHaveBeenCalled();
		});

		it('should still show tag', async () => {
			const spy = vi.fn();
			element.addEventListener('removed', spy);
			element.remove();
			expect(spy).not.toHaveBeenCalled();
		});

		it('should disable removed events after disconnected callback', async () => {
			const spy = vi.fn();
			element.addEventListener('removed', spy);
			element.disconnectedCallback();

			element.remove();
			await elementUpdated(element);

			expect(spy.mock.calls.length).toEqual(0);
		});
	});
});
