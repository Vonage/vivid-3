export function hexToRgba(
	hex: string
): { r: number; g: number; b: number; a: number } | null {
	if (!hex || hex.charCodeAt(0) !== 35 /* '#' */) return null;
	const len = hex.length;
	if (len !== 7 && len !== 9) return null;

	const toByte = (i: number): number => {
		const v = Number.parseInt(hex.slice(i, i + 2), 16);
		return Number.isNaN(v) ? -1 : v;
	};

	const r = toByte(1);
	const g = toByte(3);
	const b = toByte(5);
	if (r < 0 || g < 0 || b < 0) return null;

	let a = 255;
	if (len === 9) {
		a = toByte(7);
		if (a < 0) return null;
	}

	return {
		r: r / 255,
		g: g / 255,
		b: b / 255,
		a: a / 255,
	};
}
