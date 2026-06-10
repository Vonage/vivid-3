import { Hct } from '@material/material-color-utilities';
import {
	argbContrastRatio,
	argbRelativeLuminance,
} from '@shared/argb-contrast-ratio.util';
import { clamp } from '@shared/clamp.util';

type SolveMode = 'atLeast' | 'closest';

export function solveToneForContrast(
	argb: number,
	refArgb: number,
	target: number,
	epsilon = Math.max(0.002, target * 0.005), // tight near 1.x
	maxIterations = 24,
	mode: SolveMode = 'atLeast'
): number {
	const start = Hct.fromInt(argb);
	const t0 = start.tone;
	const makeWithTone = (t: number) =>
		Hct.from(start.hue, start.chroma, clamp(t, 0, 100)).toInt();
	const contrast = (t: number) => argbContrastRatio(makeWithTone(t), refArgb);

	const c0 = contrast(t0);
	if (mode === 'atLeast') {
		// Already meets? keep it (stability).
		if (c0 + epsilon >= target) return makeWithTone(t0);

		// Choose direction: increase contrast by moving AWAY from ref luminance.
		const Lref = argbRelativeLuminance(refArgb);
		const Lfg = argbRelativeLuminance(makeWithTone(t0));
		const goLighter = Lfg >= Lref; // if we're already lighter, go lighter to increase contrast

		// Bracket strictly: [lo, hi] = [start, boundary that increases contrast]
		const lo = t0;
		const hi = goLighter ? 100 : 0;

		// If even the far boundary can't reach target, return the boundary that gets closest (not necessarily max).
		const cLo = contrast(lo);
		const cHi = contrast(hi);
		if (cHi + epsilon < target) {
			// unreachable → choose the boundary whose contrast is closest to target (not always 'black')
			const nearest =
				Math.abs(cHi - target) <= Math.abs(cLo - target) ? hi : lo;
			return makeWithTone(nearest);
		}

		// Invariant: C(lo) < target ≤ C(hi). Do one-sided bisection.
		let L = lo,
			H = hi;
		for (let i = 0; i < maxIterations; i++) {
			const mid = (L + H) / 2;
			const c = contrast(mid);
			if (c + epsilon >= target) H = mid;
			else L = mid;
			if (Math.abs(H - L) < 0.01) break;
		}
		return makeWithTone(H);
	}

	// mode === 'closest'
	// Goal: find tone whose contrast is closest to target (can be below/above).
	// Since C(t) is monotonic on each side of the reference luminance,
	// try both sides (if they cross the target), then pick the closer one.

	// Compute global extremes to see if target is outside achievable range.
	const cMin = Math.min(contrast(0), contrast(100));
	const cMax = Math.max(contrast(0), contrast(100));
	if (target <= cMin + epsilon) {
		// below achievable range → return boundary with contrast closest to target
		return Math.abs(contrast(0) - target) <= Math.abs(contrast(100) - target)
			? makeWithTone(0)
			: makeWithTone(100);
	}
	if (target >= cMax - epsilon) {
		return Math.abs(contrast(0) - target) >= Math.abs(contrast(100) - target)
			? makeWithTone(0)
			: makeWithTone(100);
	}

	// Helper: bisect on [a,b] assuming C(a) <= target <= C(b) (after ensuring monotonic direction).
	const bisectTo = (a: number, b: number, increasing: boolean) => {
		let lo = a,
			hi = b;
		const below = (t: number) =>
			(increasing ? contrast(t) : -contrast(t)) <
			(increasing ? target : -target) - epsilon;
		for (let i = 0; i < maxIterations; i++) {
			const mid = (lo + hi) / 2;
			if (below(mid)) lo = mid;
			else hi = mid;
			if (Math.abs(hi - lo) < 0.01) break;
		}
		return hi;
	};

	const Lref = argbRelativeLuminance(refArgb);
	const Lfg = argbRelativeLuminance(makeWithTone(t0));

	// Solve upward if target is between C(t0) and C(100)
	let candidateUp: number | null = null;
	if (
		(contrast(t0) <= target && target <= contrast(100)) ||
		(contrast(t0) >= target && target >= contrast(100))
	) {
		const increasing = Lfg >= Lref; // going up increases contrast if we're already lighter
		candidateUp = bisectTo(t0, 100, increasing);
	}

	// Solve downward if target is between C(0) and C(t0)
	let candidateDown: number | null = null;
	if (
		(contrast(0) <= target && target <= contrast(t0)) ||
		(contrast(0) >= target && target >= contrast(t0))
	) {
		const increasing = Lfg < Lref; // going down increases contrast if we're darker
		candidateDown = bisectTo(0, t0, increasing);
	}

	// Pick candidate with closer contrast (tie-breaker: smaller |Δtone|)
	const pick = (...tones: (number | null)[]) => {
		const valid = tones.filter((t): t is number => t !== null);
		if (valid.length === 0) {
			// Shouldn't happen due to earlier range checks; fall back to nearest boundary.
			return Math.abs(contrast(0) - target) <= Math.abs(contrast(100) - target)
				? 0
				: 100;
		}
		return valid.reduce((best, t) => {
			const db = Math.abs(contrast(best) - target);
			const dt = Math.abs(contrast(t) - target);
			if (dt < db - 1e-6) return t;
			if (Math.abs(dt - db) <= 1e-6) {
				return Math.abs(t - t0) < Math.abs(best - t0) ? t : best;
			}
			return best;
		}, valid[0]);
	};

	const bestTone = pick(candidateUp, candidateDown);
	return makeWithTone(bestTone);
}
