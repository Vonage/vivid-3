import { describe, expect, it } from 'vitest';
import {
	applyContrastClass,
	colorSwatchesConverter,
	getContrastRatio,
	getLuminance,
} from './utils';

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

		it('should handle malformed hex colors gracefully', () => {
			expect(() => getLuminance('')).not.toThrow();
			expect(() => getLuminance('invalid')).not.toThrow();
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
			expect(getContrastRatio('ffffff', '000000')).toBeCloseTo(21, 1);
		});

		it('should handle malformed colors gracefully', () => {
			expect(() => getContrastRatio('', '#ffffff')).not.toThrow();
			expect(() => getContrastRatio('#ffffff', '')).not.toThrow();
		});
	});

	describe('applyContrastClass', () => {
		let mockSwatch: HTMLElement;

		beforeEach(() => {
			mockSwatch = document.createElement('div');
			vi.clearAllMocks();
		});

		it('should add contrast class when contrast ratio is below default threshold', () => {
			mockSwatch.style.setProperty('--swatch-color', '#333333');

			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				getPropertyValue: vi.fn().mockReturnValue('#000000'),
			} as any);
			vi.spyOn(document, 'querySelector').mockReturnValue(null);

			applyContrastClass(mockSwatch);

			expect(mockSwatch.classList.contains('contrast')).toBe(true);
		});

		it('should remove contrast class when contrast ratio is above default threshold', () => {
			mockSwatch.classList.add('contrast');
			mockSwatch.style.setProperty('--swatch-color', '#ffffff');

			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				getPropertyValue: vi.fn().mockReturnValue('#000000'),
			} as any);
			vi.spyOn(document, 'querySelector').mockReturnValue(null);

			applyContrastClass(mockSwatch);

			expect(mockSwatch.classList.contains('contrast')).toBe(false);
		});

		it('should handle missing colors gracefully', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				getPropertyValue: vi.fn().mockReturnValue(''),
			} as any);
			vi.spyOn(document, 'querySelector').mockReturnValue(null);

			expect(() => applyContrastClass(mockSwatch)).not.toThrow();
			expect(mockSwatch.classList.contains('contrast')).toBe(false);
		});
	});

	describe('colorSwatchesConverter', () => {
		describe('fromView', () => {
			it('should parse array of swatch objects', () => {
				const input =
					'[{"value": "#ff0000", "label": "Red"}, {"value": "#00ff00", "label": "Green"}]';
				const expected = [
					{ value: '#ff0000', label: 'Red' },
					{ value: '#00ff00', label: 'Green' },
				];

				expect(colorSwatchesConverter.fromView(input)).toEqual(expected);
			});

			it('should parse array of color strings', () => {
				const input = '["#ff0000", "#00ff00", "#0000ff"]';
				const expected = [
					{ value: '#ff0000' },
					{ value: '#00ff00' },
					{ value: '#0000ff' },
				];

				expect(colorSwatchesConverter.fromView(input)).toEqual(expected);
			});

			it('should handle mixed array with objects and strings', () => {
				const input = '[{"value": "#ff0000", "label": "Red"}, "#00ff00"]';
				const expected = [
					{ value: '#ff0000', label: 'Red' },
					{ value: '#00ff00' },
				];

				expect(colorSwatchesConverter.fromView(input)).toEqual(expected);
			});

			it('should handle objects without labels', () => {
				const input = '[{"value": "#ff0000"}, {"value": "#00ff00"}]';
				const expected = [{ value: '#ff0000' }, { value: '#00ff00' }];

				expect(colorSwatchesConverter.fromView(input)).toEqual(expected);
			});

			it('should handle single quotes by converting to double quotes', () => {
				const input = "[{'value': '#ff0000', 'label': 'Red'}]";
				const expected = [{ value: '#ff0000', label: 'Red' }];

				expect(colorSwatchesConverter.fromView(input)).toEqual(expected);
			});

			it('should return empty array for invalid JSON', () => {
				expect(colorSwatchesConverter.fromView('invalid-json')).toEqual([]);
				expect(colorSwatchesConverter.fromView('{"not": "array"}')).toEqual([]);
				expect(colorSwatchesConverter.fromView('')).toEqual([]);
				expect(colorSwatchesConverter.fromView('null')).toEqual([]);
			});

			it('should return empty array for non-string input', () => {
				expect(colorSwatchesConverter.fromView(null as any)).toEqual([]);
				expect(colorSwatchesConverter.fromView(undefined as any)).toEqual([]);
				expect(colorSwatchesConverter.fromView(123 as any)).toEqual([]);
			});

			it('should return empty array for non-array JSON', () => {
				expect(colorSwatchesConverter.fromView('{"color": "#ff0000"}')).toEqual(
					[]
				);
				expect(colorSwatchesConverter.fromView('true')).toEqual([]);
			});
		});

		describe('toView', () => {
			it('should convert swatch array to JSON string', () => {
				const input = [
					{ value: '#ff0000', label: 'Red' },
					{ value: '#00ff00', label: 'Green' },
				];
				const expected = JSON.stringify(input);

				expect(colorSwatchesConverter.toView(input)).toBe(expected);
			});

			it('should handle empty array', () => {
				expect(colorSwatchesConverter.toView([])).toBe('[]');
			});

			it('should handle swatches without labels', () => {
				const input = [{ value: '#ff0000' }, { value: '#00ff00' }];
				const expected = JSON.stringify(input);

				expect(colorSwatchesConverter.toView(input)).toBe(expected);
			});
		});
	});
});
