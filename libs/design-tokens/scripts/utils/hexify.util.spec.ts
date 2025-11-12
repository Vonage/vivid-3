import { type ColorValue, getHex } from './hexify.util';

describe('getHex', () => {
	it('should convert color components to a hex string with alpha', () => {
		const color: ColorValue = {
			components: [0.2, 0.4, 0.6],
			alpha: 0.8,
			colorSpace: 'srgb',
			hex: '#336699',
		};
		expect(getHex(color)).toBe('#336699cc');
	});

	it('should handle black color', () => {
		const color: ColorValue = {
			components: [0, 0, 0],
			alpha: 1,
			colorSpace: 'srgb',
			hex: '#000000',
		};
		expect(getHex(color)).toBe('#000000ff');
	});

	it('should handle white color', () => {
		const color: ColorValue = {
			components: [1, 1, 1],
			alpha: 1,
			colorSpace: 'srgb',
			hex: '#ffffff',
		};
		expect(getHex(color)).toBe('#ffffffff');
	});

	it('should handle 50% alpha', () => {
		const color: ColorValue = {
			components: [1, 1, 1],
			alpha: 0.5,
			colorSpace: 'srgb',
			hex: '#ffffff',
		};
		expect(getHex(color)).toBe('#ffffff80');
	});

	it('should handle zero alpha', () => {
		const color: ColorValue = {
			components: [0, 0, 0],
			alpha: 0,
			colorSpace: 'srgb',
			hex: '#000000',
		};
		expect(getHex(color)).toBe('#00000000');
	});

	it('should handle rounding correctly', () => {
		const color: ColorValue = {
			components: [0.103, 0.506, 0.907],
			alpha: 0.499,
			colorSpace: 'srgb',
			hex: '#1a81e7',
		};
		expect(getHex(color)).toBe('#1a81e77f');
	});
});
