import {elementUpdated, fixture} from '@vivid-nx/shared';
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

	describe('total', () => {
		it('should init as 0', async () => {
			expect(element.total).toEqual(0);
		});

		it('should set total as zero of set as negative', async () => {
			element.total = -10;
			await elementUpdated(element);
			expect(element.total).toEqual(0);
		});

		it('should reflect total attribute', async function () {
			element.setAttribute('total', '10');
			await elementUpdated(element);
			expect(element.total).toEqual(10);
		});
	});

	describe('selectedIndex', function () {
		it('should init as -1', async () => {
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should set selectedIndex as zero only when first setting total', async () => {
			element.total = 2;
			await elementUpdated(element);
			const selectedIndexAfterFirstTotalSet = element.selectedIndex;

			element.selectedIndex = 1;
			element.total = 3;
			await elementUpdated(element);
			const selectedIndexAfterSecondTotalSet = element.selectedIndex;

			expect(selectedIndexAfterFirstTotalSet).toEqual(0);
			expect(selectedIndexAfterSecondTotalSet).toEqual(1);
		});

		it('should reflect selectedIndex attribute', async function () {
			element.setAttribute('selected-index', '10');
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(10);
		});


	});
});
