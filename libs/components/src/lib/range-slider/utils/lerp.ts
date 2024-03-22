import { limit } from '@microsoft/fast-web-utilities';

/**
 * Linearly interpolates between two values.
 */
export const lerp = (a: number, b: number, value: number) =>
	a + (b - a) * value;

/**
 * Returns the fraction of a value between a and b.
 */
export const inverseLerp = (a: number, b: number, value: number) =>
	limit(0, 1, (value - a) / (b - a));
