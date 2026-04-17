import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import type { TableSortingButton } from './table-sorting-button';
import '.';

const COMPONENT_TAG = 'vwc-table-sorting-button';

describe('Table sorting button', () => {
	let element: TableSortingButton;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableSortingButton;
	});

	describe('direction attribute', () => {
		it('has no direction set by default', async () => {
			await elementUpdated(element);
			expect(element.direction).toBeUndefined();
		});

		it('reflects the "none" direction value as an attribute', async () => {
			element.direction = 'none';
			await elementUpdated(element);
			expect(element.getAttribute('direction')).toBe('none');
		});

		it('reflects the "asc" direction value as an attribute', async () => {
			element.direction = 'asc';
			await elementUpdated(element);
			expect(element.getAttribute('direction')).toBe('asc');
		});

		it('reflects the "desc" direction value as an attribute', async () => {
			element.direction = 'desc';
			await elementUpdated(element);
			expect(element.getAttribute('direction')).toBe('desc');
		});

		it('can be set to null to remove the direction', async () => {
			element.direction = null;
			await elementUpdated(element);
			expect(element.getAttribute('direction')).toBeNull();
		});
	});

	describe('when toggleSort() is called', () => {
		it('dispatches a "sort" event with the new direction as detail', async () => {
			const handler = vi.fn();
			element.addEventListener('sort', handler);

			element.toggleSort();
			await elementUpdated(element);

			expect(handler).toHaveBeenCalled();
			expect(handler.mock.calls[0][0].detail).toBe('asc');
		});

		it('dispatches a bubbling and composed "sort" event', async () => {
			const handler = vi.fn();
			element.addEventListener('sort', handler);

			element.toggleSort();
			await elementUpdated(element);

			const event: CustomEvent = handler.mock.calls[0][0];
			expect(event.bubbles).toBe(true);
			expect(event.composed).toBe(true);
		});
	});

	describe('icon rendering based on direction', () => {
		it('shows the neutral sort icon when direction is not set', async () => {
			await elementUpdated(element);
			expect(
				element.shadowRoot!.querySelector('[name="sort-line"]')
			).not.toBeNull();
		});

		it('shows the neutral sort icon when direction is "none"', async () => {
			element.direction = 'none';
			await elementUpdated(element);
			expect(
				element.shadowRoot!.querySelector('[name="sort-line"]')
			).not.toBeNull();
		});

		it('shows the ascending sort icon when direction is "asc"', async () => {
			element.direction = 'asc';
			await elementUpdated(element);
			expect(
				element.shadowRoot!.querySelector('[name="sort-asc-line"]')
			).not.toBeNull();
		});

		it('shows the descending sort icon when direction is "desc"', async () => {
			element.direction = 'desc';
			await elementUpdated(element);
			expect(
				element.shadowRoot!.querySelector('[name="sort-desc-line"]')
			).not.toBeNull();
		});
	});

	describe('toggleSort()', () => {
		it('changes direction from undefined to "asc"', async () => {
			element.toggleSort();
			await elementUpdated(element);
			expect(element.direction).toBe('asc');
		});

		it('changes direction from "none" to "asc"', async () => {
			element.direction = 'none';
			await elementUpdated(element);

			element.toggleSort();
			await elementUpdated(element);

			expect(element.direction).toBe('asc');
		});

		it('changes direction from "asc" to "desc"', async () => {
			element.direction = 'asc';
			await elementUpdated(element);

			element.toggleSort();
			await elementUpdated(element);

			expect(element.direction).toBe('desc');
		});

		it('changes direction from "desc" to "none"', async () => {
			element.direction = 'desc';
			await elementUpdated(element);

			element.toggleSort();
			await elementUpdated(element);

			expect(element.direction).toBe('none');
		});

		it('emits a "sort" event with the new direction before updating the direction', async () => {
			const handler = vi.fn();
			element.addEventListener('sort', handler);

			element.toggleSort();
			await elementUpdated(element);

			expect(handler.mock.calls[0][0].detail).toBe('asc');
		});

		it('does not change direction when the "sort" event is prevented', async () => {
			element.addEventListener('sort', (e) => e.preventDefault(), {
				once: true,
			});

			element.toggleSort();
			await elementUpdated(element);

			expect(element.direction).toBeUndefined();
		});

		it('is triggered when the element is clicked', async () => {
			const toggleSortSpy = vi.spyOn(element, 'toggleSort');

			element.click();
			await elementUpdated(element);

			expect(toggleSortSpy).toHaveBeenCalledOnce();
		});
	});
});
