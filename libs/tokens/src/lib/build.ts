
const StyleDictionary = require('style-dictionary');
import { resolveMath } from './transforms/resolve-math';

const isColor = token => token.type === 'color';
const isTypography = token => ['typography'].includes(token.type);
const isSizing = token => ['sizing'].includes(token.type) ;
const isFontSize = token => ['fontSizes'].includes(token.type);

const fontWeightMap = {
	'Wide Medium': '500 condensed',
	'Regular': '400 ultra-condensed',
	'SemiBold': '600 ultra-condensed'
};

/**
 * Helper: Transforms typography object to typography shorthand
 * This currently works fine if every value uses an alias, but if any one of these use a raw value, it will not be transformed.
 * If you'd like to output all typography values, you'd rather need to return the typography properties itself
 */
const transformTypography = ({ fontWeight, fontSize, lineHeight, fontFamily }) =>
	`${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;

/**
 * Transform typography shorthands for css variables
 */
StyleDictionary.registerTransform({
  name: "typography/shorthand",
  type: "value",
  transitive: true,
  matcher: (token) => token.type === "typography",
  transformer: (token) => transformTypography(token.original.value),
});

StyleDictionary
.registerTransform(resolveMath);

StyleDictionary
	.registerTransform({
		type: 'value',
		name: 'type/fontWeight',
		transitive: true,
		matcher: token => token.type === 'fontWeights',
		transformer: ({ value }) => fontWeightMap[value]
	});

// StyleDictionary
// 	.registerTransform({
// 		type: 'value',
// 		name: 'size/px',
// 		transitive: true,
//     matcher: isSizing,
// 		transformer: function (token) {
// 			console.log(token)
//       const val = parseFloat(token.value);
//       return val + 'px';
//     }
// 	});

StyleDictionary
	.registerTransform({
		type: 'value',
		name: 'type/fontSize',
		transitive: true,
    matcher: isFontSize,
		transformer: function (token) {
			return `calc(${token.value})`
    }
	});

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const pairCssUnitToSizing = token => token.type === 'sizing' ? token.value = `${token.value}px` : token.value;

StyleDictionary.registerFormat({
  name: 'css/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences, selector = ':root' } = options;

		const exposeThemeables = token => {

			const findAndReplaceReferences = (parent, value) => {
				if (dictionary.usesReference(parent)) {
					const refs = dictionary.getReferences(parent);
					refs.forEach(ref => {
						if (ref.public) {
							value = value.replace(ref.value, `var(--${ref.name})`);
						} else {
							value = findAndReplaceReferences(ref, value);
						}
					});
				}

				return value;
			};

			// if (dictionary.usesReference(token)) {
			// 	const refs = dictionary.getReferences(token);
			// 	refs.forEach(ref => {
			// 		if (ref.public) {
			// 			token.value = token.value.replace(ref.value, `var(--${ref.name})`);
			// 		} else {
			// 			const refs = dictionary.getReferences(ref);
			// 			refs.forEach(ref => {
			// 				if (ref.public) {
			// 					token.value = token.value.replace(ref.value, `var(--${ref.name})`)
			// 				}
			// 			});
			// 		}
			// 	});
			// }

			token.value = findAndReplaceReferences(token, token.value);

			return token;
		};

		dictionary.allTokens
			.map(exposeThemeables)
			.map(pairCssUnitToSizing)

		return fileHeader({file}) +
			`${selector} {\n` +
			formattedVariables({
				outputReferences,
				format: 'css',
				dictionary,
			}) +
			'\n}\n';
	}
});

export const config = {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/**/*.tokens.json'
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath', 'type/fontWeight', 'type/fontSize', 'typography/shorthand'],
			prefix: 'vvd',
			buildPath: '../../../../dist/libs/tokens/scss/',
			files: [{
				destination: '_variables.mixin.scss',
				format: "css/themeableVariables",
				filter: token => isTypography(token) || token.public,
				options: {
					selector: '@mixin variables',
					// outputReferences: true
				}
			}]
		}
	}
};

StyleDictionary
	.extend(config)
	.buildAllPlatforms();
