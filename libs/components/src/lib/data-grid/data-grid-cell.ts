import {
	attr,
	html,
	type HTMLView,
	observable,
	type ViewTemplate,
} from '@microsoft/fast-element';
import {
	eventFocusIn,
	eventFocusOut,
	eventKeyDown,
	keyEnter,
	keyEscape,
	keyFunction2,
} from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Localized } from '../../shared/patterns';
import { HostSemantics } from '../../shared/aria/host-semantics';
import { DataGridCellSortStates, DataGridCellTypes } from './data-grid.options';
import type { ColumnDefinition } from './data-grid';

declare interface ColumnDefinitionExtended extends ColumnDefinition {
	sortDirection?: DataGridCellSortStates | null;
	sortable?: boolean | undefined;
}

const defaultCellContentsTemplate: ViewTemplate<DataGridCell> = html`
	<template>
		${(x) =>
			x.rowData === null ||
			x.columnDefinition === null ||
			x.columnDefinition.columnDataKey === null
				? null
				: (x.rowData as any)[x.columnDefinition.columnDataKey]}
	</template>
`;

const defaultHeaderCellContentsTemplate: ViewTemplate<DataGridCell> = html`
	<template>
		${(x) =>
			x.columnDefinition!.title === undefined
				? x.columnDefinition!.columnDataKey
				: x.columnDefinition!.title}
	</template>
`;

/**
 * @public
 * @component data-grid-cell
 * @slot - Default slot.
 * @event {CustomEvent<{columnDataKey: string, ariaSort: string | null, sortDirection: string | null}>} sort - Event that fires when a sortable column header is clicked
 * @event {CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>} cell-click - Event that fires when a cell is clicked
 * @event {CustomEvent<HTMLElement>} cell-focused - Fires a custom 'cell-focused' event when focus is on the cell or its contents
 */
export class DataGridCell extends Localized(HostSemantics(VividElement)) {
	/**
	 * The type of cell
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: cell-type
	 */
	@attr({ attribute: 'cell-type' })
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	cellType: DataGridCellTypes = DataGridCellTypes.default;
	/**
	 * @internal
	 */
	cellTypeChanged(): void {
		if (this.$fastController.isConnected) {
			this.updateCellView();
		}
	}

	/**
	 * The column index of the cell.
	 * This will be applied to the css grid-column-index value
	 * applied to the cell
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: grid-column
	 */
	@attr({ attribute: 'grid-column' })
	gridColumn!: string;
	/**
	 * @internal
	 */
	gridColumnChanged(): void {
		if (this.$fastController.isConnected) {
			this.updateCellStyle();
		}
	}

	/**
	 * The base data for the parent row
	 *
	 * @public
	 */
	@observable
	rowData: object | null = null;

	/**
	 * The base data for the column
	 *
	 * @public
	 */
	@observable
	columnDefinition: ColumnDefinitionExtended | null = null;
	/**
	 * @internal
	 */
	columnDefinitionChanged(
		_oldValue: ColumnDefinitionExtended | null,
		_newValue: ColumnDefinitionExtended | null
	): void {
		if (this.$fastController.isConnected) {
			this.updateCellView();
		}
	}

	/**
	 * Position from the left when the column is fixed
	 * @internal
	 */
	private fixedPosition?: string;

	/**
	 * Updates the fixed column style
	 * @internal
	 */
	private updateFixedStyle(): void {
		if (this.fixedPosition !== undefined) {
			this.setAttribute('data-fixed', '');
			this.style.left = this.fixedPosition;
		} else {
			this.removeAttribute('data-fixed');
			this.style.removeProperty('left');
		}
	}

	/**
	 * Sets the fixed state and position for this cell
	 * @internal
	 */
	setFixedPosition(position: string | undefined): void {
		this.fixedPosition = position;
		this.updateFixedStyle();
	}

	private isActiveCell = false;
	private customCellView: HTMLView | null = null;

	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();

		this.addEventListener(eventFocusIn, this.handleFocusin as EventListener);
		this.addEventListener(eventFocusOut, this.handleFocusout as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeydown as EventListener);

		this.style.gridColumn = `${
			this.columnDefinition?.gridColumn === undefined
				? 0
				: this.columnDefinition.gridColumn
		}`;

		this.updateCellView();
		this.updateCellStyle();
		this.updateFixedStyle();
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.removeEventListener(eventFocusIn, this.handleFocusin as EventListener);
		this.removeEventListener(
			eventFocusOut,
			this.handleFocusout as EventListener
		);
		this.removeEventListener(eventKeyDown, this.handleKeydown as EventListener);

		this.disconnectCellView();
	}

	handleFocusin(_: FocusEvent): void {
		this.shadowRoot!.querySelector('.base')!.classList.add('active');

		if (this.isActiveCell) {
			return;
		}

		this.isActiveCell = true;

		switch (this.cellType) {
			case DataGridCellTypes.columnHeader:
				if (
					this.columnDefinition !== null &&
					this.columnDefinition.headerCellInternalFocusQueue !== true &&
					typeof this.columnDefinition.headerCellFocusTargetCallback ===
						'function'
				) {
					// move focus to the focus target
					const focusTarget: HTMLElement =
						this.columnDefinition.headerCellFocusTargetCallback(this);
					/* v8 ignore else -- @preserve */
					if (focusTarget !== null) {
						focusTarget.focus();
					}
				}
				break;

			default:
				if (
					this.columnDefinition !== null &&
					this.columnDefinition.cellInternalFocusQueue !== true &&
					typeof this.columnDefinition.cellFocusTargetCallback === 'function'
				) {
					// move focus to the focus target
					const focusTarget: HTMLElement =
						this.columnDefinition.cellFocusTargetCallback(this);
					/* v8 ignore else -- @preserve */
					if (focusTarget !== null) {
						focusTarget.focus();
					}
				}
				break;
		}

		this.$emit('cell-focused', this);
	}

	handleFocusout(_: FocusEvent): void {
		this.shadowRoot!.querySelector('.base')!.classList.remove('active');

		/* v8 ignore else -- @preserve */
		if (
			this !== document.activeElement &&
			!this.contains(document.activeElement)
		) {
			this.isActiveCell = false;
		}
	}

	handleKeydown(e: KeyboardEvent): void {
		if (
			e.defaultPrevented ||
			this.columnDefinition === null ||
			(this.cellType === DataGridCellTypes.default &&
				this.columnDefinition.cellInternalFocusQueue !== true) ||
			(this.cellType === DataGridCellTypes.columnHeader &&
				this.columnDefinition.headerCellInternalFocusQueue !== true)
		) {
			return;
		}

		switch (e.key) {
			case keyEnter:
			case keyFunction2:
				if (
					this.contains(document.activeElement) &&
					document.activeElement !== this
				) {
					return;
				}

				switch (this.cellType) {
					case DataGridCellTypes.columnHeader: {
						if (
							this.columnDefinition.headerCellFocusTargetCallback !== undefined
						) {
							const focusTarget: HTMLElement =
								this.columnDefinition.headerCellFocusTargetCallback(this);
							/* v8 ignore else -- @preserve */
							if (focusTarget !== null) {
								focusTarget.focus();
							}
							e.preventDefault();
						}
						break;
					}

					default: {
						if (this.columnDefinition.cellFocusTargetCallback !== undefined) {
							const focusTarget: HTMLElement =
								this.columnDefinition.cellFocusTargetCallback(this);
							/* v8 ignore else -- @preserve */
							if (focusTarget !== null) {
								focusTarget.focus();
							}
							e.preventDefault();
						}
						break;
					}
				}
				break;

			case keyEscape: {
				/* v8 ignore else -- @preserve */
				if (
					this.contains(document.activeElement) &&
					document.activeElement !== this
				) {
					this.focus();
					e.preventDefault();
				}
				break;
			}
		}
	}

	private updateCellView(): void {
		this.disconnectCellView();

		if (this.columnDefinition === null) {
			return;
		}

		switch (this.cellType) {
			case DataGridCellTypes.columnHeader:
				if (this.columnDefinition.headerCellTemplate !== undefined) {
					this.customCellView = this.columnDefinition.headerCellTemplate.render(
						this,
						this
					);
				} else {
					this.customCellView = defaultHeaderCellContentsTemplate.render(
						this,
						this
					);
				}
				break;

			case DataGridCellTypes.rowHeader:
			case DataGridCellTypes.default:
				if (this.columnDefinition.cellTemplate !== undefined) {
					this.customCellView = this.columnDefinition.cellTemplate.render(
						this,
						this
					);
				} else {
					this.customCellView = defaultCellContentsTemplate.render(this, this);
				}
				break;
		}

		if (!this.columnDefinition?.sortable) {
			this.sortDirection = undefined;
		} else if (this.columnDefinition.sortDirection) {
			this.sortDirection = this.columnDefinition.sortDirection;
		} else {
			this.sortDirection = DataGridCellSortStates.none;
		}
	}

	private disconnectCellView(): void {
		if (this.customCellView !== null) {
			this.customCellView.dispose();
			this.customCellView = null;
		}
	}

	private updateCellStyle = (): void => {
		if (this.gridColumn && !this.gridColumn.includes('undefined')) {
			this.style.gridColumn = this.gridColumn;
		} else {
			this.style.removeProperty('grid-column');
		}
	};

	/**
	 * @internal
	 */
	@observable
	_selectable = false;

	/**
	 * Reflects selected state of the row
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' })
	selected = false;

	/**
	 * Indicates the selected status.
	 *
	 * @deprecated For setting selected state, please use `selected` property instead.
	 * @public
	 * HTML Attribute: aria-selected
	 */
	override ariaSelected: string | null = null;

	/**
	 * @internal
	 */
	override ariaSelectedChanged(
		prevValue: string | null,
		newValue: string | null
	) {
		super.ariaSelectedChanged(prevValue, newValue);

		this._selectable = newValue !== null;
		this.selected = newValue === 'true';
	}

	/**
	 * Indicates the sort status.
	 *
	 * @deprecated To set the sorting visual style please use `sortDirection` property.
	 * @public
	 * HTML Attribute: aria-sort
	 */
	override ariaSort: string | null = null;

	/**
	 * @internal
	 */
	override ariaSortChanged(oldValue: string | null, newValue: string | null) {
		super.ariaSortChanged(oldValue, newValue);

		if (newValue === null) {
			this.sortDirection = undefined;
			return;
		}

		this.sortDirection = newValue as DataGridCellSortStates;
	}

	/**
	 * Sets the sorting direction.
	 *
	 * @public
	 * HTML Attribute: sort-direction
	 */
	@attr({ attribute: 'sort-direction' }) sortDirection?: DataGridCellSortStates;

	#getColumnDataKey() {
		return this.columnDefinition && this.columnDefinition.columnDataKey
			? this.columnDefinition.columnDataKey
			: this.textContent!.trim();
	}

	/**
	 * @internal
	 */
	_handleInteraction(): boolean {
		const isHeaderCell = this.cellType === 'columnheader';
		const isSortable = isHeaderCell && this.sortDirection !== undefined;

		if (isSortable) {
			this.$emit('sort', {
				columnDataKey: this.#getColumnDataKey(),
				sortDirection: this.sortDirection,
			});
		}

		const hasInternalFocusQueue = isHeaderCell
			? this.columnDefinition?.headerCellInternalFocusQueue
			: this.columnDefinition?.cellInternalFocusQueue;
		if (!hasInternalFocusQueue) {
			this.$emit('cell-click', {
				cell: this,
				row: this.parentElement,
				isHeaderCell: isHeaderCell,
				columnDataKey: this.#getColumnDataKey(),
			});
		}
		return true;
	}
}
