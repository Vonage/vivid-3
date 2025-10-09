function parseHexColor(input: string): string | null {
	if (!input) return null;
	const hex = input.trim().replace(/^#/, '');

	if (/^[0-9a-fA-F]{3}$/.test(hex)) {
		return hex
			.split('')
			.map((char) => char + char)
			.join('')
			.toLowerCase();
	}

	if (/^[0-9a-fA-F]{6}$/.test(hex)) {
		return hex.toLowerCase();
	}

	return null;
}

/**
 * Check if input value is valid hex color
 */
export function isValidHexColor(input: string): boolean {
	return parseHexColor(input) !== null;
}

/**
 * Calculate the relative luminance of a hex color using WCAG formula
 */
export function getLuminance(hexColor: string): number {
	const hex = parseHexColor(hexColor);
	if (!hex) return 0;

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
