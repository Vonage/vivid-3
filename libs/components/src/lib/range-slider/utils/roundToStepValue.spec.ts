import { handleStepValue, roundToStepValue } from './roundToStepValue.ts';

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

describe('handleStepValue', () => {
	it('should return the number passed if it is above 0', () => {
		expect(handleStepValue(2)).toBe(2);
	});

	it('should return 1 if then number passed is 0 or below', () => {
		expect(handleStepValue(0)).toBe(1);
		expect(handleStepValue(-0.5)).toBe(1);
	});
});
