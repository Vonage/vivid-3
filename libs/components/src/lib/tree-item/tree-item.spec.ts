import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { TreeItem } from './tree-item';
import { treeItemDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-tree-item';

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
		});
	});
});
