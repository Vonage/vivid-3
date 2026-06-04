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
	const alpha = hexify(token.alpha);
	const base = `#${hexify(r)}${hexify(g)}${hexify(b)}`;
	return alpha === 'ff' ? base : `${base}${alpha}`;
}
