
import StyleDictionary from 'style-dictionary';
import { resolveMath } from './transforms/resolve-math';

const isColor = token => token.type === 'color';
const isTypography = token => ['typography', 'fontFamilies'].includes(token.type);

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
// 		name: 'type/fontFamily',
// 		transitive: true,
// 		matcher: token => token.type === 'fontFamilies',
// 		transformer: token => `var(--${token.name})`
// 	});
const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: 'css/variablesWithReferences',
	formatter: function({dictionary, file, options}) {
		const { selector = ':root' } = options;
		const indentation = '  ';
    return fileHeader({file}) +
			`${selector} {\n` +
			dictionary.allTokens.map(token => {
				// the `dictionary` object now has `usesReference()` and
				// `getReferences()` methods. `usesReference()` will return true if
				// the value has a reference in it. `getReferences()` will return
				// an array of references to the whole tokens so that you can access their
				// names or any other attributes.
				if (token.type === 'typography' && dictionary.usesReference(token.original.value.fontFamily)) {
					// Note: make sure to use `token.original.value` because
					// `token.value` is already resolved at this point.
					const fontFamilyRefs = dictionary.getReferences(token.original.value.fontFamily);
					const { name, value } = fontFamilyRefs.at(-1)
					token.value = token.value.replace(value, `var(--${name})`);
				}
				return `${indentation}--${token.name}: ${token.value};`;
			}).join('\n') + '\n}';
		}
	});

// function ({ dictionary, options }) {
// return `${options.selector} {\n` + dictionary.allTokens.map(token => {
// 	let value = token.value;
// 	// the `dictionary` object now has `usesReference()` and
// 	// `getReferences()` methods. `usesReference()` will return true if
// 	// the value has a reference in it. `getReferences()` will return
// 	// an array of references to the whole tokens so that you can access their
// 	// names or any other attributes.
// 	if (token.type === 'typography' && dictionary.usesReference(token.original.value)) {
// 		// Note: make sure to use `token.original.value` because
// 		// `token.value` is already resolved at this point.
// 		const refs = dictionary.getReferences(token.original.value);
// 		refs.forEach(ref => {
// 			if (ref.type === 'fontFamilies') {
// 				value = value.replace(ref.value, () => `var(--${ref.name})`);
// 			}
// 		});
// 	}
// 	return `--${token.name}: ${value};`
// }).join(`\n`) + `\n}`;
// }

export const config = {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/**/*.tokens.json'
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath', 'type/fontWeight', 'typography/shorthand'],
			prefix: 'vvd',
			buildPath: '../../../../dist/libs/tokens/scss/',
			files: [{
				destination: '_variables.mixin.scss',
				format: "css/variablesWithReferences",
				filter: isTypography,
				options: {
					selector: '@mixin variables',
					// outputReferences: false
				}
			}]
		}
	}
};

StyleDictionary
	.extend(config)
	.buildAllPlatforms();
