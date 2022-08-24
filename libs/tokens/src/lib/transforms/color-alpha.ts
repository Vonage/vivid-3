const Color = require('tinycolor2');


const transformer = ({ value }) => {
	if (value.startsWith('rgba')) {
		const start = value.indexOf('(') + 1;
		const end = value.indexOf(')') + 1;
		const rgb = Color(value.slice(start, end));
		const alpha = Number(value.slice(end + 1, -1));
		rgb.setAlpha(alpha);
		return rgb.toRgbString();
	} else {
		return value;
	}
};

module.exports = {
	type: `value`,
	name: `color/alpha`,
	transitive: true,
	matcher: (token) => token.attributes.category === 'color'
		&& token.type === 'colorAlpha',
	transformer
};
