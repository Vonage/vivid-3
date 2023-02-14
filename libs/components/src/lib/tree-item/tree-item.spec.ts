import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';

import type { TreeView } from '../tree-view/tree-view';
import '../tree-view';

import { treeItemDefinition } from './definition';
import { TreeItem } from './tree-item';
import '.';

const COMPONENT_TAG = 'vwc-tree-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-tree-item', () => {
	let element: TreeView;
	let treeItem1: TreeItem;
	let treeItem2: TreeItem;

	beforeEach(async () => {
		element = (await fixture(
			`<vwc-tree-view>
				<${COMPONENT_TAG} id="item1">
					<${COMPONENT_TAG} slot="item"></${COMPONENT_TAG}>
				</${COMPONENT_TAG}>
				<${COMPONENT_TAG} id="item2"></${COMPONENT_TAG}>
			</vwc-tree-view>`
		)) as TreeView;
		await elementUpdated(element);

		treeItem1 = element.querySelector('#item1') as TreeItem;
		treeItem2 = element.querySelector('#item2') as TreeItem;

		await elementUpdated(treeItem1);
		await elementUpdated(treeItem2);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tree-item', async () => {
			expect(treeItemDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(treeItem1).toBeInstanceOf(TreeItem);
			expect(treeItem1.text).toBeUndefined();
			expect(treeItem1.icon).toBeUndefined();
			expect(treeItem1.selected).toBeUndefined();
			expect(treeItem1.expanded).toEqual(false);
			expect(treeItem1.disabled).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should add an icon to the tree item', async () => {
			const iconName = 'home';
			treeItem2.icon = iconName;
			await elementUpdated(treeItem2);

			const icon = getControlElement(treeItem2).querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual(iconName);
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';
			treeItem1.text = text;
			await elementUpdated(treeItem1);

			expect(getControlElement(treeItem1)?.textContent?.trim())
				.toEqual(text);
		});
	});

	it('should set the `aria-selected` attribute with the `selected` value when provided', async () => {
		treeItem1.selected = true;
		await elementUpdated(treeItem1);
		expect(treeItem1.getAttribute('aria-selected')).toEqual('true');
	});

	it('should set the `aria-expanded` attribute with the `expanded` value when provided', async () => {
		treeItem1.expanded = true;
		await elementUpdated(treeItem1);
		expect(treeItem1.getAttribute('aria-expanded')).toEqual('true');
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		treeItem1.disabled = true;
		await elementUpdated(treeItem1);
		expect(treeItem1.getAttribute('aria-disabled')).toEqual('true');
	});

	it('should expand/collapse using right/left arrows', async () => {
		expect(treeItem1.expanded).toBeFalsy();
		
		treeItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await elementUpdated(treeItem1);

		expect(treeItem1.expanded).toBeTruthy();

		treeItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
		await elementUpdated(treeItem1);

		expect(treeItem1.expanded).toBeFalsy();
	})

	describe('tree-item click', () => {
		it('should expand when click', async () => {
			const expandButton = getControlElement(treeItem1).querySelector(ICON_SELECTOR) as Icon;
			expandButton.click();

			await elementUpdated(treeItem1);
			expect(treeItem1.getAttribute('aria-expanded')).toEqual('true');
		});

		it('should focus out', async () => {
			treeItem1.focus();
			await elementUpdated(treeItem1);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();
			expect(treeItem2.contains(document.activeElement)).toBeFalsy();

			treeItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			treeItem2.focus();
			await elementUpdated(treeItem2);

			expect(treeItem1.contains(document.activeElement)).toBeFalsy();
			expect(treeItem2.contains(document.activeElement)).toBeTruthy();
		});
	});
});
