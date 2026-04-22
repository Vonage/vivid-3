export interface ColorValue {
	colorSpace: string;
	components: [number, number, number];
	alpha: number;
	hex: string;
}

const hexify = (num: number) => {
	return Math.round(num * 255)
		.toString(16)
		.padStart(2, '0');
};

export function getHex(token: ColorValue) {
	const [r, g, b] = token.components;
	const hex = `#${hexify(r)}${hexify(g)}${hexify(b)}`;
	if (token.alpha === 1) return hex;	
	const a = token.alpha;
	return `${hex}${hexify(a)}`;
}