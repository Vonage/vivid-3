import { inverseLerp, lerp } from './lerp';

describe('lerp', () => {
	it('should return the linear interpolation between two values', () => {
		expect(lerp(0, 10, 0.5)).toBe(5);
		expect(lerp(0, 10, 0.75)).toBe(7.5);
	});
});

describe('inverseLerp', () => {
	it('should return the fraction of a value between two values', () => {
		expect(inverseLerp(0, 10, 5)).toBe(0.5);
		expect(inverseLerp(0, 10, 7.5)).toBe(0.75);
	});
});
