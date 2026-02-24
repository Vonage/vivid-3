import { elementUpdated, fixture } from '@repo/shared';
import { Table } from './table';
import '.';

const COMPONENT_TAG = 'vwc-table';

describe('Table', () => {
	let element: Table;

	const pressKey = (key: string, options?: KeyboardEventInit) => {
		document.activeElement?.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				cancelable: true,
				bubbles: true,
				...options,
			})
		);
	};

	const tableWithRows = () => `
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell>Header 1</vwc-table-header-cell>
				<vwc-table-header-cell>Header 2</vwc-table-header-cell>
			</vwc-table-row>
		</vwc-table-head>
		<vwc-table-body>
			<vwc-table-row>
				<vwc-table-cell>Row 1 Cell 1</vwc-table-cell>
				<vwc-table-cell>Row 1 Cell 2</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-cell>Row 2 Cell 1</vwc-table-cell>
				<vwc-table-cell>Row 2 Cell 2</vwc-table-cell>
			</vwc-table-row>
		</vwc-table-body>
	`;

	const getRows = () => Array.from(element.querySelectorAll('vwc-table-row'));
	const getCells = (rowIndex: number) =>
		Array.from(
			getRows()[rowIndex].querySelectorAll(
				'vwc-table-header-cell, vwc-table-cell'
			)
		) as HTMLElement[];

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Table;
	});

	describe('when the table is set up', () => {
		it('is a table component', async () => {
			expect(element).toBeInstanceOf(Table);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('has role="table" so screen readers recognize it as a table', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('table');
		});

		it('shows a head and body when you put them inside it', async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Header 1</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Data 1</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);
			expect(element.querySelector('vwc-table-head')).toBeTruthy();
			expect(element.querySelector('vwc-table-body')).toBeTruthy();
		});

		it('shows whatever content you put inside it', async () => {
			element.innerHTML = '<div>Test content</div>';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test content');
		});
	});

	describe('keyboard navigation', () => {
		beforeEach(async () => {
			element.innerHTML = tableWithRows();
			await elementUpdated(element);
		});

		describe('arrow keys', () => {
			it('moves focus between cells with Arrow Right, Down, Left, and Up', () => {
				const [row0Cells, row1Cells] = [getCells(0), getCells(1)];
				element.focus();
				expect(document.activeElement).toBe(row0Cells[0]);

				pressKey('ArrowRight');
				expect(document.activeElement).toBe(row0Cells[1]);

				pressKey('ArrowDown');
				expect(document.activeElement).toBe(row1Cells[1]);

				pressKey('ArrowLeft');
				expect(document.activeElement).toBe(row1Cells[0]);

				pressKey('ArrowUp');
				expect(document.activeElement).toBe(row0Cells[0]);
			});

			it('does not move focus when another element has already handled the arrow key', () => {
				element.focus();
				const focusedCell = document.activeElement as HTMLElement;
				const ev = new KeyboardEvent('keydown', {
					key: 'ArrowDown',
					bubbles: true,
					cancelable: true,
				});
				ev.preventDefault();
				focusedCell.dispatchEvent(ev);
				expect(document.activeElement).toBe(focusedCell);
			});
		});

		describe('Home and End', () => {
			it('End moves to the last cell in the row; Ctrl+End moves to the last cell in the table', () => {
				const [row0Cells, row2Cells] = [getCells(0), getCells(2)];
				element.focus();
				pressKey('End');
				expect(document.activeElement).toBe(row0Cells[1]);
				pressKey('End', { ctrlKey: true });
				expect(document.activeElement).toBe(row2Cells[1]);
			});

			it('Home moves to the first cell in the row; Ctrl+Home moves to the first cell in the table', () => {
				const [row0Cells, row2Cells] = [getCells(0), getCells(2)];
				element.focus();
				pressKey('End');
				pressKey('End', { ctrlKey: true });
				pressKey('Home');
				expect(document.activeElement).toBe(row2Cells[0]);
				pressKey('Home', { ctrlKey: true });
				expect(document.activeElement).toBe(row0Cells[0]);
			});

			it('Ctrl+Home from the last row moves focus to the first cell in the table', () => {
				const [row0Cells, row2Cells] = [getCells(0), getCells(2)];
				row2Cells[1].focus();
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'Home',
						ctrlKey: true,
						bubbles: true,
						cancelable: true,
					})
				);
				expect(document.activeElement).toBe(row0Cells[0]);
				expect(element.focusRowIndex).toBe(0);
				expect(element.focusColumnIndex).toBe(0);
			});

			it('Home without Ctrl is handled by the row, so the table does not move focus', () => {
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'Home',
						ctrlKey: false,
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(0);
				expect(element.focusColumnIndex).toBe(0);
			});

			it('Ctrl+End does nothing when the table has no rows', async () => {
				element.innerHTML = '';
				await elementUpdated(element);
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'End',
						ctrlKey: true,
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(0);
			});
		});

		describe('Page Up and Page Down', () => {
			it('Page Down moves focus to the next row; Page Up moves it to the previous row', () => {
				element.focusRowIndex = 1;
				element.focusColumnIndex = 0;
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'PageDown',
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(2);
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'PageUp',
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBeLessThanOrEqual(1);
			});

			it('Page Up from the first row keeps focus on the first row', () => {
				element.focus();
				const firstCell = element.querySelector(
					'vwc-table-header-cell'
				) as HTMLElement;
				pressKey('PageUp');
				expect(document.activeElement).toBe(firstCell);
			});

			it('Page Down from the last row keeps focus on the last row', () => {
				const rows = getRows();
				const lastRowCells = getCells(rows.length - 1);
				lastRowCells[0].focus();
				pressKey('PageDown');
				expect(document.activeElement).toBe(lastRowCells[0]);
			});

			it('does not crash when you press Page Up or Page Down on an empty table', async () => {
				element.innerHTML = '';
				await elementUpdated(element);
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				expect(() => {
					element.dispatchEvent(
						new KeyboardEvent('keydown', {
							key: 'PageUp',
							bubbles: true,
							cancelable: true,
						})
					);
				}).not.toThrow();
				expect(() => {
					element.dispatchEvent(
						new KeyboardEvent('keydown', {
							key: 'PageDown',
							bubbles: true,
							cancelable: true,
						})
					);
				}).not.toThrow();
			});

			it('scrolls up and moves focus when the target row is above the visible area', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row><vwc-table-cell>R1</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R2</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R3</vwc-table-cell></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				const rows = element.querySelectorAll('vwc-table-row');
				element.focusRowIndex = 1;
				element.focusColumnIndex = 0;
				Object.defineProperty(element, 'scrollTop', {
					get: () => 100,
					set: () => {
						/* stub */
					},
					configurable: true,
				});
				Object.defineProperty(rows[0], 'offsetTop', {
					value: 50,
					configurable: true,
				});
				Object.defineProperty(rows[0], 'clientHeight', {
					value: 40,
					configurable: true,
				});
				Object.defineProperty(element, 'clientHeight', {
					value: 100,
					configurable: true,
				});
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'PageUp',
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(0);
			});

			it('scrolls down and moves focus when the target row is below the visible area', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row><vwc-table-cell>R1</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R2</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R3</vwc-table-cell></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				const rows = element.querySelectorAll('vwc-table-row');
				element.focusRowIndex = 1;
				element.focusColumnIndex = 0;
				Object.defineProperty(element, 'offsetHeight', {
					value: 80,
					configurable: true,
				});
				Object.defineProperty(element, 'scrollTop', {
					get: () => 0,
					set: () => {
						/* stub */
					},
					configurable: true,
				});
				Object.defineProperty(rows[2], 'offsetTop', {
					value: 200,
					configurable: true,
				});
				Object.defineProperty(rows[2], 'offsetHeight', {
					value: 40,
					configurable: true,
				});
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'PageDown',
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(2);
			});

			it('on Page Down, skips visible rows and focuses the next row below the fold', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row><vwc-table-cell>R1</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R2</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R3</vwc-table-cell></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				const rows = element.querySelectorAll('vwc-table-row');
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				Object.defineProperty(element, 'offsetHeight', {
					value: 80,
					configurable: true,
				});
				Object.defineProperty(element, 'scrollTop', {
					get: () => 0,
					set: () => {
						/* stub */
					},
					configurable: true,
				});
				Object.defineProperty(rows[1], 'offsetTop', {
					value: 40,
					configurable: true,
				});
				Object.defineProperty(rows[1], 'offsetHeight', {
					value: 40,
					configurable: true,
				});
				Object.defineProperty(rows[2], 'offsetTop', {
					value: 80,
					configurable: true,
				});
				Object.defineProperty(rows[2], 'offsetHeight', {
					value: 40,
					configurable: true,
				});
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'PageDown',
						bubbles: true,
						cancelable: true,
					})
				);
				expect(element.focusRowIndex).toBe(2);
			});
		});

		describe('focus and tabindex', () => {
			it('becomes focusable again when focus leaves the table (e.g. Tab out)', () => {
				element.focus();
				const firstCell = element.querySelector(
					'vwc-table-cell'
				) as HTMLElement;
				firstCell.focus();
				expect(element.getAttribute('tabindex')).toBe('-1');
				const outside = document.createElement('button');
				outside.tabIndex = 0;
				document.body.append(outside);
				outside.focus();
				expect(element.getAttribute('tabindex')).toBe('0');
				outside.remove();
			});

			it('stays in focus mode when focus moves within the table', () => {
				const firstCell = element.querySelector(
					'vwc-table-cell'
				) as HTMLElement;
				firstCell.focus();
				expect(document.activeElement).toBe(firstCell);
				element.dispatchEvent(
					new FocusEvent('focusout', {
						bubbles: true,
						relatedTarget: document.body,
					})
				);
				expect(element.getAttribute('tabindex')).toBe('-1');
			});

			it('stays in focus mode when you move from one cell to another inside the table', () => {
				const firstCell = element.querySelector(
					'vwc-table-cell'
				) as HTMLElement;
				const secondCell = element.querySelectorAll(
					'vwc-table-cell'
				)[1] as HTMLElement;
				firstCell.focus();
				secondCell.focus();
				expect(element.getAttribute('tabindex')).toBe('-1');
			});
		});

		describe('interactive content inside cells', () => {
			it('lets you move the cursor inside an input with arrow keys (does not move focus)', () => {
				const inputTable = document.createElement('vwc-table') as Table;
				inputTable.innerHTML = `
					<vwc-table-body>
						<vwc-table-row>
							<vwc-table-cell><input id="cell-input" value="Action" /></vwc-table-cell>
							<vwc-table-cell>Second cell</vwc-table-cell>
						</vwc-table-row>
					</vwc-table-body>
				`;
				document.body.append(inputTable);
				const input = inputTable.querySelector(
					'#cell-input'
				) as HTMLInputElement;
				input.focus();
				pressKey('ArrowRight');
				expect(document.activeElement).toBe(input);
				inputTable.remove();
			});

			it('moves focus with arrow keys when focus is on a link inside a cell', () => {
				const linkTable = document.createElement('vwc-table') as Table;
				linkTable.innerHTML = `
					<vwc-table-body>
						<vwc-table-row>
							<vwc-table-cell><a href="#first" id="cell-link">First</a></vwc-table-cell>
							<vwc-table-cell>Second cell</vwc-table-cell>
						</vwc-table-row>
					</vwc-table-body>
				`;
				document.body.append(linkTable);
				const link = linkTable.querySelector('#cell-link') as HTMLAnchorElement;
				const cells = Array.from(linkTable.querySelectorAll('vwc-table-cell'));
				link.focus();
				pressKey('ArrowRight');
				expect(document.activeElement).toBe(cells[1]);
				linkTable.remove();
			});
		});

		describe('when the table is scrollable', () => {
			it('scrolls the newly focused cell into view when you move focus down with Arrow Down', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row><vwc-table-cell>R1</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R2</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R3</vwc-table-cell></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				const rows = element.querySelectorAll('vwc-table-row');
				const row1Cell = rows[1].querySelector('vwc-table-cell') as HTMLElement;
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				Object.defineProperty(element, 'scrollHeight', {
					value: 200,
					configurable: true,
				});
				Object.defineProperty(element, 'clientHeight', {
					value: 100,
					configurable: true,
				});
				Object.defineProperty(element, 'scrollTop', {
					get: () => 0,
					set: () => {
						/* stub */
					},
					configurable: true,
				});
				const scrollIntoViewMock = vi.fn();
				row1Cell.scrollIntoView = scrollIntoViewMock;
				rows[0].querySelector('vwc-table-cell')?.focus();
				pressKey('ArrowDown');
				expect(document.activeElement).toBe(row1Cell);
				expect(scrollIntoViewMock).toHaveBeenCalledWith({
					block: 'center',
					inline: 'center',
				});
			});

			it('scrolls the newly focused cell into view when you move focus up with Arrow Up', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row><vwc-table-cell>R1</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R2</vwc-table-cell></vwc-table-row>
						<vwc-table-row><vwc-table-cell>R3</vwc-table-cell></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				const rows = element.querySelectorAll('vwc-table-row');
				const row0Cell = rows[0].querySelector('vwc-table-cell') as HTMLElement;
				const row1Cell = rows[1].querySelector('vwc-table-cell') as HTMLElement;
				row1Cell.focus();
				Object.defineProperty(element, 'scrollHeight', {
					value: 200,
					configurable: true,
				});
				Object.defineProperty(element, 'clientHeight', {
					value: 100,
					configurable: true,
				});
				Object.defineProperty(element, 'scrollTop', {
					get: () => 50,
					set: () => {
						/* stub for test */
					},
					configurable: true,
				});
				const scrollIntoViewMock = vi.fn();
				row0Cell.scrollIntoView = scrollIntoViewMock;
				pressKey('ArrowUp');
				expect(document.activeElement).toBe(row0Cell);
				expect(scrollIntoViewMock).toHaveBeenCalledWith({
					block: 'center',
					inline: 'center',
				});
			});
		});

		describe('edge cases', () => {
			it('does not crash when the table is empty and you focus it', () => {
				element.innerHTML = '';
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				expect(() => element.focus()).not.toThrow();
			});

			it('does not crash when the focused row has no cells', async () => {
				element.innerHTML = `
					<vwc-table-body>
						<vwc-table-row></vwc-table-row>
					</vwc-table-body>
				`;
				await elementUpdated(element);
				element.focusRowIndex = 0;
				element.focusColumnIndex = 0;
				expect(() => element.focus()).not.toThrow();
			});
		});

		describe('coordinating focus with cells', () => {
			it('ignores cell-focused when the target cell is not in this table', () => {
				element.focusRowIndex = 1;
				element.focusColumnIndex = 1;
				const outsideCell = document.createElement('vwc-table-cell');
				document.body.append(outsideCell);
				element.dispatchEvent(
					new CustomEvent('cell-focused', {
						bubbles: true,
						detail: outsideCell,
					})
				);
				expect(element.focusRowIndex).toBe(1);
				expect(element.focusColumnIndex).toBe(1);
				outsideCell.remove();
			});

			it('updates focus row and column when a cell in the table fires cell-focused', () => {
				const secondRowSecondCell = element.querySelectorAll(
					'vwc-table-cell'
				)[3] as HTMLElement;
				secondRowSecondCell.dispatchEvent(
					new CustomEvent('cell-focused', {
						bubbles: true,
						detail: secondRowSecondCell,
					})
				);
				expect(element.focusRowIndex).toBe(2);
				expect(element.focusColumnIndex).toBe(1);
			});
		});
	});
});
