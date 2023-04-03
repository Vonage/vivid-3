import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Tag } from './tag';
import { tagDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-tag';

describe('vwc-tag', () => {
	let element: Tag;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tag;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tag', async () => {
			expect(tagDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Tag);
		});
	});
});
