import {
	eventFocusOut,
	eventKeyDown,
	keyEnd,
	keyHome,
} from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

const TABLE_CELL_SELECTOR =
	'[role="cell"], [role="columnheader"], [role="rowheader"], [data-vvd-component="table-cell"], [data-vvd-component="table-header-cell"]';

const ARROW_KEY_INTERACTIVE =
	'input, textarea, select, [contenteditable], [role="textbox"], [role="combobox"], [role="listbox"], [role="menu"], [role="slider"], [role="spinbutton"]';

/**
 * @public
 * @component table-row
 * @slot - Default slot.
 */
export class TableRow extends HostSemantics(VividElement) {
	focusColumnIndex = 0;

	override connectedCallback(): void {
		super.connectedCallback();

		this.addEventListener(
			'cell-focused',
			this.handleCellFocus as EventListener
		);
		this.addEventListener(eventFocusOut, this.handleFocusOut as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeyDown as EventListener);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.removeEventListener(
			'cell-focused',
			this.handleCellFocus as EventListener
		);
		this.removeEventListener(
			eventFocusOut,
			this.handleFocusOut as EventListener
		);
		this.removeEventListener(eventKeyDown, this.handleKeyDown as EventListener);
	}

	private get cellElements(): HTMLElement[] {
		return Array.from(
			this.querySelectorAll<HTMLElement>(TABLE_CELL_SELECTOR)
		).filter(
			(cell) => cell.closest('[data-vvd-component="table-row"]') === this
		);
	}

	private handleCellFocus = (e: Event): void => {
		const cells = this.cellElements;
		const target = e.target as Element;
		const cell = target.matches(TABLE_CELL_SELECTOR)
			? (target as HTMLElement)
			: (target.closest(TABLE_CELL_SELECTOR) as HTMLElement | null);
		if (cell) {
			const index = cells.indexOf(cell);
			if (index >= 0) {
				this.focusColumnIndex = index;
			}
		}
		this.$emit('row-focused', this);
	};

	private handleFocusOut = (): void => {
		if (this.contains(document.activeElement)) return;
		this.focusColumnIndex = 0;
	};

	private handleKeyDown = (e: KeyboardEvent): void => {
		if (e.defaultPrevented) return;

		const target = e.target as Element;
		if (target.closest(ARROW_KEY_INTERACTIVE)) return;

		const cells = this.cellElements;
		if (cells.length === 0) return;

		switch (e.key) {
			case keyArrowLeft:
				e.preventDefault();
				cells[Math.max(0, this.focusColumnIndex - 1)]?.focus();
				break;

			case keyArrowRight:
				e.preventDefault();
				cells[Math.min(cells.length - 1, this.focusColumnIndex + 1)]?.focus();
				break;

			case keyHome:
				if (!e.ctrlKey) {
					e.preventDefault();
					cells[0]?.focus();
				}
				break;

			case keyEnd:
				if (!e.ctrlKey) {
					e.preventDefault();
					cells[cells.length - 1]?.focus();
				}
				break;
		}
	};
}
