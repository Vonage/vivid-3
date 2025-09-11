import { describe, expect, it } from 'vitest';
import { getContrastRatio, getCSSCustomProperty, getLuminance } from './utils';

describe('color-picker-utils', () => {
	describe('getLuminance', () => {
		it('should calculate correct luminance values for known colors', () => {
			expect(getLuminance('#ffffff')).toBeCloseTo(1, 3); // White
			expect(getLuminance('#000000')).toBeCloseTo(0, 3); // Black
			expect(getLuminance('#ff0000')).toBeCloseTo(0.2126, 3); // Red
			expect(getLuminance('#00ff00')).toBeCloseTo(0.7152, 3); // Green
			expect(getLuminance('#0000ff')).toBeCloseTo(0.0722, 3); // Blue
		});

		it('should handle hex colors with and without # prefix', () => {
			expect(getLuminance('#808080')).toBeCloseTo(0.2159, 3);
			expect(getLuminance('808080')).toBeCloseTo(0.2159, 3);
		});

		it('should coerce malformed inputs to black (0)', () => {
			expect(getLuminance('')).toBe(0);
			expect(getLuminance('invalid')).toBe(0);
			expect(getLuminance('#abc')).toBe(0);
			expect(getLuminance('#gggggg')).toBe(0);
			expect(getLuminance('   #FFFFFF   ')).toBeCloseTo(1, 3);
		});
	});

	describe('getContrastRatio', () => {
		it('should calculate correct contrast ratios', () => {
			expect(getContrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1);
			expect(getContrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);

			expect(getContrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 2);
			expect(getContrastRatio('#000000', '#000000')).toBeCloseTo(1, 2);

			expect(getContrastRatio('#ff0000', '#ffffff')).toBeCloseTo(3.998, 1);
		});

		it('should handle order independence', () => {
			const ratio1 = getContrastRatio('#ff0000', '#00ff00');
			const ratio2 = getContrastRatio('#00ff00', '#ff0000');
			expect(ratio1).toBe(ratio2);
		});

		it('should work with colors without # prefix', () => {
			expect(getContrastRatio('ffffff', 'ff0000')).toBeCloseTo(3.998, 3);
		});

		it('should handle malformed inputs using coercion', () => {
			expect(getContrastRatio('', '#ffffff')).toBeCloseTo(21, 1);
			expect(getContrastRatio('#ffffff', '')).toBeCloseTo(21, 1);
			expect(getContrastRatio('nope', 'nope')).toBeCloseTo(1, 2);
		});
	});

	describe('getCSSCustomProperty', () => {
		it('falls back to .vvd-root, then documentElement when no element is provided', () => {
			document.documentElement.style.setProperty(
				'--vvd-color-canvas',
				'#abcabc'
			);
			expect(getCSSCustomProperty('--vvd-color-canvas')).toBe('#abcabc');

			const vividRoot = document.createElement('div');
			vividRoot.className = 'vvd-root';
			vividRoot.style.setProperty('--vvd-color-canvas', '#123456');
			document.body.appendChild(vividRoot);
			expect(getCSSCustomProperty('--vvd-color-canvas')).toBe('#123456');

			vividRoot.remove();
			document.documentElement.style.removeProperty('--vvd-color-canvas');
		});
	});
});
