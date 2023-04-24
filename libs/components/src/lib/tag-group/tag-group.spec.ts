import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { TagGroup } from './tag-group';
import { tagGroupDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-tag-group';

describe('vwc-tag-group', () => {
	let element: TagGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TagGroup;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tag-group', async () => {
			expect(tagGroupDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(TagGroup);
		});
	});
});
