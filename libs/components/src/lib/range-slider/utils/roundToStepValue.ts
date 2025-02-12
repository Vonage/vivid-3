const getDecimalPlaces = (num: number) => {
	const match = num.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)!;
	return Math.max(
		0,
		// Number of digits right of decimal point.
		(match[1] ? match[1].length : 0) -
			// Adjust for scientific notation.
			(match[2] ? +match[2] : 0)
	);
};

/**
 * Rounds a value to the nearest step value. Handles decimal rounding.
 */
export const roundToStepValue = (value: number, step: number) => {
	const decimalPlaces = getDecimalPlaces(step);
	const factor = Math.pow(10, decimalPlaces);
	const roundedValue = Math.round(value / step) * step;
	return Math.round(roundedValue * factor) / factor;
};

export const handleStepValue = (step: number) => (step > 0 ? step : 1);

export const defaultToOneConverter = {
	fromView(value: string | number): number {
		const num = Number(value);
		return handleStepValue(num);
	},
	toView(value: number): string {
		return value.toString();
	},
};
