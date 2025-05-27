import {
	attr,
	DOM,
	observable,
	Observable,
	RepeatBehavior,
	RepeatDirective,
	type ViewTemplate,
} from '@microsoft/fast-element';
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
import { DataGridCell } from './data-grid-cell';
import { DataGridRow } from './data-grid-row';
import { DataGridRowTypes, GenerateHeaderOptions } from './data-grid.options';

interface SelectionMetaData {
	target: EventTarget | null;
	ctrlKey: boolean;
	shiftKey: boolean;
	metaKey: boolean;
}

export const DataGridSelectionMode = {
	none: 'none',
	singleRow: 'single-row',
	multiRow: 'multi-row',
	singleCell: 'single-cell',
	multiCell: 'multi-cell',
} as const;

export type ValueOf<T> = T[keyof T];

export type DataGridSelectionMode = ValueOf<typeof DataGridSelectionMode>;

/**
 * Defines a column in the grid
 *
 * @public
 */
export interface ColumnDefinition {
	/**
	 * Identifies the data item to be displayed in this column
	 * (i.e. how the data item is labelled in each row)
	 */
	columnDataKey: string;

	/**
	 * Sets the css grid-column property on the cell which controls its placement in
	 * the parent row. If left unset the cells will set this value to match the index
	 * of their column in the parent collection of ColumnDefinitions.
	 */
	gridColumn?: string;

	/**
	 *  Column title, if not provided columnDataKey is used as title
	 */
	title?: string;

	/**
	 *  Header cell template
	 */
	headerCellTemplate?: ViewTemplate;

	/**
	 * Whether the header cell has an internal focus queue
	 */
	headerCellInternalFocusQueue?: boolean;

	/**
	 * Callback function that returns the element to focus in a custom cell.
	 * When headerCellInternalFocusQueue is false this function is called when the cell is first focused
	 * to immediately move focus to a cell element, for example a cell that is a checkbox could move
	 * focus directly to the checkbox.
	 * When headerCellInternalFocusQueue is true this function is called when the user hits Enter or F2
	 */
	headerCellFocusTargetCallback?: (cell: DataGridCell) => HTMLElement;

	/**
	 * cell template
	 */
	cellTemplate?: ViewTemplate;

	/**
	 * Whether the cell has an internal focus queue
	 */
	cellInternalFocusQueue?: boolean;

	/**
	 * Callback function that returns the element to focus in a custom cell.
	 * When cellInternalFocusQueue is false this function is called when the cell is first focused
	 * to immediately move focus to a cell element, for example a cell that is a checkbox could move
	 * focus directly to the checkbox.
	 * When cellInternalFocusQueue is true this function is called when the user hits Enter or F2
	 */

	cellFocusTargetCallback?: (cell: DataGridCell) => HTMLElement;

	/**
	 * Whether this column is the row header
	 */
	isRowHeader?: boolean;
}

/**
 * @public
 * @component data-grid
 * @slot - Default slot.
 * @event {CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>} cell-click - Event that fires when a cell is clicked
 */
export class DataGrid extends VividElement {
	/**
	 *  generates a gridTemplateColumns based on columndata array
	 */
	private static generateTemplateColumns(
		columnDefinitions: ColumnDefinition[]
	): string {
		let templateColumns = '';
		columnDefinitions.forEach((_: ColumnDefinition) => {
			templateColumns = `${templateColumns}${
				templateColumns === '' ? '' : ' '
			}${'1fr'}`;
		});
		return templateColumns;
	}

	/**
	 * When true the component will not add itself to the tab queue.
	 * Default is false.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-tabbing
	 */
	@attr({ attribute: 'no-tabbing', mode: 'boolean' })
	noTabbing = false;
	/**
	 * @internal
	 */
	noTabbingChanged(): void {
		if (this.$fastController.isConnected) {
			this.#setTabIndex();
		}
	}

	#setTabIndex() {
		this.setAttribute(
			'tabIndex',
			this.noTabbing || this.contains(document.activeElement) ? '-1' : '0'
		);
	}

	/**
	 *  Whether the grid should automatically generate a header row and its type
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: generate-header
	 */
	@attr({ attribute: 'generate-header' })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	generateHeader: GenerateHeaderOptions = GenerateHeaderOptions.default;
	/**
	 * @internal
	 */
	generateHeaderChanged(): void {
		if (this.$fastController.isConnected) {
			this.toggleGeneratedHeader();
		}
	}

	/**
	 * String that gets applied to the css gridTemplateColumns attribute of child rows
	 *
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
			this.updateRowIndexes();
		}
	}

	/**
	 * The data being displayed in the grid
	 *
	 * @public
	 */
	@observable
	rowsData: object[] = [];
	/**
	 * @internal
	 */
	rowsDataChanged() {
		if (this.columnDefinitions === null && this.rowsData.length > 0) {
			this.columnDefinitions = DataGrid.generateColumns(this.rowsData[0]);
		}
		if (this.$fastController.isConnected) {
			this.toggleGeneratedHeader();
		}
	}

	/**
	 * The column definitions of the grid
	 *
	 * @public
	 */
	@observable
	columnDefinitions: ColumnDefinition[] | null = null;
	/**
	 * @internal
	 */
	columnDefinitionsChanged(): void {
		if (this.columnDefinitions === null) {
			this.generatedGridTemplateColumns = '';
			return;
		}
		this.generatedGridTemplateColumns = DataGrid.generateTemplateColumns(
			this.columnDefinitions
		);
		if (this.$fastController.isConnected) {
			this.columnDefinitionsStale = true;
			this.queueRowIndexUpdate();
		}
	}

	/**
	 * The template to use for the programmatic generation of rows
	 *
	 * @public
	 */
	@observable
	rowItemTemplate!: ViewTemplate;

	/**
	 * The template used to render cells in generated rows.
	 *
	 * @public
	 */
	@observable
	cellItemTemplate?: ViewTemplate;

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
	headerCellItemTemplateChanged() {
		if (this.$fastController.isConnected) {
			if (this.generatedHeader !== null) {
				this.generatedHeader.headerCellItemTemplate =
					this.headerCellItemTemplate;
			}
		}
	}

	/**
	 * The index of the row that will receive focus the next time the
	 * grid is focused. This value changes as focus moves to different
	 * rows within the grid.  Changing this value when focus is already
	 * within the grid moves focus to the specified row.
	 *
	 * @public
	 */
	@observable
	focusRowIndex = 0;
	/**
	 * @internal
	 */
	focusRowIndexChanged() {
		if (this.$fastController.isConnected) {
			this.queueFocusUpdate();
		}
	}

	/**
	 * The index of the column that will receive focus the next time the
	 * grid is focused. This value changes as focus moves to different rows
	 * within the grid.  Changing this value when focus is already within
	 * the grid moves focus to the specified column.
	 *
	 * @public
	 */
	@observable
	focusColumnIndex = 0;
	/**
	 * @internal
	 */
	focusColumnIndexChanged() {
		if (this.$fastController.isConnected) {
			this.queueFocusUpdate();
		}
	}

	/**
	 * The default row item template.  Set by the component templates.
	 *
	 * @internal
	 */
	@observable
	defaultRowItemTemplate!: ViewTemplate;

	/**
	 * Set by the component templates.
	 *
	 */
	@observable
	rowElementTag!: string;

	/**
	 * Children that are rows
	 *
	 * @internal
	 */
	@observable
	rowElements!: DataGridRow[];

	private rowsRepeatBehavior: RepeatBehavior | null = null;
	private rowsPlaceholder: Node | null = null;

	private generatedHeader: DataGridRow | null = null;

	private isUpdatingFocus = false;
	private pendingFocusUpdate = false;

	private observer!: MutationObserver;

	private rowindexUpdateQueued = false;
	private columnDefinitionsStale = true;

	private generatedGridTemplateColumns = '';

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();

		if (this.rowItemTemplate === undefined) {
			this.rowItemTemplate = this.defaultRowItemTemplate;
		}

		this.rowsPlaceholder = document.createComment('');
		this.appendChild(this.rowsPlaceholder);

		this.toggleGeneratedHeader();

		this.rowsRepeatBehavior = new RepeatDirective(
			(x) => x.rowsData,
			(x) => x.rowItemTemplate,
			{ positioning: true }
		).createBehavior(this.rowsPlaceholder);

		/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
		this.$fastController.addBehaviors([this.rowsRepeatBehavior!]);

		this.addEventListener('row-focused', this.handleRowFocus);
		this.addEventListener(eventFocus, this.handleFocus as EventListener);
		this.addEventListener(eventKeyDown, this.handleKeydown as EventListener);
		this.addEventListener(eventFocusOut, this.handleFocusOut as EventListener);

		this.observer = new MutationObserver(this.onChildListChange);
		// only observe if nodes are added or removed
		this.observer.observe(this, { childList: true });

		DOM.queueUpdate(this.queueRowIndexUpdate);

		this.#setTabIndex();

		Observable.getNotifier(this).subscribe(
			this.#changeHandler,
			'columnDefinitions'
		);
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.removeEventListener('row-focused', this.handleRowFocus);
		this.removeEventListener(eventFocus, this.handleFocus as EventListener);
		this.removeEventListener(eventKeyDown, this.handleKeydown as EventListener);
		this.removeEventListener(
			eventFocusOut,
			this.handleFocusOut as EventListener
		);

		// disconnect observer
		this.observer.disconnect();

		this.rowsPlaceholder = null;
		this.generatedHeader = null;

		Observable.getNotifier(this).unsubscribe(
			this.#changeHandler,
			'columnDefinitions'
		);
	}

	/**
	 * @internal
	 */
	handleRowFocus(e: Event): void {
		this.isUpdatingFocus = true;
		const focusRow: DataGridRow = e.target as DataGridRow;
		this.focusRowIndex = this.rowElements.indexOf(focusRow);
		this.focusColumnIndex = focusRow.focusColumnIndex;
		this.setAttribute('tabIndex', '-1');
		this.isUpdatingFocus = false;
	}

	/**
	 * @internal
	 */
	handleFocus(_: FocusEvent): void {
		this.focusOnCell(this.focusRowIndex, this.focusColumnIndex, true);
	}

	/**
	 * @internal
	 */
	handleFocusOut(e: FocusEvent): void {
		if (
			e.relatedTarget === null ||
			!this.contains(e.relatedTarget as Element)
		) {
			this.setAttribute('tabIndex', this.noTabbing ? '-1' : '0');
		}
	}

	/**
	 * @internal
	 */
	handleKeydown(e: KeyboardEvent): void {
		if (e.defaultPrevented) {
			return;
		}

		let newFocusRowIndex: number;
		const maxIndex = this.rowElements.length - 1;
		const currentGridBottom: number = this.offsetHeight + this.scrollTop;
		const lastRow: HTMLElement = this.rowElements[maxIndex] as HTMLElement;

		switch (e.key) {
			case keyArrowUp:
				e.preventDefault();
				// focus up one row
				this.focusOnCell(this.focusRowIndex - 1, this.focusColumnIndex, true);
				break;

			case keyArrowDown:
				e.preventDefault();
				// focus down one row
				this.focusOnCell(this.focusRowIndex + 1, this.focusColumnIndex, true);
				break;

			case keyPageUp:
				e.preventDefault();
				if (this.rowElements.length === 0) {
					this.focusOnCell(0, 0, false);
					break;
				}
				if (this.focusRowIndex === 0) {
					this.focusOnCell(0, this.focusColumnIndex, false);
					return;
				}

				newFocusRowIndex = this.focusRowIndex - 1;

				for (newFocusRowIndex; newFocusRowIndex >= 0; newFocusRowIndex--) {
					const thisRow: HTMLElement = this.rowElements[newFocusRowIndex];
					if (thisRow.offsetTop < this.scrollTop) {
						this.scrollTop =
							thisRow.offsetTop + thisRow.clientHeight - this.clientHeight;
						break;
					}
				}

				this.focusOnCell(newFocusRowIndex, this.focusColumnIndex, false);
				break;

			case keyPageDown:
				e.preventDefault();
				if (this.rowElements.length === 0) {
					this.focusOnCell(0, 0, false);
					break;
				}

				// focus down one "page"
				if (
					this.focusRowIndex >= maxIndex ||
					lastRow.offsetTop + lastRow.offsetHeight <= currentGridBottom
				) {
					this.focusOnCell(maxIndex, this.focusColumnIndex, false);
					return;
				}

				newFocusRowIndex = this.focusRowIndex + 1;

				for (
					newFocusRowIndex;
					newFocusRowIndex <= maxIndex;
					newFocusRowIndex++
				) {
					const thisRow: HTMLElement = this.rowElements[
						newFocusRowIndex
					] as HTMLElement;
					if (thisRow.offsetTop + thisRow.offsetHeight > currentGridBottom) {
						let stickyHeaderOffset = 0;
						if (
							this.generateHeader === GenerateHeaderOptions.sticky &&
							this.generatedHeader !== null
						) {
							stickyHeaderOffset = this.generatedHeader.clientHeight;
						}
						this.scrollTop = thisRow.offsetTop - stickyHeaderOffset;
						break;
					}
				}

				this.focusOnCell(newFocusRowIndex, this.focusColumnIndex, false);

				break;

			case keyHome:
				if (e.ctrlKey) {
					e.preventDefault();
					// focus first cell of first row
					this.focusOnCell(0, 0, true);
				}
				break;

			case keyEnd:
				if (e.ctrlKey && this.columnDefinitions !== null) {
					e.preventDefault();
					// focus last cell of last row
					this.focusOnCell(
						this.rowElements.length - 1,
						this.columnDefinitions.length - 1,
						true
					);
				}
				break;
		}
	}

	private focusOnCell = (
		rowIndex: number,
		columnIndex: number,
		scrollIntoView: boolean
	): void => {
		if (this.rowElements.length === 0) {
			this.focusRowIndex = 0;
			this.focusColumnIndex = 0;
			return;
		}

		const focusRowIndex = Math.max(
			0,
			Math.min(this.rowElements.length - 1, rowIndex)
		);
		const focusRow: Element = this.rowElements[focusRowIndex];

		const cells: NodeListOf<Element> = focusRow.querySelectorAll(
			'[role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"]'
		);

		const focusColumnIndex = Math.max(
			0,
			Math.min(cells.length - 1, columnIndex)
		);

		const focusTarget: HTMLElement = cells[focusColumnIndex] as HTMLElement;

		if (
			scrollIntoView &&
			this.scrollHeight !== this.clientHeight &&
			((focusRowIndex < this.focusRowIndex && this.scrollTop > 0) ||
				(focusRowIndex > this.focusRowIndex &&
					this.scrollTop < this.scrollHeight - this.clientHeight))
		) {
			focusTarget.scrollIntoView({ block: 'center', inline: 'center' });
		}

		focusTarget.focus();
	};

	private queueFocusUpdate(): void {
		if (this.isUpdatingFocus && this.contains(document.activeElement)) {
			return;
		}
		if (this.pendingFocusUpdate === false) {
			this.pendingFocusUpdate = true;
			DOM.queueUpdate(() => this.updateFocus());
		}
	}

	private updateFocus(): void {
		this.pendingFocusUpdate = false;
		this.focusOnCell(this.focusRowIndex, this.focusColumnIndex, true);
	}

	private toggleGeneratedHeader(): void {
		if (this.generatedHeader !== null) {
			this.removeChild(this.generatedHeader);
			this.generatedHeader = null;
		}

		if (
			this.generateHeader !== GenerateHeaderOptions.none &&
			this.columnDefinitions !== null
		) {
			const generatedHeaderElement: HTMLElement = document.createElement(
				this.rowElementTag
			);
			this.generatedHeader = generatedHeaderElement as unknown as DataGridRow;
			this.generatedHeader.columnDefinitions = this.columnDefinitions;
			this.generatedHeader.gridTemplateColumns = this.gridTemplateColumns;
			this.generatedHeader.rowType =
				this.generateHeader === GenerateHeaderOptions.sticky
					? DataGridRowTypes.stickyHeader
					: DataGridRowTypes.header;

			if (this.firstChild !== null) {
				this.insertBefore(generatedHeaderElement, this.firstChild);
			}
			return;
		}
	}

	private onChildListChange = (
		mutations: MutationRecord[],
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		_: MutationObserver
	): void => {
		if (mutations && mutations.length) {
			mutations.forEach((mutation: MutationRecord): void => {
				mutation.addedNodes.forEach((newNode: Node): void => {
					if (
						newNode.nodeType === 1 &&
						(newNode as Element).getAttribute('role') === 'row'
					) {
						(newNode as DataGridRow).columnDefinitions = this.columnDefinitions;
					}
				});
			});

			this.queueRowIndexUpdate();
		}
	};

	private queueRowIndexUpdate = (): void => {
		if (!this.rowindexUpdateQueued) {
			this.rowindexUpdateQueued = true;
			DOM.queueUpdate(this.updateRowIndexes);
		}
	};

	private updateRowIndexes = (): void => {
		let newGridTemplateColumns = this.gridTemplateColumns;

		if (newGridTemplateColumns === undefined) {
			// try to generate columns based on manual rows
			if (
				this.generatedGridTemplateColumns === '' &&
				this.rowElements.length > 0
			) {
				const firstRow: DataGridRow = this.rowElements[0] as DataGridRow;
				this.generatedGridTemplateColumns = new Array(
					firstRow.cellElements.length
				)
					.fill('1fr')
					.join(' ');
			}

			newGridTemplateColumns = this.generatedGridTemplateColumns;
		}

		this.rowElements.forEach((element: Element, index: number): void => {
			const thisRow = element as DataGridRow;
			thisRow.rowIndex = index;
			thisRow.gridTemplateColumns = newGridTemplateColumns;
			if (this.columnDefinitionsStale) {
				thisRow.columnDefinitions = this.columnDefinitions;
			}
		});

		this.rowindexUpdateQueued = false;
		this.columnDefinitionsStale = false;
	};

	/**
	 *
	 * Rows slot observer:
	 *
	 * @internal
	 */
	@observable slottedRowElements?: HTMLElement[];

	/**
	 *
	 *
	 * @internal
	 */
	slottedRowElementsChanged(
		_oldValue: HTMLElement[],
		_newValue: HTMLElement[]
	) {
		this.#initSelections();
	}

	/**
	 * Indicates the selection mode.
	 *
	 * @public
	 * HTML Attribute: selection-mode
	 */
	@attr({ attribute: 'selection-mode' })
	selectionMode?: DataGridSelectionMode;

	get #selectedRows(): DataGridRow[] {
		return this.rowElements.filter((row) => row.selected) as DataGridRow[];
	}

	get #selectedCells(): DataGridCell[] {
		return this.rowElements.reduce((acc, row) => {
			const rowChildren = Array.from(row.children) as DataGridCell[];
			const selectedCells = rowChildren.filter(
				(cell: DataGridCell) => cell.selected
			);
			return acc.concat(selectedCells);
		}, [] as DataGridCell[]);
	}

	selectionModeChanged(oldValue: DataGridSelectionMode) {
		if (oldValue === undefined) {
			DOM.queueUpdate(this.#initSelections);
			return;
		}
		this.#resetSelection();
	}

	#handleKeypress = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' || e.key === ' ') {
			this.#handleClick(e as unknown as MouseEvent);
		}
	};

	#handleClick = ({ target, ctrlKey, shiftKey, metaKey }: MouseEvent) => {
		if ((target as HTMLElement).getAttribute('role') !== 'gridcell') return;

		if (
			this.selectionMode === DataGridSelectionMode.singleCell ||
			this.selectionMode === DataGridSelectionMode.multiCell
		) {
			this.#handleCellSelection({ target, ctrlKey, shiftKey, metaKey });
			return;
		}

		if (
			this.selectionMode === DataGridSelectionMode.singleRow ||
			this.selectionMode === DataGridSelectionMode.multiRow
		) {
			this.#handleRowSelection({ target, ctrlKey, shiftKey, metaKey });
		}
	};

	#handleCellSelection = ({
		target,
		ctrlKey,
		shiftKey,
		metaKey,
	}: SelectionMetaData) => {
		const cell = target as DataGridCell;

		if (
			this.selectionMode === DataGridSelectionMode.multiCell &&
			(ctrlKey || shiftKey || metaKey)
		) {
			cell.selected = !this.#selectedCells.includes(cell);
		} else {
			const cacheTargetSelection = cell.selected;
			this.#resetSelection();
			cell.selected = !cacheTargetSelection;
		}
	};

	#handleRowSelection = ({
		target,
		ctrlKey,
		shiftKey,
		metaKey,
	}: SelectionMetaData) => {
		const row = (target as DataGridCell).parentNode as DataGridRow;
		if (
			this.selectionMode === DataGridSelectionMode.multiRow &&
			(ctrlKey || shiftKey || metaKey)
		) {
			row.selected = !this.#selectedRows.includes(row);
		} else {
			const cacheTargetSelection = row.selected;
			this.#resetSelection();
			row.selected = !cacheTargetSelection;
		}
	};

	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
		this.addEventListener('keydown', this.#handleKeypress);
	}

	#changeHandler = {
		handleChange(dataGrid: DataGrid, propertyName: string) {
			if (propertyName === 'columnDefinitions') {
				if (dataGrid.$fastController.isConnected) {
					dataGrid.toggleGeneratedHeader();
				}
			}
		},
	};

	#resetSelection = () => {
		if (
			this.selectionMode === DataGridSelectionMode.singleCell ||
			this.selectionMode === DataGridSelectionMode.multiCell
		) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => (cell.selected = false));
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) => (row.selected = undefined));
		}
		if (this.selectionMode === DataGridSelectionMode.none) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => (cell.selected = undefined));
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) => (row.selected = undefined));
		}
		if (
			this.selectionMode === DataGridSelectionMode.singleRow ||
			this.selectionMode === DataGridSelectionMode.multiRow
		) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => (cell.selected = undefined));
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) => (row.selected = false));
		}
	};

	#initSelections = () => {
		if (
			this.selectionMode === DataGridSelectionMode.singleCell ||
			this.selectionMode === DataGridSelectionMode.multiCell
		) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => {
				if (cell.selected !== undefined) {
					cell.selected = false;
				}
			});
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) => (row.selected = undefined));
		}

		if (this.selectionMode === DataGridSelectionMode.none) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => (cell.selected = undefined));
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) => (row.selected = undefined));
		}

		if (
			this.selectionMode === DataGridSelectionMode.singleRow ||
			this.selectionMode === DataGridSelectionMode.multiRow
		) {
			(
				Array.from(this.querySelectorAll('[role="gridcell"]')) as DataGridCell[]
			).forEach((cell) => (cell.selected = undefined));
			(
				Array.from(this.querySelectorAll('[role="row"]')) as DataGridRow[]
			).forEach((row) =>
				row.selected !== undefined ? (row.selected = false) : null
			);
		}
	};

	static generateColumns(rowData: any) {
		return Object.keys(rowData).map((property, index) => {
			return {
				columnDataKey: property,
				gridColumn: `${index}`,
			};
		});
	}
}
