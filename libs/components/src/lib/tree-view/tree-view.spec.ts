import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { TreeItem } from '../tree-item/tree-item';
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
			`<vwc-tree-view>
				<${COMPONENT_TAG} id="item1"></${COMPONENT_TAG}>
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
	});

	describe('tree-view click', () => {
		it('should focus on key down', async () => {
			treeItem1.click();
			treeItem1.focus();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();

			treeItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

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

			treeItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			treeItem2.focus();
			await elementUpdated(treeItem2);
			await elementUpdated(element);

			expect(treeItem1.contains(document.activeElement)).toBeFalsy();
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
});
