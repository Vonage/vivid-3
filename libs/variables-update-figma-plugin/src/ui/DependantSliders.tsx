import { clamp } from '@shared/clamp.util';
import React, { useMemo, useState } from 'react';
import classes from './styles.module.css';

export type DependentSlidersProps = {
	/**
	 * Initial values of the sliders. If omitted, defaults to zeros.
	 */
	values?: number[];
	/**
	 * Number of sliders (ignored if `values` provided).
	 * @default 13
	 */
	count?: number;
	/**
	 * Width in slider units; higher spreads influence further.
	 */
	width?: number;
	/**
	 * Callback with full values array after any edit.
	 */
	onChange?: (next: number[]) => void;
};

function cubicSpline(x: number) {
	const u = Math.abs(x);
	if (u >= 2) return 0;
	if (u < 1) return 2 / 3 - u * u + 0.5 * u * u * u;
	return (1 / 6) * (2 - u) ** 3;
}

export default function DependentSliders({
	values,
	count = 13,
	width = 1.5,
	onChange,
}: DependentSlidersProps) {
	const min = -50;
	const max = 50;
	const step = 1;

	const initial = useMemo(() => {
		if (Array.isArray(values) && values.length > 0) return [...values];
		return Array.from({ length: count }, () => 0);
	}, [values, count]);

	const [currentValue, setCurrentValue] = useState<number[]>(initial);

	function updateValue(idx: number, newVal: number) {
		const next = [...currentValue];
		const original = currentValue[idx] ?? 0;
		const delta = newVal - original;

		for (let i = 0; i < currentValue.length; i++) {
			const d = (i - idx) / (width || 1.0001);
			const w = cubicSpline(d);
			if (w === 0) continue;
			next[i] = clamp((next[i] ?? 0) + w * delta, min, max);
		}

		setCurrentValue(next);
		if (onChange) {
			onChange(next);
		}
	}

	return (
		<div className={classes.sliders}>
			{currentValue.map((val, i) => (
				<div key={i} className={classes.slider}>
					<input
						type="range"
						min={min}
						max={max}
						step={step}
						value={val}
						onChange={(e) => updateValue(i, Number.parseFloat(e.target.value))}
					/>
				</div>
			))}
		</div>
	);
}
