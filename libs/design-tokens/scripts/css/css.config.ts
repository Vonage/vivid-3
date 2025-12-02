import type { Hooks, PlatformConfig } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { getHex } from '../utils/hexify.util';

export const fontFaceDeclaration = `@font-face {
\tfont-display: block;
\tfont-family: SpeziaCompleteVariableUpright;
\tfont-stretch: 50% 200%;
\tfont-weight: 1 1000;
\tsrc: url('https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2')
\t\tformat('woff2');
}

@font-face {
\tfont-display: block;
\tfont-family: SpeziaMonoCompleteVariable;
\tfont-stretch: 50% 200%;
\tfont-weight: 1 1000;
\tsrc: url('https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2')
\t\tformat('woff2');
}`;

export const cssConfig: Hooks = {
	actions: {
		'vvd/css/addFontsLinks': {
			do(_dictionary, platform, _options, volume): void {
				const files = platform.files.filter((file) =>
					file.destination.includes('typography')
				);

				for (const file of files) {
					const content = volume.readFileSync(
						`${platform.buildPath}/${file.destination}`,
						'utf-8'
					) as string;

					const updatedContent = content.replace(
						platform.options.selector,
						`${fontFaceDeclaration}\n\n${platform.options.selector}`
					);

					volume.writeFileSync(
						`${platform.buildPath}/${file.destination}`,
						updatedContent
					);
				}
			},
			undo(_dictionary, platform, _options, volume) {
				const files = platform.files.filter((file) =>
					file.destination.includes('typography')
				);

				for (const file of files) {
					const content = volume.readFileSync(
						`${platform.buildPath}/${file.destination}`,
						'utf-8'
					) as string;

					const updatedContent = content.replace(
						`${fontFaceDeclaration}\n\n${platform.options.selector}`,
						platform.options.selector
					);

					volume.writeFileSync(
						`${platform.buildPath}/${file.destination}`,
						updatedContent
					);
				}
			},
		},
		'vvd/css/createIndex': {
			async do(_dictionary, platform, options, volume): Promise<void> {
				let out = await fileHeader({ options });
				out += platform.files
					.map((file) => `@import '${file.destination}';`)
					.join('\n');

				volume.writeFileSync(`${platform.buildPath}/index.css`, out);
			},
			undo(_dictionary, platform, _options, volume): void {
				/* v8 ignore else -- @preserve */
				if (volume.existsSync(`${platform.buildPath}/index.css`)) {
					volume.unlinkSync(`${platform.buildPath}/index.css`);
				}
			},
		},
	},
	transforms: {
		'vvd/value/css/color': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'color',
			transform(token) {
				return getHex(token.$value);
			},
		},
		'vvd/value/css/dimension': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'dimension',
			transform(token) {
				return `${token.$value.value}px`;
			},
		},
		// 'vvd/value/css/typography': {
		// 	type: 'value',
		// 	/* v8 ignore next -- @preserve */
		// 	filter: (token) => token.$type === 'typography',
		// 	transform(token, platform) {
		// 		const fontSize = `${
		// 			token.$value.fontSize.value / platform.basePxFontSize
		// 		}rem`;
		// 		const lineHeight = `${
		// 			token.$value.lineHeight / platform.basePxFontSize
		// 		}rem`;
		// 		const fontFamily = token.$value.fontFamily
		// 			.toLocaleLowerCase()
		// 			.includes('mono')
		// 			? 'SpeziaMonoCompleteVariable'
		// 			: 'SpeziaCompleteVariableUpright';
		// 		return `${token.$value.fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
		// 	},
		// },
		'vvd/value/css/shadow': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'shadow',
			transform(token) {
				return token.$value
					.map(
						(stop: any) =>
							`${stop.offsetX}px ${stop.offsetY}px ${stop.blur}px ${
								stop.spread
							}px ${getHex(stop.color)}`
					)
					.join(', ');
			},
		},
		'vvd/value/css/roundRems': {
			type: 'value',
			transform(token) {
				if (typeof token.$value !== 'string') return;
				return token.$value.replace(/(\d+[.|,]\d+)rem/gm, (_, value) => {
					return `${String(Math.round(Number(value) * 100) / 100)}rem`;
				});
			},
		},
		'vvd/name/css': {
			type: 'name',
			transform(token) {
				return token.name.replace(/\//g, '-');
			},
		},
	},
};

export const cssPlatform: PlatformConfig = {
	options: {
		selector: '.vvd-root, ::part(vvd-root)',
	},
	basePxFontSize: 14,
	transforms: [
		'vvd/value/css/color',
		'vvd/name/css',
		'vvd/value/css/dimension',
		'vvd/value/css/shadow',
		'vvd/value/css/typography',
		'size/pxToRem',
		'vvd/value/css/roundRems',
	],
	buildPath: './dist/',
	files: [
		{
			destination: 'color-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('color'),
		},
		{
			destination: 'density-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('density'),
		},
		{
			destination: 'elevation-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('elevation'),
		},
		{
			destination: 'radius-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('radius'),
		},
		{
			destination: 'size-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('size'),
		},
		{
			destination: 'typography-default.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('typography'),
		},
	],
	actions: ['vvd/css/createIndex', 'vvd/css/addFontsLinks'],
};
