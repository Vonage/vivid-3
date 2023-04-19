import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Pagination } from './pagination';
import { paginationDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-pagination';

describe('vwc-pagination', () => {
	let element: Pagination;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Pagination;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-pagination', async () => {
			expect(paginationDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Pagination);
		});
	});
});
