export interface BaseColorPickerLocale {
	colorSwatchLabel: (
		value: string,
		label?: string,
		selected?: boolean
	) => string;
}
