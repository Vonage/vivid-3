import {
	eventFocus,
	eventFocusOut,
	eventKeyDown,
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
	keyPageDown,
	keyPageUp,
} from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

const TABLE_CELL_SELECTOR =
	'[role="cell"], [role="columnheader"], [role="rowheader"], [data-vvd-component="table-cell"], [data-vvd-component="table-header-cell"]';

/**
 * @public
 * @component table
 * @slot - Default slot.
 */
export class Table extends VividElement {
	focusRowIndex = 0;
	focusColumnIndex = 0;

	private get rowElements(): HTMLElement[] {
		return Array.from(
			this.querySelectorAll<HTMLElement>('[data-vvd-component="table-row"]')
		).filter((row) => row.closest('[data-vvd-component="table"]') === this);
	}

	override connectedCallback(): void {
		super.connectedCallback();

		this.addEventListener(eventFocus, this.handleFocus as EventListener);
		this.addEventListener(eventFocusOut, this.handleFocusOut as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeyDown as EventListener);
		this.addEventListener('row-focused', this.handleRowFocus as EventListener);

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
			'row-focused',
			this.handleRowFocus as EventListener
		);
	}

	#setTabIndex(): void {
		this.setAttribute(
			'tabindex',
			this.contains(document.activeElement) ? '-1' : '0'
		);
	}

	private handleRowFocus(e: Event): void {
		const focusRow = e.target as HTMLElement;
		const rowIndex = this.rowElements.indexOf(focusRow);
		if (rowIndex < 0) return;

		const focusColumnIndex =
			(focusRow as unknown as { focusColumnIndex: number }).focusColumnIndex ??
			0;
		this.focusRowIndex = rowIndex;
		this.focusColumnIndex = focusColumnIndex;
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

		const focusRowIndex = this.focusRowIndex;
		const focusColumnIndex = this.focusColumnIndex;
		const rows = this.rowElements;
		const maxRowIndex = rows.length - 1;

		switch (e.key) {
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
				}
				break;

			case keyEnd:
				if (e.ctrlKey && rows.length > 0) {
					e.preventDefault();
					const lastRowCells = (
						rows[maxRowIndex] as HTMLElement
					).querySelectorAll(TABLE_CELL_SELECTOR);
					this.focusOnCell(maxRowIndex, lastRowCells.length - 1, true);
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
		const cells = focusRow.querySelectorAll<HTMLElement>(TABLE_CELL_SELECTOR);
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
