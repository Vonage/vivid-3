const hexify = (num: number) => {
	if (typeof num !== 'number')
		throw new Error('Provided value is not a number.');
	if (num > 1) num = Math.max(num, 1);

	return Math.round(num * 255)
		.toString(16)
		.padStart(2, '0');
};

export const rgbaToHexa = (rgba: RGBA) => {
	if (!rgba) throw new Error('Input object is undefined or null.');

	return (
		'#' +
		hexify(rgba.r) +
		hexify(rgba.g) +
		hexify(rgba.b) +
		(rgba.a && rgba.a < 1 ? hexify(rgba.a) : '')
	);
};
