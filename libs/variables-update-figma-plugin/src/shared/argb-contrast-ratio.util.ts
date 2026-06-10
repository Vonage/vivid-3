export const srgbToLinear = (color: number) => {
	const cs = color / 255;
	return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
};

export const argbRelativeLuminance = (argb: number) => {
	const r = (argb >> 16) & 0xff;
	const g = (argb >> 8) & 0xff;
	const b = argb & 0xff;
	const R = srgbToLinear(r);
	const G = srgbToLinear(g);
	const B = srgbToLinear(b);
	return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export const argbContrastRatio = (argb: number, refArgb: number) => {
	const L1 = argbRelativeLuminance(argb);
	const L2 = argbRelativeLuminance(refArgb);
	const [light, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
	return (light + 0.05) / (dark + 0.05);
};
