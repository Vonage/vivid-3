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
	formats: {
		'vvd/css/variables-with-typography': async ({ dictionary, options = {}, file }) => {
			const selector = Array.isArray(options.selector)
				? options.selector
				: options.selector
				? [options.selector]
				: [':root'];

			const header = await fileHeader({ file, options });
			const indentation = options.formatting?.indentation || '  ';

			const serializeReference = (value: any): string => {
				if (typeof value === 'string') {
					return value.replace(/{([^}]+)}/g, (_match, tokenPath) => `var(--${tokenPath.replace(/\//g, '-')})`);
				}
				if (typeof value === 'number') {
					return String(value);
				}
				if (value == null) {
					return '';
				}
				if (typeof value === 'object') {
					if ('$value' in value) return serializeReference(value.$value);
					if ('value' in value) return serializeReference(value.value);
					return String(value);
				}
				return String(value);
			};

			const serializeTypography = (value: any): string => {
				const fontFamily = serializeReference(value.fontFamily);
				const fontSize = serializeReference(value.fontSize);
				const lineHeight = serializeReference(value.lineHeight);
				const fontWeight = serializeReference(value.fontWeight ?? '');

				return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`.trim();
			};

			const content = dictionary.allTokens
				.map((token) => {
					const value = options.usesDtcg ? token.$value : token.value;

					const formattedValue =
						typeof value === 'object' &&
						value !== null &&
						'fontFamily' in value &&
						'fontSize' in value &&
						'lineHeight' in value
							? serializeTypography(value)
							: serializeReference(value);

					if (typeof formattedValue !== 'string' || formattedValue === '') {
						return undefined;
					}

					const comment = token.$description ?? token.comment;
					let line = `${indentation}--${token.name}: ${formattedValue};`;
					if (comment) {
						line += ` /** ${comment} */`;
					}
					return line;
				})
				.filter(Boolean)
				.join('\n');

			const nestInSelector = (content: string, selector: string, indentation: string) =>
				`${indentation}${selector} {\n${content}\n${indentation}}`;

			return (
				header +
				selector
					.reverse()
					.reduce((content, currentSelector, index) =>
						nestInSelector(
							content,
							currentSelector,
							indentation.repeat(selector.length - 1 - index),
						),
					content) +
				'\n'
			);
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
		'vvd/value/css/fontFamily': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'fontFamily',
			transform(token) {
				return token.$value;
			},
		},
		'vvd/value/css/typography': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => {
				const source = token.$value ?? token.value;
				return (
					source &&
					typeof source === 'object' &&
					'fontFamily' in source &&
					'fontSize' in source &&
					'lineHeight' in source
				);
			},
			transform(token) {
				const resolve = (value: any): string => {
					if (typeof value === 'string') return value;
					if (typeof value === 'number') return String(value);
					if (value == null) return '';
					if (typeof value === 'object') {
						if ('$value' in value) return resolve(value.$value);
						if ('value' in value) return resolve(value.value);
					}
					return String(value);
				};

				const source = token.$value ?? token.value;
				const fontFamily = resolve(source.fontFamily);
				const fontSize = resolve(source.fontSize);
				const lineHeight = resolve(source.lineHeight);
				const fontWeight = resolve(source.fontWeight);

				return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
			},
		},
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
	basePxFontSize: 16,
	transforms: [
		'vvd/value/css/color',
		'vvd/name/css',
		'vvd/value/css/dimension',
		'vvd/value/css/fontFamily',
		'vvd/value/css/typography',
		'vvd/value/css/shadow',
		'size/pxToRem',
		'vvd/value/css/roundRems',
	],
	buildPath: './dist/',
	files: [
		{
			destination: 'core-color.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('color') && token.filePath.includes('core'),
		},
		{
			destination: 'semantic-color.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('color') && token.filePath.includes('semantic'),
		},
		{
			destination: 'pattern-color.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('color') && token.filePath.includes('pattern'),
		},
		{
			destination: 'core-border.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('core') && token.filePath.includes('border'),
		},
		{
			destination: 'core-space.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('core') && token.filePath.includes('space'),
		},
		{
			destination: 'core-text.css',
			format: 'css/variables',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('core') && (token.filePath.includes('text') || token.filePath.includes('font-family')),
		},
		{
			destination: 'semantic-text.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.filePath.includes('text') && token.filePath.includes('semantic'),
		},
	],
	actions: ['vvd/css/createIndex', 'vvd/css/addFontsLinks'],
};
