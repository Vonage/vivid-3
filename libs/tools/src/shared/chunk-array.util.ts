export function chunkify<T extends Array<any>>(
	array: T[],
	size: number
): T[][] {
	const output = [];
	while (array.length) {
		output.push(array.splice(0, size));
	}
	return output;
}
