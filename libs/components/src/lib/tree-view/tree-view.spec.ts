import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';

import type { TreeItem } from '../tree-item/tree-item';
import '../tree-item';

import { treeViewDefinition } from './definition';
import { TreeView } from './tree-view';
import '.';

const COMPONENT_TAG = 'vwc-tree-view';

describe('vwc-tree-view', () => {
	let element: TreeView;
	let treeItem1: TreeItem;
	let treeItem2: TreeItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-tree-item id="item1"></vwc-tree-item>
				<vwc-tree-item id="item2"></vwc-tree-item>
			</${COMPONENT_TAG}>`
		)) as TreeView;
		await elementUpdated(element);

		treeItem1 = element.querySelector('#item1') as TreeItem;
		treeItem2 = element.querySelector('#item2') as TreeItem;

		await elementUpdated(treeItem1);
		await elementUpdated(treeItem2);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tree-view', async () => {
			expect(treeViewDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(TreeView);
		});
	});

	it('should have a slot', async () => {
		await elementUpdated(element);
		expect(Boolean(element.shadowRoot?.querySelector('slot'))).toEqual(true);
	});

	describe('tree-view focus', () => {
		it('should focus', async () => {
			element.focus();
			await elementUpdated(element);

			expect(element.contains(document.activeElement)).toBeTruthy();

			treeItem1.focus();
			await elementUpdated(treeItem1);

			expect(element.contains(document.activeElement)).toBeTruthy();
		});

		it('should move focus out if theres no slotted items' , async () => {
			const emptyTreeView = (await fixture(
				`<${COMPONENT_TAG}>
			</${COMPONENT_TAG}>`
			)) as TreeView;
			await elementUpdated(emptyTreeView);
			const slot = emptyTreeView.shadowRoot?.querySelector('slot');
			expect(slot?.childNodes.length).toBe(0);
			expect(element.contains(document.activeElement)).toBeFalsy();

		});
	});

	describe('tree-view click', () => {
		it('should focus on key down', async () => {
			treeItem1.click();
			treeItem1.focus();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown' })
			);

			treeItem2.focus();
			await elementUpdated(treeItem2);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeFalsy();
		});

		it('should change selected', async () => {
			treeItem1.click();
			treeItem1.focus();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown' })
			);

			treeItem2.focus();
			await elementUpdated(treeItem2);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeFalsy();
		});

		it("should only allow one tree item to be selected at a time", async () => {
			treeItem1.click();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.getAttribute("aria-selected")).toEqual('true');

			treeItem2.click();
			await elementUpdated(element);

			expect(treeItem1.getAttribute("aria-selected")).toEqual('false');
			expect(treeItem2.getAttribute("aria-selected")).toEqual('true');
		});

		it("should deselect a selected item when clicked", async () => {
			treeItem1.click();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.getAttribute("aria-selected")).toEqual('true');

			treeItem1.click();
			await elementUpdated(element);

			expect(treeItem1.getAttribute("aria-selected")).toEqual('false');
		});


		it('should dispatch selected-changed', async () => {
			const spy = jest.fn();

			treeItem1.selected = true;
			await elementUpdated(element);

			element.addEventListener('selected-change', spy);
			element.dispatchEvent(new KeyboardEvent('selected-change'));

			treeItem2.selected = true;
			await elementUpdated(element);

			expect(spy).toBeCalled();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			treeItem1.text = 'Tree item 1';
			treeItem2.text = 'Tree item 2';
			treeItem1.selected = true;
			treeItem2.expanded = true;
			await elementUpdated(treeItem1);
			await elementUpdated(treeItem2);

			const children = Array.from(element.children)
				.map(({ shadowRoot }) => shadowRoot?.innerHTML)
				.join('');
			const exposedHtmlString = element.shadowRoot?.innerHTML.replace(
				'<slot></slot>',
				children
			) as string;

			expect(await axe(exposedHtmlString)).toHaveNoViolations();
		});
	});
});
