import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import type { TreeView } from '../tree-view/tree-view';
import '../tree-view';
import { TreeItem } from './tree-item';
import '.';

const COMPONENT_TAG = 'vwc-tree-item';

describe('a11y: vwc-tree-item', () => {
  let element: TreeView;
  let treeItem1: TreeItem;
  let treeItem2: TreeItem;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });
 
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
