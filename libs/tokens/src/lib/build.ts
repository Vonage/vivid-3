const sourceOnly = require('./filters/source-only');
const StyleDictionary = require('style-dictionary')

	.registerFilter(sourceOnly)
	.extend('config.json');

const { transform } = StyleDictionary;
const { transformer: colorToRGB } = transform['color/rgb'];
const { transformer: sizeToPx } = transform['size/px'];

StyleDictionary.registerTransform({
		type: `value`,
		transitive: true,
		name: `shadow/shorthand`,
		matcher: ({ attributes: { category }}) => category == 'shadow',
		transformer: ({ value }) =>
			value.map((
				{ color, offsetX, offsetY, spread }
			) => `drop-shadow(${colorToRGB(color)} ${sizeToPx({value:offsetX})})`, '').join(' ')
			// const { color, offsetX, offsetY, spread } = value;
			// token.value will be resolved and transformed at this point
			// return 'yoy1o'

	})
const getStyleDictionaryConfig = (theme: string): any => ({
	include: [
		`tokens-from-figma/schemes/${theme}/color-main.tokens.json`,
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/rgb", "shadow/shorthand"],
			prefix: "vvd",
			buildPath: `../../../../dist/libs/tokens/scss/themes/${theme}/`,
			files: [{
				destination: "_main.scss",
				format: "css/variables",
				filter: "sourceOnly"
			}]
		}
	}
});

['light', 'dark'].forEach(theme => {
	StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});

