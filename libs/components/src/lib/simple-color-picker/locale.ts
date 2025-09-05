export interface SimpleColorPickerLocale {
	colorPaletteLabel: string;
	colorSwatchLabel: (
		value: string,
		label?: string,
		selected?: boolean
	) => string;
}
