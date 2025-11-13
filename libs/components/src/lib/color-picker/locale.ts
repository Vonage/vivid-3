export interface ColorPickerLocale {
	popupLabel: string;
	swatchesLabel: string;
	pickerButtonLabel: string;
	hexInputLabel: string;
	saveButtonLabel: string;
	closeButtonLabel: string;
	copyButtonLabel: string;
	copyErrorText: string;
	copySuccessMessage: (value: string) => string;
	selectionSuccessMessage: (value: string) => string;
	maxSwatchesMessage: (total: number, limit: number) => string;
}
