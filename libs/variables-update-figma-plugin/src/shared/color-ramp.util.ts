export const ramp = (...colors: string[]) => {
	const css = colors.map(
		(color) =>
			`background-color: ${color}; color: ${color}; border-radius: 4px; height:30px; width: 30px; line-height: 30px; padding: 0 12px; font-size: 1`
	);
	const placeholders = colors.map((c) => `%cX`).join(' ');

	console.log(placeholders, ...css);
};
