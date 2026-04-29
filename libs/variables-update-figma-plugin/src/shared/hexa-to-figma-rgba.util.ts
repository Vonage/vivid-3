export function hexaToFigmaRgba(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	const a = parseInt(hex.slice(7, 9), 16) / 255 || 1;

	return { r, g, b, a };
}
