import { defaultToOneConverter, roundToStepValue } from './roundToStepValue';

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

describe('defaultToOneConverter', () => {
	describe('fromView', () => {
		describe('value as a number', () => {
			it('should return the number passed if it is above 0', () => {
				expect(defaultToOneConverter.fromView(2)).toBe(2);
			});

			it('should return 1 if then number passed is 0 or below', () => {
				expect(defaultToOneConverter.fromView(0)).toBe(1);
				expect(defaultToOneConverter.fromView(-0.5)).toBe(1);
			});
		});

		describe('value as a string', () => {
			it('should return the number passed if it is above 0', () => {
				expect(defaultToOneConverter.fromView('2')).toBe(2);
			});

			it('should return 1 if then number passed is 0 or below', () => {
				expect(defaultToOneConverter.fromView('0')).toBe(1);
				expect(defaultToOneConverter.fromView('-0.5')).toBe(1);
			});
		});
	});

	describe('toView', () => {
		it('should return the number as a string', () => {
			expect(defaultToOneConverter.toView(1)).toBe('1');
		});
	});
});
