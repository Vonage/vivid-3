import {
	Hct,
	argbFromHex,
	hexFromArgb,
} from '@material/material-color-utilities';
import { addDegrees } from '@shared/add-degrees.util';
import { argbContrastRatio } from '@shared/argb-contrast-ratio.util';
import { solveToneForContrast } from '@shared/solve-tone-for-contrast.util';
import { equalBetween } from '@shared/steps.util';

export interface TunedColorScaleContextContext {
	name: string;
	baseColor: string;
	steps: number[];
	contrastTargets: number[];
	isDarkMode: boolean;
	hueOverrides?: number[];
	chromaOverrides?: number[];
	hueMaxOverride: number;
	chromaMaxOverride: number;
}

export interface Swatch {
	hex: string;
	name: string;
	baseHct: Hct;
	finalHct: Hct;
	hueOverride: number;
	chromaOverride: number;
	contrast: number;
}

const defaultContext: TunedColorScaleContextContext = {
	name: 'unknown',
	baseColor: '#ffffff',
	isDarkMode: false,
	steps: [9, 16, 23, 30, 37, 44, 52, 59, 66, 73, 80, 87, 94],
	// contrastTargets: [1.26, 1, 1.9, 2.38, 3.03, 3.9, 5.1, 6.69, 8.72, 11.37, 14.35, 17.22, 20.03], // Leo Lightness
	// contrastTargets: [1.24, 1.49, 1.89, 2.42, 3.08, 4.05, 5.43, 7.06, 9.41, 12.31, 14.78, 17.48], // Current Contrasts
	// contrastTargets: [1.26, 2.82, 4.39, 5.95, 7.52, 9.08, 10.65, 12.21, 13.77, 15.34, 16.9, 18.47, 20.03], // Leo Contrasts
	contrastTargets: [
		1.3, 1.54, 1.88, 2.3, 2.85, 3.54, 4.48, 5.74, 7.34, 9.29, 11.73, 14.55,
		17.22,
	],
	hueMaxOverride: 90,
	chromaMaxOverride: 80,
};

export function getTunedColorScale(
	context: Partial<TunedColorScaleContextContext>
) {
	const ctx: TunedColorScaleContextContext = {
		...defaultContext,
		...context,
	};

	const base = Hct.fromInt(argbFromHex(ctx.baseColor));

	const outputSteps: Swatch[] = [];

	let index = 0;

	for (const currentStep of ctx.steps) {
		const step = ctx.isDarkMode
			? currentStep
			: ctx.steps[ctx.steps.length - 1 - index];
		const contrastTarget = ctx.contrastTargets[index];
		// const step = (ctx.isDarkMode ? currentStep : 100 - currentStep)

		let finalHue = base.hue;
		let finalChroma = base.chroma;
		let hueOverriveValue = 0;
		let chromaOverrideValue = 0;

		if (ctx.hueOverrides && ctx.hueOverrides[index]) {
			hueOverriveValue = (ctx.hueOverrides[index] * ctx.hueMaxOverride) / 50;
		}

		if (ctx.chromaOverrides && ctx.chromaOverrides[index]) {
			chromaOverrideValue =
				(ctx.chromaOverrides[index] * ctx.chromaMaxOverride) / 50;
		}
		finalHue = addDegrees(base.hue, hueOverriveValue);
		finalChroma = base.chroma + chromaOverrideValue;

		let finalHct = Hct.from(finalHue, finalChroma, step);

		if (outputSteps[0]) {
			const contrastingColor = solveToneForContrast(
				finalHct.toInt(),
				outputSteps[0].finalHct.toInt(),
				contrastTarget,
				0.1,
				100
			);
			finalHct = Hct.fromInt(contrastingColor);
		}

		const contrast = outputSteps[0]
			? argbContrastRatio(finalHct.toInt(), outputSteps[0].finalHct.toInt())
			: 1;

		outputSteps.push({
			hex: hexFromArgb(finalHct.toInt()),
			baseHct: Hct.from(base.hue, base.chroma, step),
			finalHct,
			name: `vvd/color/${ctx.name}/${(index + 1) * 100}`,
			hueOverride: hueOverriveValue,
			chromaOverride: chromaOverrideValue,
			contrast,
		});

		index++;
	}

	return outputSteps;
}
