import { fixture } from '@vivid-nx/shared';
import { TagGroup } from './tag-group';
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
			expect(element).toBeInstanceOf(TagGroup);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
