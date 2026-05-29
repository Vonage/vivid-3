export function equalBetween(
	start: number,
	end: number,
	count: number
): number[] {
	const step = (end - start) / (count - 1);
	return Array.from({ length: count }, (_, i) => start + i * step);
}

export function equalAround(
	start: number,
	end: number,
	count: number
): number[] {
	const step = (end - start) / count;
	return Array.from({ length: count }, (_, i) => start + (i + 0.5) * step).map(
		Math.round
	);
}

export function equalBetweenPadded(
	start: number,
	end: number,
	count: number,
	padding: number
): number[] {
	const step = (end - start - 2 * padding) / (count - 1);
	return Array.from({ length: count }, (_, i) => start + padding + i * step);
}

export function equalAroundPadded(
	start: number,
	end: number,
	count: number,
	startPadding: number,
	endPadding: number = startPadding
): number[] {
	const step = (end - start - startPadding - endPadding) / count;
	return Array.from(
		{ length: count },
		(_, i) => start + startPadding + (i + 0.5) * step
	);
}
