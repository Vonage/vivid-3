import {
	attr,
	observable,
	type RepeatBehavior,
	RepeatDirective,
	type ViewTemplate,
} from '@microsoft/fast-element';
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
import { DataGridRowTypes } from './data-grid.options';
import type { ColumnDefinition } from './data-grid';

/**
 * @public
 * @component data-grid-row
 * @slot - Default slot.
 * @event {CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>} cell-click - Event that fires when a cell is clicked
 * @event {CustomEvent<HTMLElement>} row-focused - Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row
 */
export class DataGridRow extends VividElement {
	/**
	 * String that gets applied to the the css gridTemplateColumns attribute for the row
	 *x
	 * @public
	 * @remarks
	 * HTML Attribute: grid-template-columns
	 */
	@attr({ attribute: 'grid-template-columns' })
	// @ts-expect-error Type is incorrectly non-optional
	gridTemplateColumns: string;
	/**
	 * @internal
	 */
	gridTemplateColumnsChanged(): void {
		if (this.$fastController.isConnected) {
			this.updateRowStyle();
		}
	}

	/**
	 * The type of row
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: row-type
	 */
	@attr({ attribute: 'row-type' })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	rowType: DataGridRowTypes = DataGridRowTypes.default;
	/**
	 * @internal
	 */
	rowTypeChanged(): void {
		if (this.$fastController.isConnected) {
			this.updateItemTemplate();
		}
	}

	/**
	 * The base data for this row
	 *
	 * @public
	 */
	@observable
	rowData: object | null = null;

	/**
	 * The column definitions of the row
	 *
	 * @public
	 */
	@observable
	columnDefinitions: ColumnDefinition[] | null = null;

	/**
	 * The template used to render cells in generated rows.
	 *
	 * @public
	 */
	@observable
	cellItemTemplate?: ViewTemplate;
	/**
	 * @internal
	 */
	cellItemTemplateChanged(): void {
		this.updateItemTemplate();
	}

	/**
	 * The template used to render header cells in generated rows.
	 *
	 * @public
	 */
	@observable
	headerCellItemTemplate?: ViewTemplate;
	/**
	 * @internal
	 */
	headerCellItemTemplateChanged(): void {
		this.updateItemTemplate();
	}

	/**
	 * The index of the row in the parent grid.
	 * This is typically set programmatically by the parent grid.
	 *
	 * @public
	 */
	@observable
	rowIndex!: number;

	/**
	 * The cell item template currently in use.
	 *
	 * @internal
	 */
	@observable
	activeCellItemTemplate?: ViewTemplate;

	/**
	 * The default cell item template.  Set by the component templates.
	 *
	 * @internal
	 */
	@observable
	defaultCellItemTemplate?: ViewTemplate;

	/**
	 * The default header cell item template.  Set by the component templates.
	 *
	 * @internal
	 */
	@observable
	defaultHeaderCellItemTemplate?: ViewTemplate;

	/**
	 * Children that are cells
	 *
	 * @internal
	 */
	@observable
	cellElements!: HTMLElement[];

	private cellsRepeatBehavior: RepeatBehavior | null = null;
	private cellsPlaceholder: Node | null = null;

	/**
	 * @internal
	 */
	slottedCellElements!: HTMLElement[];

	/**
	 * @internal
	 */
	focusColumnIndex = 0;

	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();

		// note that row elements can be reused with a different data object
		// as the parent grid's repeat behavior reacts to changes in the data set.
		if (this.cellsRepeatBehavior === null) {
			this.cellsPlaceholder = document.createComment('');
			this.appendChild(this.cellsPlaceholder);

			this.updateItemTemplate();

			this.cellsRepeatBehavior = new RepeatDirective(
				(x) => x.columnDefinitions,
				(x) => x.activeCellItemTemplate,
				{ positioning: true }
			).createBehavior(this.cellsPlaceholder);
			/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
			this.$fastController.addBehaviors([this.cellsRepeatBehavior!]);
		}

		this.addEventListener('cell-focused', this.handleCellFocus);
		this.addEventListener(eventFocusOut, this.handleFocusout as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeydown as EventListener);

		this.updateRowStyle();
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.removeEventListener('cell-focused', this.handleCellFocus);
		this.removeEventListener(
			eventFocusOut,
			this.handleFocusout as EventListener
		);
		this.removeEventListener(eventKeyDown, this.handleKeydown as EventListener);
	}

	handleFocusout(_: FocusEvent): void {
		if (!this.contains(document.activeElement)) {
			this.focusColumnIndex = 0;
		}
	}

	handleCellFocus(e: Event): void {
		this.focusColumnIndex = this.cellElements.indexOf(e.target as HTMLElement);
		this.$emit('row-focused', this);
	}

	handleKeydown(e: KeyboardEvent): void {
		if (e.defaultPrevented) {
			return;
		}
		let newFocusColumnIndex = 0;
		switch (e.key) {
			case keyArrowLeft:
				// focus left one cell
				newFocusColumnIndex = Math.max(0, this.focusColumnIndex - 1);
				(this.cellElements[newFocusColumnIndex] as HTMLElement).focus();
				e.preventDefault();
				break;

			case keyArrowRight:
				// focus right one cell
				newFocusColumnIndex = Math.min(
					this.cellElements.length - 1,
					this.focusColumnIndex + 1
				);
				(this.cellElements[newFocusColumnIndex] as HTMLElement).focus();
				e.preventDefault();
				break;

			case keyHome:
				if (!e.ctrlKey) {
					(this.cellElements[0] as HTMLElement).focus();
					e.preventDefault();
				}
				break;
			case keyEnd:
				if (!e.ctrlKey) {
					// focus last cell of the row
					(
						this.cellElements[this.cellElements.length - 1] as HTMLElement
					).focus();
					e.preventDefault();
				}
				break;
		}
	}

	private updateItemTemplate(): void {
		this.activeCellItemTemplate =
			this.rowType === DataGridRowTypes.default &&
			this.cellItemTemplate !== undefined
				? this.cellItemTemplate
				: this.rowType === DataGridRowTypes.default &&
				  this.cellItemTemplate === undefined
				? this.defaultCellItemTemplate
				: this.headerCellItemTemplate !== undefined
				? this.headerCellItemTemplate
				: this.defaultHeaderCellItemTemplate;
	}

	private updateRowStyle = (): void => {
		this.style.gridTemplateColumns = this.gridTemplateColumns;
	};

	/**
	 * Indicates the selected status.
	 *
	 * @deprecated
	 * @public
	 * HTML Attribute: aria-selected
	 */
	@attr({ attribute: 'aria-selected' })
	override ariaSelected: string | null = null;

	/**
	 * @internal
	 */
	ariaSelectedChanged(_oldValue: string | null, newValue: string | null) {
		this._selectable = newValue !== null;
		this.selected = newValue === 'true';
	}

	/**
	 * @internal
	 */
	private _calculateAriaSelectedValue() {
		if (this._selectable && this.selected) return 'true';

		if (this._selectable && !this.selected) return 'false';

		return null;
	}

	/**
	 * @internal
	 */
	@observable
	_selectable = false;

	/**
	 * @internal
	 */
	_selectableChanged() {
		this.ariaSelected = this._calculateAriaSelectedValue();
	}

	/**
	 * Reflects selected state of the row
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' })
	selected?: boolean = false;

	selectedChanged() {
		this.ariaSelected = this._calculateAriaSelectedValue();
	}
}
