import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import '.';
import { TreeItem } from './tree-item';
import { treeItemDefinition } from './definition';

const COMPONENT_TAG = 'vwc-tree-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-tree-item', () => {
	let element: TreeItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TreeItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tree-item', async () => {
			expect(treeItemDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(TreeItem);
			expect(element.text).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.selected).toBeFalsy();
			expect(element.expanded).toBeUndefined();
			expect(element.disabled).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should add an icon to the nav item', async () => {
			element.icon = 'home';
			await elementUpdated(element);
	
			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
			expect(element.text).toEqual(undefined);
			expect(element.icon).toBeUndefined();
		});
	});
	
	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);
	
			expect(getControlElement(element)?.textContent?.trim())
				.toEqual(text);
		});
	});
	
	it('should set the `aria-selected` attribute with the `selected` value when provided', async () => {
		element.selected = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-selected')).toEqual('true');
	});

	it('should set the `aria-expanded` attribute with the `expanded` value when provided', async () => {
		element.expanded = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-expanded')).toEqual('true');
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		element.disabled = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-disabled')).toEqual('true');
	});
});