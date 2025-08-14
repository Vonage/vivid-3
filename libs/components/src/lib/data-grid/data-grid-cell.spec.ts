import { html } from '@microsoft/fast-element';
import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import type { Mock } from 'vitest';
import { currentLocale } from '../../shared/localization';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellSortStates } from './data-grid.options';
import '.';

const COMPONENT_TAG = 'vwc-data-grid-cell';
const ICON_TAG = 'vwc-icon';

describe('vwc-data-grid-cell', () => {
	let element: DataGridCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGridCell;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGridCell);
			expect(element.cellType).toEqual('default');
			expect(element.getAttribute('cell-type')).toBeNull();
			expect(element.gridColumn).toBeUndefined();
			expect(element.getAttribute('grid-column')).toBeNull();
			expect(element.rowData).toBeNull();
			expect(element.columnDefinition).toBeNull();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('cellType', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				headerCellTemplate: html`<div id="header"></div>`,
				cellTemplate: html`<div id="cell"></div>`,
			};
		}

		it('should reflect cell-type', async () => {
			element.cellType = 'rowheader';
			await elementUpdated(element);
			expect(element.getAttribute('cell-type')).toEqual('rowheader');
		});

		it('should render header template if set to columnheader', async () => {
			setCellDataAndConfig();

			element.cellType = 'columnheader';
			await elementUpdated(element);
			expect(element.querySelector('#header')).toBeTruthy();
			expect(element.querySelector('#cell')).toBeNull();
		});

		it('should render cell template if set to rowheader', async () => {
			setCellDataAndConfig();

			element.cellType = 'rowheader';
			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeTruthy();
			expect(element.querySelector('#header')).toBeNull();
		});

		it('should render cell template with the default value', async () => {
			setCellDataAndConfig();

			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeTruthy();
			expect(element.querySelector('#header')).toBeNull();
		});

		it('should render default cell template if given an invalid cell type', async () => {
			setCellDataAndConfig();
			element.cellType = 'invalid' as any;
			await elementUpdated(element);
			expect(element.querySelector('#cell')).toBeNull();
			expect(element.innerText).toBeUndefined();
		});
	});

	describe('gridColumn', () => {
		it('should reflect grid-column', async () => {
			element.gridColumn = '3';
			await elementUpdated(element);
			expect(element.getAttribute('grid-column')).toEqual('3');
		});

		it('should update the grid column style property', async () => {
			element.gridColumn = '3';
			await elementUpdated(element);
			expect(element.style.gridColumn).toEqual('3');
		});

		it('should remove the gridColumn style if gridColumn is undefined', async () => {
			expect(element.style.gridColumn).toEqual('');
		});

		it('should remove the gridColumn style if gridColumn contains undefined', async function () {
			element.gridColumn = 'undefined / undefined';
			await elementUpdated(element);
			expect(element.style.gridColumn).toEqual('');
		});
	});

	describe('columnDefinition', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				cellTemplate: html`<div id="cell"></div>`,
			};
		}

		it('should re-render the cell view on change', async () => {
			setCellDataAndConfig();
			await elementUpdated(element);
			const templateRendered = !!element.querySelector('#cell');
			element.columnDefinition = {
				columnDataKey: 'age',
			};
			await elementUpdated(element);
			expect(templateRendered).toBeTruthy();
			expect(element.querySelector('#cell')).toBeNull();
			expect(element.textContent?.trim()).toEqual('33');
		});
	});

	describe('Event Handlers', () => {
		let elementToFocus: HTMLInputElement;

		beforeEach(async () => {
			element.columnDefinition = {
				columnDataKey: 'name',
			};
			elementToFocus = document.createElement('input');
			document.body.appendChild(elementToFocus);
		});

		afterEach(async () => {
			elementToFocus.remove();
		});

		describe('handleFocusin', () => {
			it('should focus on focus target element on cell focusin', async () => {
				document.body.appendChild(elementToFocus);
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					},
				};
				element.dispatchEvent(new Event('focusin'));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should focus on target element when header is focused', async () => {
				element.cellType = 'columnheader';
				element.columnDefinition = {
					columnDataKey: 'name',
					headerCellFocusTargetCallback: () => {
						return elementToFocus;
					},
				};
				element.dispatchEvent(new Event('focusin'));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should fire "cell-focused" event', async () => {
				const spy = vi.fn();
				element.addEventListener('cell-focused', spy);
				element.focus();
				expect(spy).toHaveBeenCalledTimes(1);
			});

			it('should set "active" class on the base element', async () => {
				const baseElement = getBaseElement(element);
				const hasActiveClassBeforeFocus =
					baseElement?.classList.contains('active');
				element.dispatchEvent(new Event('focusin'));
				expect(hasActiveClassBeforeFocus).toBeFalsy();
				expect(baseElement?.classList.contains('active')).toBeTruthy();
			});

			it('should ignore additional focusin events', async () => {
				const spy = vi.fn();
				element.addEventListener('cell-focused', spy);

				element.dispatchEvent(new Event('focusin'));
				element.dispatchEvent(new Event('focusin'));

				expect(spy).toHaveBeenCalledTimes(1);
			});
		});

		describe('handleKeydown', () => {
			it.each(['Enter', 'F2'])(
				'should focus on target element with %s key',
				async (key) => {
					element.cellType = 'default';
					element.columnDefinition = {
						columnDataKey: 'name',
						cellFocusTargetCallback: () => {
							return elementToFocus;
						},
						cellInternalFocusQueue: true,
					};
					element.dispatchEvent(new KeyboardEvent('keydown', { key }));
					expect(document.activeElement).toEqual(elementToFocus);
				}
			);

			it('should focus on header target element when cellType is columnheader', async () => {
				element.cellType = 'columnheader';
				element.columnDefinition = {
					columnDataKey: 'name',
					headerCellFocusTargetCallback: () => {
						return elementToFocus;
					},
					headerCellInternalFocusQueue: true,
				};
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should focus on grid-cell when escape key pressed and child is focused', async () => {
				element.columnDefinition = {
					columnDataKey: 'name',
					cellInternalFocusQueue: true,
				};
				const childNode = document.createElement('button');
				element.appendChild(childNode);
				childNode.focus();
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
				expect(document.activeElement).toEqual(element);
			});

			it('should not move focus if a child is already focused', async () => {
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					},
					cellInternalFocusQueue: true,
				};
				const focusedChild = document.createElement('input');
				element.appendChild(focusedChild);
				focusedChild.focus();
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
				expect(document.activeElement).toBe(focusedChild);
			});
		});
	});

	describe('setFixedPosition', () => {
		it('should set fixed position and add fixed class', async () => {
			element.setFixedPosition('100px');
			await elementUpdated(element);

			expect(element.style.left).toBe('100px');
			expect(element.hasAttribute('data-fixed')).toBe(true);
		});
	});

	/**
	 * @deprecated
	 */
	describe('aria-selected', function () {
		it('should init without aria-selected', async () => {
			expect(element.hasAttribute('aria-selected')).toEqual(false);
		});

		it('should set selected class on base when aria-selected true on init', async () => {
			const newElement = (await fixture(
				`<${COMPONENT_TAG} aria-selected="true"></${COMPONENT_TAG}>`
			)) as DataGridCell;
			await elementUpdated(newElement);
			expect(
				getBaseElement(newElement)?.classList.contains('selected')
			).toBeTruthy();
		});

		it('should set selected class on base when aria-selected true', async () => {
			element.setAttribute('aria-selected', 'true');
			await elementUpdated(element);
			expect(
				getBaseElement(element)?.classList.contains('selected')
			).toBeTruthy();
		});

		it('should remove selected class on base when aria-selected is not true', async function () {
			element.setAttribute('aria-selected', 'true');
			await elementUpdated(element);

			element.setAttribute('aria-selected', 'false');
			await elementUpdated(element);
			expect(
				getBaseElement(element)?.classList.contains('selected')
			).toBeFalsy();
		});

		it('should add visually-hidden description that the cell is selected', async () => {
			element.setAttribute('aria-selected', 'true');
			await elementUpdated(element);

			const visuallyHiddenElement = element.shadowRoot?.querySelector(
				'vwc-visually-hidden'
			);

			expect(visuallyHiddenElement).toBeTruthy();
			expect(visuallyHiddenElement?.textContent).toEqual(
				currentLocale.locale.dataGrid.cell.selected
			);
		});

		it('visually-hidden should be removed when cell is not selected.', async () => {
			element.setAttribute('aria-selected', 'false');
			await elementUpdated(element);

			const visuallyHiddenElement = element.shadowRoot?.querySelector(
				'vwc-visually-hidden'
			);

			expect(visuallyHiddenElement).toBeFalsy();
		});
	});

	describe('selected', function () {
		it('should init without selected', async () => {
			expect(element.selected).toEqual(false);
		});

		it('should not set aria-selected attribute by default.', async () => {
			await elementUpdated(element);
			const ariaSelectedAttribute = element.hasAttribute('aria-selected');

			expect(ariaSelectedAttribute).toEqual(false);
		});

		it('should reflect true value in aria-selected attribute', async () => {
			element._selectable = true;
			element.selected = true;
			await elementUpdated(element);

			const ariaSelectedAttribute = element.getAttribute('aria-selected');

			expect(ariaSelectedAttribute).toEqual('true');
		});

		it('should reflect false value in aria-selected attribute', async () => {
			element._selectable = true;
			element.selected = true;
			await elementUpdated(element);

			element.selected = false;
			await elementUpdated(element);

			const ariaSelectedAttribute = element.getAttribute('aria-selected');

			expect(ariaSelectedAttribute).toEqual('false');
		});

		it('should set selected class on base when selected true on init', async () => {
			const newElement = (await fixture(
				`<${COMPONENT_TAG} selected></${COMPONENT_TAG}>`
			)) as DataGridCell;
			await elementUpdated(newElement);
			expect(
				getBaseElement(newElement)?.classList.contains('selected')
			).toBeTruthy();
		});

		it('should set selected class on base when aria-selected true', async () => {
			element.setAttribute('selected', '');
			await elementUpdated(element);
			expect(
				getBaseElement(element)?.classList.contains('selected')
			).toBeTruthy();
		});

		it('should remove selected class on base when aria-selected is not true', async function () {
			element.setAttribute('selected', '');
			await elementUpdated(element);

			element.removeAttribute('selected');
			await elementUpdated(element);
			expect(
				getBaseElement(element)?.classList.contains('selected')
			).toBeFalsy();
		});
	});

	/**
	 * @deprecated
	 */
	describe('aria-sort', () => {
		beforeEach(function () {
			element.cellType = 'columnheader';
			element.ariaSort = 'none';
		});

		it('should have a button role when sorting is enabled', async function () {
			element.setAttribute('aria-sort', 'none');
			await elementUpdated(element);
			const baseElement = element.shadowRoot?.querySelector('.base');

			expect(baseElement?.role).toEqual('button');
		});

		it('should show sort-solid icon in the header when "none" is set', async function () {
			element.setAttribute('aria-sort', 'none');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-solid');
		});

		it('should show sort-asc-solid icon when aria-sort is ascending', async function () {
			element.setAttribute('aria-sort', 'ascending');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-asc-solid');
		});

		it('should show sort-desc-solid icon when aria-sort is descending', async function () {
			element.setAttribute('aria-sort', 'descending');
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-desc-solid');
		});

		it('should remove sorting icons when aria-sort is not set', async function () {
			element.ariaSort = null;
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(0);
		});

		it('should set aria-sort from columnDefinition', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: true,
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual('ascending');
		});

		it('should revert aria-sort to "none" when columnDefinition.sort is falsy', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: null,
				sortable: true,
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual(DataGridCellSortStates.none);
		});

		it('should remove aria-sort when sortable is false', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: false,
			};
			await elementUpdated(element);
			expect(element.ariaSort).toEqual(null);
		});
	});

	describe('sort-direction', () => {
		beforeEach(function () {
			element.cellType = 'columnheader';
			element.sortDirection = 'none';
		});

		it('should have a button role when sorting is enabled', async function () {
			element.sortDirection = 'none';
			await elementUpdated(element);
			const baseElement = element.shadowRoot?.querySelector('.base');

			expect(baseElement?.role).toEqual('button');
		});

		it('should show sort-solid icon in the header when "none" is set', async function () {
			element.sortDirection = 'none';
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-solid');
		});

		it('should show sort-asc-solid icon when aria-sort is ascending', async function () {
			element.sortDirection = 'ascending';
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-asc-solid');
		});

		it('should show sort-desc-solid icon when aria-sort is descending', async function () {
			element.sortDirection = 'descending';
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(1);
			expect(sortIcons?.[0].getAttribute('name')).toEqual('sort-desc-solid');
		});

		it('should remove sorting icons when aria-sort is not set', async function () {
			element.sortDirection = undefined;
			await elementUpdated(element);
			const sortIcons = element.shadowRoot?.querySelectorAll(ICON_TAG);

			expect(sortIcons?.length).toEqual(0);
		});

		it('should set aria-sort from columnDefinition', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: true,
			};
			await elementUpdated(element);
			expect(element.sortDirection).toEqual('ascending');
		});

		it('should revert aria-sort to "none" when columnDefinition.sort is falsy', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: null,
				sortable: true,
			};
			await elementUpdated(element);
			expect(element.sortDirection).toEqual(DataGridCellSortStates.none);
		});

		it('should remove aria-sort when sortable is false', async function () {
			element.columnDefinition = {
				columnDataKey: 'Name',
				sortDirection: DataGridCellSortStates.ascending,
				sortable: false,
			};
			await elementUpdated(element);
			expect(element.sortDirection).toEqual(undefined);
		});
	});

	describe('sort event', () => {
		let onSortSpy: Mock;
		beforeEach(async () => {
			element.cellType = 'columnheader';
			element.innerHTML = 'Name';
			await elementUpdated(element);
			onSortSpy = vi.fn();
			element.addEventListener('sort', onSortSpy);
		});

		describe('without aria-sort', () => {
			it('should not emit "sort" event when clicked', async () => {
				element.click();
				expect(onSortSpy).not.toHaveBeenCalled();
			});

			it.each(['Enter', ' '])(
				'should not emit "sort" event when "%s" is pressed',
				async function (key) {
					element.dispatchEvent(new KeyboardEvent('keydown', { key }));
					expect(onSortSpy).not.toHaveBeenCalled();
				}
			);
		});

		describe('with aria-sort', () => {
			beforeEach(async () => {
				element.ariaSort = 'none';
				await elementUpdated(element);
			});

			it('should emit "sort" event when clicked', async function () {
				element.click();

				expect(onSortSpy).toHaveBeenCalledTimes(1);
				expect(onSortSpy.mock.calls[0][0].detail).toEqual({
					columnDataKey: 'Name',
					sortDirection: 'none',
				});
			});

			it.each(['Enter', ' '])(
				'should fire "sort" event when "%s" is pressed',
				async function (key) {
					element.dispatchEvent(new KeyboardEvent('keydown', { key }));

					expect(onSortSpy).toHaveBeenCalledTimes(1);
					expect(onSortSpy.mock.calls[0][0].detail).toEqual({
						columnDataKey: 'Name',
						sortDirection: 'none',
					});
				}
			);
		});

		describe('with columnDefinition', () => {
			beforeEach(async () => {
				element.columnDefinition = {
					sortDirection: DataGridCellSortStates.ascending,
					sortable: true,
					columnDataKey: 'Not Name',
				};
				await elementUpdated(element);
			});

			it('should fire "sort" event when clicked with data key from config', async function () {
				element.click();
				expect(onSortSpy).toHaveBeenCalledTimes(1);
				expect(onSortSpy.mock.calls[0][0].detail).toEqual({
					columnDataKey: 'Not Name',
					sortDirection: 'ascending',
				});
			});
		});
	});

	describe('cell-click event', () => {
		let onCellClickSpy: Mock;
		let expectedDetail: object;
		beforeEach(async () => {
			element.cellType = 'default';
			element.innerHTML = 'Name';
			await elementUpdated(element);
			onCellClickSpy = vi.fn();
			element.addEventListener('cell-click', onCellClickSpy);
			expectedDetail = {
				cell: element,
				row: element.parentElement,
				isHeaderCell: false,
				columnDataKey: 'Name',
			};
		});

		it('should emit "cell-click" event when clicked', async () => {
			element.click();
			expect(onCellClickSpy).toHaveBeenCalledTimes(1);
			expect(onCellClickSpy.mock.calls[0][0].detail).toEqual(expectedDetail);
		});

		describe.each(['Enter', ' '])('when "%s" is pressed', (key) => {
			it('should emit "cell-click" event', async () => {
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).toHaveBeenCalledTimes(1);
				expect(onCellClickSpy.mock.calls[0][0].detail).toEqual(expectedDetail);
			});

			it('should not emit "cell-click" event if the cell has an internal focus queue', async () => {
				element.columnDefinition = {
					cellInternalFocusQueue: true,
					columnDataKey: 'Name',
				};
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).not.toHaveBeenCalled();
			});

			it('should not emit "cell-click" event it is a header cell with an internal focus queue', async () => {
				element.cellType = 'columnheader';
				element.columnDefinition = {
					headerCellInternalFocusQueue: true,
					columnDataKey: 'Name',
				};
				element.dispatchEvent(new KeyboardEvent('keydown', { key }));
				expect(onCellClickSpy).not.toHaveBeenCalled();
			});
		});

		it('should set isHeaderCell if cellType is "columnheader"', async () => {
			element.cellType = 'columnheader';
			element.click();
			expect(onCellClickSpy).toHaveBeenCalledTimes(1);
			expect(onCellClickSpy.mock.calls[0][0].detail.isHeaderCell).toBe(true);
		});
	});
});
