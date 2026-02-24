import {
	eventFocus,
	eventFocusOut,
	eventKeyDown,
	keyArrowDown,
	keyArrowLeft,
	keyArrowRight,
	keyArrowUp,
	keyEnd,
	keyHome,
	keyPageDown,
	keyPageUp,
} from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/** Native elements that consume arrow keys  */
const ARROW_KEY_INTERACTIVE = 'input, textarea, select, [contenteditable]';

/**
 * @public
 * @component table
 * @slot - Default slot.
 */
export class Table extends VividElement {
	focusRowIndex = 0;
	focusColumnIndex = 0;

	private getTagFor(componentName: string): string {
		const firstHyphen = this.tagName.indexOf('-');
		if (firstHyphen === -1) {
			return componentName;
		}
		const prefix = this.tagName.slice(0, firstHyphen).toLowerCase();
		return `${prefix}-${componentName}`;
	}

	private get cellTagNames(): string {
		return [
			this.getTagFor('table-cell'),
			this.getTagFor('table-header-cell'),
		].join(', ');
	}

	private get rowElements(): HTMLElement[] {
		const tableTag = this.getTagFor('table');
		return Array.from(
			this.querySelectorAll<HTMLElement>(this.getTagFor('table-row'))
		).filter((row) => row.closest(tableTag) === this);
	}

	private getCellsInRow(row: HTMLElement): HTMLElement[] {
		return Array.from(
			row.querySelectorAll<HTMLElement>(this.cellTagNames)
		).filter((cell) => cell.closest(this.getTagFor('table-row')) === row);
	}

	override connectedCallback(): void {
		super.connectedCallback();

		this.addEventListener(eventFocus, this.handleFocus as EventListener);
		this.addEventListener(eventFocusOut, this.handleFocusOut as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeyDown as EventListener);
		this.addEventListener(
			'cell-focused',
			this.handleCellFocus as EventListener
		);

		this.#setTabIndex();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.removeEventListener(eventFocus, this.handleFocus as EventListener);
		this.removeEventListener(
			eventFocusOut,
			this.handleFocusOut as EventListener
		);
		this.removeEventListener(eventKeyDown, this.handleKeyDown as EventListener);
		this.removeEventListener(
			'cell-focused',
			this.handleCellFocus as EventListener
		);
	}

	#setTabIndex(): void {
		this.setAttribute(
			'tabindex',
			this.contains(document.activeElement) ? '-1' : '0'
		);
	}

	private handleCellFocus(e: Event): void {
		const cell = (e.target ?? (e as CustomEvent).detail) as HTMLElement;
		if (!cell || !this.contains(cell)) return;

		const rowTag = this.getTagFor('table-row');
		const focusRow = cell.closest(rowTag) as HTMLElement | null;
		if (!focusRow) return;

		const rows = this.rowElements;
		const rowIndex = rows.indexOf(focusRow);
		if (rowIndex < 0) return;

		const cells = this.getCellsInRow(focusRow);
		const columnIndex = cells.indexOf(cell);
		if (columnIndex < 0) return;

		this.focusRowIndex = rowIndex;
		this.focusColumnIndex = columnIndex;
		this.setAttribute('tabindex', '-1');
	}

	private handleFocus = (): void => {
		this.focusOnCell(this.focusRowIndex, this.focusColumnIndex, true);
	};

	private handleFocusOut = (e: FocusEvent): void => {
		if (
			e.relatedTarget === null ||
			!this.contains(e.relatedTarget as Element)
		) {
			this.#setTabIndex();
		}
	};

	private handleKeyDown = (e: KeyboardEvent): void => {
		if (e.defaultPrevented) return;

		const target = e.target as Element;
		if (target.closest(ARROW_KEY_INTERACTIVE)) return;

		const focusRowIndex = this.focusRowIndex;
		const focusColumnIndex = this.focusColumnIndex;
		const rows = this.rowElements;
		const maxRowIndex = rows.length - 1;

		switch (e.key) {
			case keyArrowLeft:
				e.preventDefault();
				this.focusOnCell(focusRowIndex, focusColumnIndex - 1, true);
				break;

			case keyArrowRight:
				e.preventDefault();
				this.focusOnCell(focusRowIndex, focusColumnIndex + 1, true);
				break;

			case keyArrowUp:
				e.preventDefault();
				this.focusOnCell(focusRowIndex - 1, focusColumnIndex, true);
				break;

			case keyArrowDown:
				e.preventDefault();
				this.focusOnCell(focusRowIndex + 1, focusColumnIndex, true);
				break;

			case keyPageUp:
				e.preventDefault();
				if (rows.length === 0) {
					this.focusOnCell(0, 0, false);
					break;
				}
				if (focusRowIndex === 0) {
					this.focusOnCell(0, focusColumnIndex, false);
					break;
				}
				{
					let newFocusRowIndex = focusRowIndex - 1;
					for (; newFocusRowIndex >= 0; newFocusRowIndex--) {
						const row = rows[newFocusRowIndex] as HTMLElement;
						if (row.offsetTop < this.scrollTop) {
							this.scrollTop =
								row.offsetTop + row.clientHeight - this.clientHeight;
							break;
						}
					}
					this.focusOnCell(newFocusRowIndex, focusColumnIndex, false);
				}
				break;

			case keyPageDown: {
				e.preventDefault();
				if (rows.length === 0) {
					this.focusOnCell(0, 0, false);
					break;
				}
				const currentGridBottom = this.offsetHeight + this.scrollTop;
				const lastRow = rows[maxRowIndex] as HTMLElement;
				if (
					focusRowIndex >= maxRowIndex ||
					lastRow.offsetTop + lastRow.offsetHeight <= currentGridBottom
				) {
					this.focusOnCell(maxRowIndex, focusColumnIndex, false);
					break;
				}
				{
					let newFocusRowIndex = focusRowIndex + 1;
					for (; newFocusRowIndex <= maxRowIndex; newFocusRowIndex++) {
						const row = rows[newFocusRowIndex] as HTMLElement;
						if (row.offsetTop + row.offsetHeight > currentGridBottom) {
							this.scrollTop = row.offsetTop;
							break;
						}
					}
					this.focusOnCell(newFocusRowIndex, focusColumnIndex, false);
				}
				break;
			}

			case keyHome:
				if (e.ctrlKey) {
					e.preventDefault();
					this.focusOnCell(0, 0, true);
				} else {
					e.preventDefault();
					this.focusOnCell(focusRowIndex, 0, true);
				}
				break;

			case keyEnd:
				if (rows.length === 0) break;
				if (e.ctrlKey) {
					e.preventDefault();
					const lastRowCells = this.getCellsInRow(
						rows[maxRowIndex] as HTMLElement
					);
					this.focusOnCell(maxRowIndex, lastRowCells.length - 1, true);
				} else {
					e.preventDefault();
					const focusRow = rows[focusRowIndex] as HTMLElement;
					const currentRowCells = this.getCellsInRow(focusRow);
					this.focusOnCell(focusRowIndex, currentRowCells.length - 1, true);
				}
				break;
		}
	};

	private focusOnCell(
		rowIndex: number,
		columnIndex: number,
		scrollIntoView: boolean
	): void {
		const rows = this.rowElements;
		if (rows.length === 0) return;

		const focusRowIndex = Math.max(0, Math.min(rows.length - 1, rowIndex));
		const focusRow = rows[focusRowIndex] as HTMLElement;
		const cells = this.getCellsInRow(focusRow);
		if (cells.length === 0) return;

		const focusColumnIndex = Math.max(
			0,
			Math.min(cells.length - 1, columnIndex)
		);
		const focusTarget = cells[focusColumnIndex] as HTMLElement;

		if (
			scrollIntoView &&
			this.scrollHeight !== this.clientHeight &&
			((focusRowIndex < this.focusRowIndex && this.scrollTop > 0) ||
				(focusRowIndex > this.focusRowIndex &&
					this.scrollTop < this.scrollHeight - this.clientHeight))
		) {
			focusTarget.scrollIntoView({ block: 'center', inline: 'center' });
		}

		this.focusRowIndex = focusRowIndex;
		this.focusColumnIndex = focusColumnIndex;
		focusTarget.focus();
	}
}
