import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import type { TreeItem } from '../tree-item/tree-item';
import '../tree-item';
import { TreeView } from './tree-view';
import '.';

const COMPONENT_TAG = 'vwc-tree-view';

describe('a11y: vwc-tree-view', () => {
	let element: TreeView;
	let treeItem1: TreeItem;
	let treeItem2: TreeItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

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
