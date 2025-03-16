// Importing from '@microsoft/fast-foundation' requires a DOM
import './polyfill/dom';

import {
	AccordionExpandMode,
	ComboboxAutocomplete,
	DividerRole,
	SelectPosition,
	SliderMode,
	TabsOrientation,
	TextAreaResize,
	TextFieldType,
} from '@microsoft/fast-foundation';
import { MenuItemRole, MediaSkipBy, TabsGutters, Sticky } from '@vonage/vivid';
import { Direction, Orientation } from '@microsoft/fast-web-utilities';
import { toTypeStr, TypeStr } from '../common/types';

const typeFromEnumObj = (enumObj: Record<string, string>): TypeStr =>
	toTypeStr(Object.values(enumObj).map((value) => `'${value}'`));

export const globalTypeDefs: Record<string, TypeStr> = {
	// Types defined by FAST:
	AccordionExpandMode: typeFromEnumObj(AccordionExpandMode),
	ComboboxAutocomplete: typeFromEnumObj(ComboboxAutocomplete),
	SelectPosition: typeFromEnumObj(SelectPosition),
	DividerRole: typeFromEnumObj(DividerRole),
	SliderMode: typeFromEnumObj(SliderMode),
	TabsOrientation: typeFromEnumObj(TabsOrientation),
	TabsGutters: typeFromEnumObj(TabsGutters),
	TextFieldType: typeFromEnumObj(TextFieldType),
	TextAreaResize: typeFromEnumObj(TextAreaResize),
	Orientation: typeFromEnumObj(Orientation),
	Direction: typeFromEnumObj(Direction),
	MediaSkipBy: typeFromEnumObj(MediaSkipBy),
	Sticky: typeFromEnumObj(Sticky),

	// Types defined by Floating UI:
	Placement:
		"'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'",
	Strategy: "'absolute' | 'fixed'",

	// Types defined by Vivid Components:

	// Combobox
	PopupPlacement: "'top' | 'bottom'",

	// Dialog
	IconPlacement: "'top' | 'side'",

	// Layout:
	Gutters: "'small' | 'medium' | 'large'",
	ColumnSpacing: "'small' | 'medium' | 'large'",
	RowSpacing: "'small' | 'medium' | 'large'",
	ColumnBasis: "'small' | 'medium' | 'large' | 'block'",
	AUTO_SIZING: "'fit' | 'fill'",

	// TextArea
	TextAreaWrap: "'hard' | 'soft' | 'off'",

	// DataGrid:
	DataGridSelectionMode:
		"'none' | 'single-row' | 'multi-row' | 'single-cell' | 'multi-cell'",
	DataGridRowTypes: "'default' | 'header' | 'sticky-header'",
	DataGridCellTypes: "'default' | 'columnheader' | 'rowheader'",
	// Tooltip:
	anchorType: 'string | HTMLElement',

	// Toggletip:
	AnchorType: 'string | HTMLElement',

	// Pagination:
	Button: 'HTMLButtonElement',
	'Button[]': 'HTMLButtonElement[]',

	// Alert:
	AlertPlacement:
		"'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'",
	AlertStrategy: "'fixed' | 'static'",

	// Data grid:
	GenerateHeaderOptions: "'none' | 'default' | 'sticky'",

	// Date picker:
	DateStr: 'string',

	// Menu item:
	MenuItemRole: typeFromEnumObj(MenuItemRole),
	CheckAppearance: "'normal' | 'tick-only'",

	// Selectable box:
	SelectableBoxControlType: "'checkbox' | 'radio'",

	// Empty-state:
	EmptyStateIconDecoration: "'outlined' | 'filled'",

	AriaCheckedStates: "'true' | 'false' | 'mixed' | 'undefined'",
};
