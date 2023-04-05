import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { Tag } from './tag';
import { tagDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-tag';
const ICON_SELECTOR = 'vwc-icon';

/**
 * @param element
 * @param removable
 */
async function toggleRemovable(element: Tag, removable = true) {
	element.removable = removable;
	await elementUpdated(element);
}

/**
 * @param element
 * @param removable
 */
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
			expect(tagDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Tag);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.shape).toBeUndefined();
			expect(element.appearance).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('adds an icon to the tag', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
				.toEqual('home');
		});
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.textContent?.trim())
				.toEqual(label);
		});
	});

	describe('connotation', () => {
		it('sets correct internal connotation style', async () => {
			const connotation = 'cta';
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

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			(element as any).size = size;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.size-${size}`);
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('appearance', () => {
		it('sets correct internal appearance style', async () => {
			const appearance = 'duotone';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.appearance-${appearance}`);
			expect(base)
				.toBeInstanceOf(Element);
		});
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {

			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base.disabled');
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('selectable', () => {
		it('should init to false', async () => {
			expect(element.selectable)
				.toEqual(false);
			expect(element.hasAttribute('selectable'))
				.toEqual(false);
		});

		it('should toggle attribute on host', async () => {
			await toggleSelectable(element);
			const removeAttributeExistsWhenTrue = element.hasAttribute('selectable');

			await toggleSelectable(element, false);
			const removeAttributeExistsWhenFalse = element.hasAttribute('selectable');

			expect(removeAttributeExistsWhenTrue)
				.toEqual(true);
			expect(removeAttributeExistsWhenFalse)
				.toEqual(false);
		});

		it('should set selectable property on attribute change', async () => {
			element.toggleAttribute('selectable');
			await elementUpdated(element);
			expect(element.selectable)
				.toEqual(true);
		});

		it('should remove the selectable icon when selectable is false', async () => {
			expect(element.shadowRoot?.querySelector('.selectable-icon'))
				.toEqual(null);
		});

		it('should remove the selectable icon on click', async () => {
			await toggleSelectable(element, true);
			element.click();
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.selectable-icon'))
				.toEqual(null);
		});
	});

	describe('removable', () => {
		it('should init to false', async () => {
			expect(element.removable)
				.toEqual(false);
			expect(element.hasAttribute('removable'))
				.toEqual(false);
		});

		it('should toggle attribute on host', async () => {
			await toggleRemovable(element);
			const removeAttributeExistsWhenTrue = element.hasAttribute('removable');

			await toggleRemovable(element, false);
			const removeAttributeExistsWhenFalse = element.hasAttribute('removable');

			expect(removeAttributeExistsWhenTrue)
				.toEqual(true);
			expect(removeAttributeExistsWhenFalse)
				.toEqual(false);
		});

		it('should set removable property on attribute change', async () => {
			element.toggleAttribute('removable');
			await elementUpdated(element);
			expect(element.removable)
				.toEqual(true);
		});

		it('should remove the remove button when removable is false', async () => {
			expect(element.shadowRoot?.querySelector('.dismiss-button'))
				.toEqual(null);
		});

		it('should add a remove button when true', async () => {
			await toggleRemovable(element, true);
			expect(element.shadowRoot?.querySelector('.dismiss-button'))
				.toBeInstanceOf(Element);
		});

		it('should remove tag on remove button click', async () => {
			await toggleRemovable(element, true);
			const dismissButton = element.shadowRoot?.querySelector('.dismiss-button') as HTMLElement;
			dismissButton.click();
			await elementUpdated(element);
			expect(document.body.contains(element))
				.toEqual(false);
		});

		it('should remove tag on remove', async () => {
			await toggleRemovable(element, true);
			element.remove();
			await elementUpdated(element);
			expect(document.body.contains(element))
				.toEqual(false);
		});
	});

	describe('remove', () => {
		it('should fire removed event', async () => {
			await toggleRemovable(element, true);
			element.remove();
			await elementUpdated(element);
			expect(document.body.contains(element))
				.toEqual(false);
		});

		it('should fire removed event', async () => {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.remove();
			expect(spy)
				.toHaveBeenCalled();
		});

		it('should disable removed events after disconnected callback', async () => {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.disconnectedCallback();

			element.remove();
			await elementUpdated(element);

			expect(spy.mock.calls.length)
				.toEqual(0);
		});

		it('should remove the tag after dispatch', async () => {
			element.remove();
			expect(document.body.contains(element))
				.toEqual(false);
		});
	});
});
