import { type ValueConverter } from '@microsoft/fast-element';
import type { ColorSwatch } from './types';

/**
 * Calculate the relative luminance of a hex color using WCAG formula
 */
export function getLuminance(hexColor: string): number {
	const hex = hexColor.replace('#', '');

	const r = parseInt(hex.slice(0, 2), 16) / 255;
	const g = parseInt(hex.slice(2, 4), 16) / 255;
	const b = parseInt(hex.slice(4, 6), 16) / 255;

	const sR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
	const sG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
	const sB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

	return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
	const lum1 = getLuminance(color1);
	const lum2 = getLuminance(color2);
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get CSS custom property value from the document
 */
export function getCSSCustomProperty(
	propertyName: string,
	element?: Element
): string {
	if (!element) {
		element = document.querySelector('.vvd-root') || document.documentElement;
	}

	return getComputedStyle(element).getPropertyValue(propertyName).trim();
}

/**
 * Apply contrast class to swatch if contrast ratio is insufficient
 */
export function applyContrastClass(
	swatch: HTMLElement,
	contrastThreshold: number = 3
): void {
	const canvasColor = getCSSCustomProperty('--vvd-color-canvas');
	const swatchColor = swatch.style.getPropertyValue('--swatch-color')?.trim();

	if (!canvasColor || !swatchColor) {
		return;
	}
	const contrastRatio = getContrastRatio(swatchColor, canvasColor);

	if (contrastRatio < contrastThreshold) {
		swatch.classList.add('contrast');
	} else {
		swatch.classList.remove('contrast');
	}
}

/**
 * Converter for swatches attribute, parses the JSON array safely
 */
export const colorSwatchesConverter: ValueConverter = {
	fromView(value: string): ColorSwatch[] {
		if (!value || typeof value !== 'string') return [];

		// Handle both original JSON format & JS single-quotes
		const formats = [value, value.replace(/'/g, '"')];

		for (const format of formats) {
			try {
				const parsed = JSON.parse(format);
				if (Array.isArray(parsed)) {
					return parsed.map((swatch) =>
						typeof swatch === 'string'
							? { value: swatch }
							: {
									value: swatch.value,
									...(swatch.label && { label: swatch.label }),
							  }
					);
				}
			} catch {
				continue;
			}
		}

		return [];
	},

	toView: (value: ColorSwatch[]) => JSON.stringify(value),
};
