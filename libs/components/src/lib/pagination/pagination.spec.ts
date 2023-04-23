import {elementUpdated, fixture} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Pagination } from './pagination';
import { paginationDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-pagination';

function getButtonText(button: any) {
	const firstButtonText = button.label;
	return firstButtonText;
}

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
			expect(element.total).toEqual(0);
		});

		it('should reflect total attribute', async function () {
			element.setAttribute('total', '10');
			await elementUpdated(element);
			expect(element.total).toEqual(10);
		});

		it('should add a button when total is set to 1', async () => {
			element.total = 1;
			await elementUpdated(element);
			const buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
			const firstButtonText = getButtonText(buttons?.item(0));
			expect(element.pagesList.length).toEqual(1);
			expect(buttons?.length).toEqual(1);
			expect(firstButtonText).toEqual('1');
		});

		it.each([2, 3, 4, 5])('should add %i buttons when total is set to %i', async (total) => {
			element.total = total;
			await elementUpdated(element);
			const buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
			expect(element.pagesList.length).toEqual(total);
			expect(buttons?.length).toEqual(total);
			buttons?.forEach((button: any, index: number) => {
				const buttonText = getButtonText(button);
				expect(buttonText).toEqual(`${index + 1}`);
			});
		});

		describe('selectedIndex', function () {
			it('should init as -1', async () => {
				expect(element.selectedIndex).toEqual(-1);
			});

			it('should set selectedIndex as zero only when first setting total', async () => {
				element.total = 2;
				const selectedIndexAfterFirstTotalSet = element.selectedIndex;

				element.selectedIndex = 1;
				element.total = 3;
				const selectedIndexAfterSecondTotalSet = element.selectedIndex;

				expect(selectedIndexAfterFirstTotalSet).toEqual(0);
				expect(selectedIndexAfterSecondTotalSet).toEqual(1);
			});

			it('should reflect selectedIndex attribute', async function () {
				element.setAttribute('selected-index', '10');
				await elementUpdated(element);
				expect(element.selectedIndex).toEqual(10);
			});

			it('should set to -1 when total is set to zero', function () {
				element.total = 2;
				element.total = 0;
				expect(element.selectedIndex).toEqual(-1);
			});
		});

		// TODO: add tests for adding the buttons with lots of pages (the ...)
		// TODO: add tests for clicking the buttons
		// TODO: add tests for clicking the buttons with lots of pages (the ...)
		// TODO: add tests for keyboard navigation
		// TODO: add tests for prev/next buttons
		// TODO: prevent pagesList mutation
	});
});
