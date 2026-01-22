/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
export function chunkify<T extends any>(array: T[], size: number): T[][] {
	const output: T[][] = [];
	while (array.length) {
		output.push(array.splice(0, size));
	}
	return output as T[][];
}
