export function addDegrees(a: number, b: number): number {
	const result = (a + b) % 360;
	return result < 0 ? result + 360 : result;
}
