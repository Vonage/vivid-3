import { elementUpdated, fixture } from '@vivid-nx/shared';
import {
	keyArrowDown,
	keyArrowLeft,
	keyArrowRight,
	keyArrowUp,
	keyBackspace,
	keyEnd,
	keyEnter,
	keyHome,
} from '@microsoft/fast-web-utilities';

import type { TreeItem } from '../tree-item/tree-item';
import '../tree-item';

import { getDisplayedNodes, TreeView } from './tree-view';
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
			expect(element).toBeInstanceOf(TreeView);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

			await elementUpdated(treeItem1);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();
			expect(element.contains(document.activeElement)).toBeTruthy();
		});

		it('should move focus out if theres no slotted items', async () => {
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

	describe('tree-view blur', () => {
		it('should set tabindex to 0', async () => {
			const divEle = (await fixture(
				`<div>
					<${COMPONENT_TAG}>
						<vwc-tree-item id="item1"></vwc-tree-item>
						<vwc-tree-item id="item2"></vwc-tree-item>
					</${COMPONENT_TAG}>
					<button>Button</button>
				</div>`
			)) as HTMLDivElement;
			element = divEle.querySelector(COMPONENT_TAG) as TreeView;
			const button = divEle.querySelector('button') as HTMLButtonElement;
			await elementUpdated(element);

			element.focus();
			await elementUpdated(element);

			button.focus();
			await elementUpdated(element);

			expect(element.getAttribute('tabindex')).toBe('0');
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

		it('should only allow one tree item to be selected at a time', async () => {
			treeItem1.click();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.selected).toBe(true);

			treeItem2.click();
			await elementUpdated(element);

			expect(treeItem1.selected).toBe(false);
			expect(treeItem2.selected).toBe(true);
		});

		it('should deselect a selected item when clicked', async () => {
			treeItem1.click();
			await elementUpdated(treeItem1);
			await elementUpdated(element);

			expect(treeItem1.selected).toBe(true);

			treeItem1.click();
			await elementUpdated(element);

			expect(treeItem1.selected).toBe(false);
		});

		it('should dispatch selected-changed', async () => {
			const spy = vi.fn();

			treeItem1.selected = true;
			await elementUpdated(element);

			element.addEventListener('selected-change', spy);
			element.dispatchEvent(new KeyboardEvent('selected-change'));

			treeItem2.selected = true;
			await elementUpdated(element);

			expect(spy).toBeCalled();
		});

		it('should return true if the click comes from a element that is not a tree-item', async () => {
			expect(element.handleClick({ target: {} } as Event)).toBe(true);
		});
	});

	describe('keyboard interactions', () => {
		let treeItem1_1: TreeItem;

		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-tree-item id="item1">
						<vwc-tree-item id="item1_1"></vwc-tree-item>	
					</vwc-tree-item>
					<vwc-tree-item id="item2"></vwc-tree-item>
				</${COMPONENT_TAG}>`
			)) as TreeView;
			await elementUpdated(element);

			treeItem1 = element.querySelector('#item1') as TreeItem;
			treeItem2 = element.querySelector('#item2') as TreeItem;
			treeItem1_1 = element.querySelector('#item1_1') as TreeItem;

			await elementUpdated(treeItem1);
			await elementUpdated(treeItem2);
			await elementUpdated(treeItem1_1);
			element.focus();
			await elementUpdated(element);
			await elementUpdated(treeItem1);
		});

		it('should shift focus to the next tree-item when the ArrowDown key is pressed', async () => {
			expect(treeItem1.contains(document.activeElement)).toBeTruthy();

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowDown, bubbles: true })
			);
			await elementUpdated(element);
			await elementUpdated(treeItem2);

			expect(treeItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should shift focus to the last tree-item when the END key is pressed', async () => {
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));
			await elementUpdated(element);
			await elementUpdated(treeItem2);

			expect(treeItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should shift focus to the previous tree-item when the ArrowUp key is pressed', async () => {
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));
			await elementUpdated(element);
			await elementUpdated(treeItem2);
			treeItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowUp, bubbles: true })
			);
			await elementUpdated(element);
			await elementUpdated(treeItem1);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should shift focus to the first tree-item when the Home key is pressed', async () => {
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));
			await elementUpdated(element);
			await elementUpdated(treeItem2);
			treeItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyHome, bubbles: true })
			);
			await elementUpdated(element);
			await elementUpdated(treeItem1);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should expand nested tree-items when the ArrowRight key is pressed', async () => {
			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1);

			expect(treeItem1.getAttribute('aria-expanded')).toEqual('true');
		});

		it('should shift focus to the first nested tree-item when the ArrowRight key is pressed a second time', async () => {
			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1);

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1_1);

			expect(treeItem1_1.contains(document.activeElement)).toBeTruthy();
		});

		it('should collapse expanded tree-items when the ArrowLeft key is pressed', async () => {
			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1);

			expect(treeItem1.getAttribute('aria-expanded')).toEqual('true');

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowLeft, bubbles: true })
			);
			await elementUpdated(treeItem1);

			expect(treeItem1.getAttribute('aria-expanded')).toEqual('false');
		});

		it('should shift focus to the parent tree-item when the ArrowLeft key is pressed when focussed on the first nested tree-item', async () => {
			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1);

			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowRight, bubbles: true })
			);
			await elementUpdated(treeItem1_1);

			treeItem1_1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowLeft, bubbles: true })
			);
			await elementUpdated(treeItem1);

			expect(treeItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should mark the tree-item as selected when the Enter key is pressed', async () => {
			treeItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyEnter, bubbles: true })
			);
			await elementUpdated(treeItem1);

			expect(treeItem1.selected).toBe(true);
		});

		it('should return true if the key press is not one the trigger an action', async () => {
			expect(
				element.handleKeyDown({
					key: keyBackspace,
					bubbles: true,
				} as KeyboardEvent)
			).toBeTruthy();
		});

		it('shouold return true if there are no tree-item supplied', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as TreeView;
			await elementUpdated(element);
			element.focus();
			await elementUpdated(element);

			expect(
				element.handleKeyDown({
					key: keyArrowDown,
					bubbles: true,
				} as KeyboardEvent)
			).toBeTruthy();
		});
	});

	describe('getDisplayedNodes', () => {
		it('should return an empty array when supplied with an node that is not a HTML element', () => {
			expect(getDisplayedNodes({} as any, '[selector="something"]')).toEqual(
				[]
			);
		});
	});
});
