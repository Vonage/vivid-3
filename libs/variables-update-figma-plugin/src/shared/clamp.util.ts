export function clamp(n: number, lo: number, hi: number) {
	return Math.max(lo, Math.min(hi, n));
}
