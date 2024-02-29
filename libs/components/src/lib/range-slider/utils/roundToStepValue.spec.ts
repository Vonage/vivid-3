import { roundToStepValue } from './roundToStepValue.ts';

describe('roundToStepValue', () => {
	it('should round down to the nearest step if it is closer', () => {
		expect(roundToStepValue(4, 3)).toBe(3);
		expect(roundToStepValue(-4, 3)).toBe(-3);
	});
	it('should round up to the nearest step if it is closer', () => {
		expect(roundToStepValue(3, 5)).toBe(5);
		expect(roundToStepValue(-3, 5)).toBe(-5);
	});
	it('should handle decimal rounding', () => {
		expect(roundToStepValue(0.1 + 0.1 + 0.1, 0.1)).toBe(0.3);
		expect(roundToStepValue(0.1 + 0.1 + 0.1, 1e-7)).toBe(0.3);
	});
});
