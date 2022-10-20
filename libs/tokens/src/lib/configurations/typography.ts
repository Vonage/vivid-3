import { prefix, buildPath } from './common/config';

export const getTypographyConfig = (viewport: string) => ({
	source: [
		// `../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}/semantic-scale.tokens.json`,
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}/scale.tokens.json`,
		// `../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}/font.tokens.json`,
	],
	platforms: {
		// cssTypography: {
		// 	transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath', 'font/shorthand', 'referenceFontFamilies'],
		// 	prefix,
		// 	buildPath,
		// 	files: [{
		// 		destination: `typography/${viewport}/_scale.mixin.scss`,
		// 		format: 'css/variables',
		// 		filter: token => token.type === 'typography',
		// 		options: {
		// 			selector: '@mixin variables'
		// 		}
		// 	}]
		// },
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'size/px'],
			prefix,
			buildPath,
			files: [{
				destination: `typography/${viewport}/_font-family.mixin.scss`,
				format: 'css/variables',
				filter: token => token.access === "public",
				options: {
					selector: '@mixin variables'
				}
			}]
		}
	}
});
