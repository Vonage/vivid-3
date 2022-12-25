import { html } from '@microsoft/fast-element';
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { designSystem } from '../../shared/design-system';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellTemplate } from './data-grid-cell.template';

const dataGridCell = DataGridCell.compose<FoundationElementDefinition>({
	baseName: 'data-grid-cell',
	template: DataGridCellTemplate as any
});

designSystem.withPrefix('vwc').register(dataGridCell());

const COMPONENT_TAG = 'vwc-data-grid-cell';

describe('vwc-data-grid-cell', () => {
	let element: DataGridCell;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as DataGridCell;
	});

	// TODO::adds grid column style
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
	});

	describe('cellType', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				headerCellTemplate: html`<div id="header"></div>`,
				cellTemplate: html`<div id="cell"></div>`
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
	});

	describe('columnDefinition', () => {
		function setCellDataAndConfig() {
			element.rowData = { name: 'x', age: 33 };
			element.columnDefinition = {
				columnDataKey: 'name',
				cellTemplate: html`<div id="cell"></div>`
			};
		}

		it('should re-render the cell view on change', async () => {
			setCellDataAndConfig();
			await elementUpdated(element);
			const templateRendered = !!element.querySelector('#cell');
			element.columnDefinition = {
				columnDataKey: 'age'
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
				columnDataKey: 'name'
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
					}
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
					}
				};
				element.dispatchEvent(new Event('focusin'));
				expect(document.activeElement).toEqual(elementToFocus);
			});

			it('should fire "cell-focused" event', async () => {
				const spy = jest.fn();
				element.addEventListener('cell-focused', spy);
				element.focus();
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});

		describe('handleKeydown', () => {
			it('should focus on target element with enter key when focused', async () => {
				element.focus();
				element.cellType = 'default';
				element.columnDefinition = {
					columnDataKey: 'name',
					cellFocusTargetCallback: () => {
						return elementToFocus;
					}
				};
				element.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
				// console.log(document.activeElement);				
				// expect(document.activeElement).toEqual(elementToFocus);
			});
		});
	});
});
