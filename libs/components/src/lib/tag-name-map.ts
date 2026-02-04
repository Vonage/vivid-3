import type {
	VwcAccordionElement,
	VwcAccordionItemElement,
	VwcActionGroupElement,
	VwcAlertElement,
	VwcAudioPlayerElement,
	VwcAvatarElement,
	VwcBadgeElement,
	VwcBannerElement,
	VwcBreadcrumbElement,
	VwcBreadcrumbItemElement,
	VwcButtonElement,
	VwcCalendarElement,
	VwcCalendarEventElement,
	VwcCardElement,
	VwcCheckboxElement,
	VwcColorPickerElement,
	VwcComboboxElement,
	VwcContextualHelpElement,
	VwcCountryIndicatorElement,
	VwcDataGridCellElement,
	VwcDataGridElement,
	VwcDataGridRowElement,
	VwcDatePickerElement,
	VwcDateRangePickerElement,
	VwcDateTimePickerElement,
	VwcDialogElement,
	VwcDialPadElement,
	VwcDividerElement,
	VwcEmptyStateElement,
	VwcFabElement,
	VwcFilePickerElement,
	VwcHeaderElement,
	VwcIconElement,
	VwcLayoutElement,
	VwcMenuElement,
	VwcMenuItemElement,
	VwcNavDisclosureElement,
	VwcNavElement,
	VwcNavItemElement,
	VwcNoteElement,
	VwcNumberFieldElement,
	VwcOptionElement,
	VwcPaginationElement,
	VwcPopoverElement,
	VwcProgressElement,
	VwcProgressRingElement,
	VwcRadioElement,
	VwcRadioGroupElement,
	VwcRangeSliderElement,
	VwcRichTextEditorElement,
	VwcRichTextViewElement,
	VwcSearchableSelectElement,
	VwcSelectableBoxElement,
	VwcSelectElement,
	VwcSideDrawerElement,
	VwcSimpleColorPickerElement,
	VwcSliderElement,
	VwcSplitButtonElement,
	VwcSwitchElement,
	VwcTabElement,
	VwcTableBodyElement,
	VwcTableCellElement,
	VwcTableElement,
	VwcTableHeadElement,
	VwcTableHeaderCellElement,
	VwcTableRowElement,
	VwcTabPanelElement,
	VwcTabsElement,
	VwcTagElement,
	VwcTagGroupElement,
	VwcTextAreaElement,
	VwcTextFieldElement,
	VwcTimePickerElement,
	VwcToggletipElement,
	VwcTooltipElement,
	VwcTreeItemElement,
	VwcTreeViewElement,
	VwcVideoPlayerElement,
} from './components';

type DefaultVividTagNameMap = {
	'vwc-accordion': VwcAccordionElement;
	'vwc-accordion-item': VwcAccordionItemElement;
	'vwc-action-group': VwcActionGroupElement;
	'vwc-alert': VwcAlertElement;
	'vwc-audio-player': VwcAudioPlayerElement;
	'vwc-avatar': VwcAvatarElement;
	'vwc-badge': VwcBadgeElement;
	'vwc-banner': VwcBannerElement;
	'vwc-breadcrumb': VwcBreadcrumbElement;
	'vwc-breadcrumb-item': VwcBreadcrumbItemElement;
	'vwc-button': VwcButtonElement;
	'vwc-calendar': VwcCalendarElement;
	'vwc-calendar-event': VwcCalendarEventElement;
	'vwc-card': VwcCardElement;
	'vwc-checkbox': VwcCheckboxElement;
	'vwc-color-picker': VwcColorPickerElement;
	'vwc-contextual-help': VwcContextualHelpElement;
	'vwc-combobox': VwcComboboxElement;
	'vwc-country-indicator': VwcCountryIndicatorElement;
	'vwc-data-grid-cell': VwcDataGridCellElement;
	'vwc-data-grid': VwcDataGridElement;
	'vwc-data-grid-row': VwcDataGridRowElement;
	'vwc-table': VwcTableElement;
	'vwc-table-body': VwcTableBodyElement;
	'vwc-table-cell': VwcTableCellElement;
	'vwc-table-head': VwcTableHeadElement;
	'vwc-table-header-cell': VwcTableHeaderCellElement;
	'vwc-table-row': VwcTableRowElement;
	'vwc-date-picker': VwcDatePickerElement;
	'vwc-date-range-picker': VwcDateRangePickerElement;
	'vwc-date-time-picker': VwcDateTimePickerElement;
	'vwc-dialog': VwcDialogElement;
	'vwc-dial-pad': VwcDialPadElement;
	'vwc-divider': VwcDividerElement;
	'vwc-empty-state': VwcEmptyStateElement;
	'vwc-fab': VwcFabElement;
	'vwc-file-picker': VwcFilePickerElement;
	'vwc-header': VwcHeaderElement;
	'vwc-icon': VwcIconElement;
	'vwc-layout': VwcLayoutElement;
	'vwc-menu': VwcMenuElement;
	'vwc-menu-item': VwcMenuItemElement;
	'vwc-nav-disclosure': VwcNavDisclosureElement;
	'vwc-nav': VwcNavElement;
	'vwc-nav-item': VwcNavItemElement;
	'vwc-note': VwcNoteElement;
	'vwc-number-field': VwcNumberFieldElement;
	'vwc-option': VwcOptionElement;
	'vwc-pagination': VwcPaginationElement;
	'vwc-popover': VwcPopoverElement;
	'vwc-progress': VwcProgressElement;
	'vwc-progress-ring': VwcProgressRingElement;
	'vwc-radio': VwcRadioElement;
	'vwc-radio-group': VwcRadioGroupElement;
	'vwc-range-slider': VwcRangeSliderElement;
	'vwc-rich-text-view': VwcRichTextViewElement;
	'vwc-rich-text-editor': VwcRichTextEditorElement;
	'vwc-searchable-select': VwcSearchableSelectElement;
	'vwc-selectable-box': VwcSelectableBoxElement;
	'vwc-select': VwcSelectElement;
	'vwc-side-drawer': VwcSideDrawerElement;
	'vwc-simple-color-picker': VwcSimpleColorPickerElement;
	'vwc-slider': VwcSliderElement;
	'vwc-split-button': VwcSplitButtonElement;
	'vwc-switch': VwcSwitchElement;
	'vwc-tab': VwcTabElement;
	'vwc-tab-panel': VwcTabPanelElement;
	'vwc-tabs': VwcTabsElement;
	'vwc-tag': VwcTagElement;
	'vwc-tag-group': VwcTagGroupElement;
	'vwc-text-area': VwcTextAreaElement;
	'vwc-text-field': VwcTextFieldElement;
	'vwc-time-picker': VwcTimePickerElement;
	'vwc-toggletip': VwcToggletipElement;
	'vwc-tooltip': VwcTooltipElement;
	'vwc-tree-item': VwcTreeItemElement;
	'vwc-tree-view': VwcTreeViewElement;
	'vwc-video-player': VwcVideoPlayerElement;
};

export type VividTagNameMap<P extends string> = {
	[K in keyof DefaultVividTagNameMap as K extends `vwc-${infer N}`
		? `${P}-${N}`
		: never]: DefaultVividTagNameMap[K];
};
