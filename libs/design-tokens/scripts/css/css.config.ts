import type {
	Hooks,
	PlatformConfig,
	TransformedToken,
} from 'style-dictionary/types';
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
		'vvd/css/semantic-shadow': async ({ dictionary, options = {}, file }) => {
			const selector = Array.isArray(options.selector)
				? options.selector
				: options.selector
					? [options.selector]
					: [':root'];

			const header = await fileHeader({ file, options });
			const indentation = options.formatting?.indentation || '  ';

			const refToVar = (ref: string) =>
				`var(--viv-${ref.slice(1, -1).replace(/\./g, '-')})`;

			const lines: string[] = [];

			for (const token of dictionary.allTokens) {
				const stops: any[] = (token.original as any)?.$value ?? [];

				for (let i = 0; i < stops.length; i++) {
					const stop = stops[i];
					const n = i + 1;
					lines.push(
						`${indentation}--${token.name}-${n}-size: ${stop.offsetX}px ${stop.offsetY}px ${stop.blur}px;`
					);
				}

				const dropShadows = stops.map((stop, i) => {
					const n = i + 1;
					const sizeVar = `var(--${token.name}-${n}-size)`;
					const colorVar =
						typeof stop.color === 'string' && stop.color.startsWith('{')
							? refToVar(stop.color)
							: String(stop.color);
					return `drop-shadow(${sizeVar} ${colorVar})`;
				});

				const composite = dropShadows.join(' ');
				const comment = token.$description ?? token.comment;
				let line = `${indentation}--${token.name}: ${composite};`;
				if (comment) line += ` /** ${comment} */`;
				lines.push(line);
			}

			const content = lines.join('\n');

			const nestInSelector = (
				content: string,
				selector: string,
				indentation: string
			) => `${indentation}${selector} {\n${content}\n${indentation}}`;

			return (
				header +
				selector
					.reverse()
					.reduce(
						(content, currentSelector, index) =>
							nestInSelector(
								content,
								currentSelector,
								indentation.repeat(selector.length - 1 - index)
							),
						content
					) +
				'\n'
			);
		},
		'vvd/css/elevation-surface': async ({ dictionary, options = {}, file }) => {
			const selector = Array.isArray(options.selector)
				? options.selector
				: options.selector
					? [options.selector]
					: [':root'];

			const header = await fileHeader({ file, options });
			const indentation = options.formatting?.indentation || '  ';

			const refToVar = (ref: string) =>
				`var(--viv-${ref.slice(1, -1).replace(/\./g, '-')})`;

			const toVar = (val: unknown): string => {
				if (typeof val === 'string' && val.startsWith('{')) return refToVar(val);
				return String(val);
			};

			const content = dictionary.allTokens
				.map((token) => {
					const original = (token.original as any)?.$value;
					if (
						!original ||
						typeof original !== 'object' ||
						!('bg' in original) ||
						!('gradient' in original)
					) {
						return undefined;
					}
					const bgVar = toVar(original.bg);
					const gradientVar = toVar(original.gradient);
					const value = `linear-gradient(${gradientVar}, ${gradientVar}), ${bgVar}`;
					const comment = token.$description ?? token.comment;
					let line = `${indentation}--${token.name}: ${value};`;
					if (comment) line += ` /** ${comment} */`;
					return line;
				})
				.filter(Boolean)
				.join('\n');

			const nestInSelector = (
				content: string,
				selector: string,
				indentation: string
			) => `${indentation}${selector} {\n${content}\n${indentation}}`;

			return (
				header +
				selector
					.reverse()
					.reduce(
						(content, currentSelector, index) =>
							nestInSelector(
								content,
								currentSelector,
								indentation.repeat(selector.length - 1 - index)
							),
						content
					) +
				'\n'
			);
		},
		'vvd/css/semantic-elevation': async ({ dictionary, options = {}, file }) => {
			const selector = Array.isArray(options.selector)
				? options.selector
				: options.selector
					? [options.selector]
					: [':root'];

			const header = await fileHeader({ file, options });
			const indentation = options.formatting?.indentation || '  ';

			const pathToToken = new Map(
				(dictionary.unfilteredAllTokens ?? dictionary.allTokens).map(
					(t) => [t.path.join('.'), t]
				)
			);

			const resolveAsVar = (originalValue: unknown): string | null => {
				if (typeof originalValue !== 'string') return null;
				const match = originalValue.match(/^\{([^}]+)\}$/);
				if (!match) return null;
				const refToken = pathToToken.get(match[1]);
				if (!refToken || refToken.filePath.includes('/core/')) return null;
				const varName =
					'viv-' +
					refToken.path.filter((p: string) => p !== 'DEFAULT').join('-');
				return `var(--${varName})`;
			};

			const serializeRef = (value: any): string => {
				if (typeof value === 'string') {
					return value.replace(
						/{([^}]+)}/g,
						(_match, tokenPath) =>
							`var(--viv-${tokenPath.replace(/\./g, '-')})`
					);
				}
				if (typeof value === 'number') return String(value);
				if (value == null) return '';
				if (typeof value === 'object') {
					if ('$value' in value) return serializeRef(value.$value);
					if ('value' in value) return serializeRef(value.value);
					return String(value);
				}
				return String(value);
			};

			const refToVar = (ref: string) =>
				`var(--viv-${ref.slice(1, -1).replace(/\./g, '-')})`;

			const lines: string[] = [];

			for (const token of dictionary.allTokens) {
				const originalValue = (token.original as any)?.$value;
				const comment = token.$description ?? token.comment;

				if (token.$type === 'shadow') {
					const stops: any[] = originalValue ?? [];
					for (let i = 0; i < stops.length; i++) {
						const stop = stops[i];
						lines.push(
							`${indentation}--${token.name}-${i + 1}-size: ${stop.offsetX}px ${stop.offsetY}px ${stop.blur}px;`
						);
					}
					const composite = stops
						.map((stop, i) => {
							const sizeVar = `var(--${token.name}-${i + 1}-size)`;
							const colorVar =
								typeof stop.color === 'string' && stop.color.startsWith('{')
									? refToVar(stop.color)
									: String(stop.color);
							return `drop-shadow(${sizeVar} ${colorVar})`;
						})
						.join(' ');
					let line = `${indentation}--${token.name}: ${composite};`;
					if (comment) line += ` /** ${comment} */`;
					lines.push(line);
				} else if (
					originalValue &&
					typeof originalValue === 'object' &&
					!Array.isArray(originalValue) &&
					'bg' in originalValue &&
					'gradient' in originalValue
				) {
					const bgVar =
						typeof originalValue.bg === 'string' &&
						originalValue.bg.startsWith('{')
							? refToVar(originalValue.bg)
							: String(originalValue.bg);
					const gradientVar =
						typeof originalValue.gradient === 'string' &&
						originalValue.gradient.startsWith('{')
							? refToVar(originalValue.gradient)
							: String(originalValue.gradient);
					let line = `${indentation}--${token.name}: linear-gradient(${gradientVar}, ${gradientVar}), ${bgVar};`;
					if (comment) line += ` /** ${comment} */`;
					lines.push(line);
				} else {
					const varRef = resolveAsVar(originalValue);
					const value = options.usesDtcg ? token.$value : token.value;
					const formattedValue =
						varRef !== null ? varRef : serializeRef(value);
					if (
						typeof formattedValue !== 'string' ||
						formattedValue === ''
					)
						continue;
					let line = `${indentation}--${token.name}: ${formattedValue};`;
					if (comment) line += ` /** ${comment} */`;
					lines.push(line);
				}
			}

			const content = lines.join('\n');

			const nestInSelector = (
				content: string,
				selector: string,
				indentation: string
			) => `${indentation}${selector} {\n${content}\n${indentation}}`;

			return (
				header +
				selector
					.reverse()
					.reduce(
						(content, currentSelector, index) =>
							nestInSelector(
								content,
								currentSelector,
								indentation.repeat(selector.length - 1 - index)
							),
						content
					) +
				'\n'
			);
		},
		'vvd/css/variables-with-typography': async ({
			dictionary,
			options = {},
			file,
		}) => {
			const selector = Array.isArray(options.selector)
				? options.selector
				: options.selector
					? [options.selector]
					: [':root'];

			const header = await fileHeader({ file, options });
			const indentation = options.formatting?.indentation || '  ';

			const pathToToken = new Map(
				(dictionary.unfilteredAllTokens ?? dictionary.allTokens).map(
					(t) => [t.path.join('.'), t]
				)
			);

			const resolveAsVar = (originalValue: unknown): string | null => {
				if (typeof originalValue !== 'string') return null;
				const match = originalValue.match(/^\{([^}]+)\}$/);
				if (!match) return null;
				const refToken = pathToToken.get(match[1]);
if (!refToken || refToken.filePath.includes('/core/')) return null;
				const varName =
					'viv-' +
					refToken.path.filter((p: string) => p !== 'DEFAULT').join('-');
				return `var(--${varName})`;
			};

			const serializeReference = (value: any): string => {
				if (typeof value === 'string') {
					return value.replace(
						/{([^}]+)}/g,
						(_match, tokenPath) => `var(--viv-${tokenPath.replace(/\./g, '-')})`
					);
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

			const serializeTypography = (
				value: any,
				token: TransformedToken
			): string => {
				const baseName = token.path.filter((p) => p !== 'DEFAULT').join('-');
				const originalValue = (token.original as any)?.$value;

				const hasPerScaleFontWeight = dictionary.allTokens.some(
					(t) => t.name === `viv-${baseName}-font-weight`
				);
				const fontWeight = hasPerScaleFontWeight
					? `var(--viv-${baseName}-font-weight)`
					: serializeReference(originalValue?.fontWeight ?? value.fontWeight);
				const fontSize = `var(--viv-${baseName}-font-size)`;
				const lineHeight = `var(--viv-${baseName}-line-height)`;
				const fontFamily = serializeReference(
					originalValue?.fontFamily ?? value.fontFamily
				);
				const fontStretch = serializeReference(
					originalValue?.fontStretch ?? value.fontStretch
				);

				return `${fontWeight} ${fontStretch} ${fontSize}/${lineHeight} ${fontFamily}`.trim();
			};

			const content = dictionary.allTokens
				.map((token) => {
					const originalValue = (token.original as any)?.$value;
					const varRef = resolveAsVar(originalValue);
					const value = options.usesDtcg ? token.$value : token.value;

					const formattedValue =
						varRef !== null
							? varRef
							: typeof value === 'object' &&
								  value !== null &&
								  'fontFamily' in value &&
								  'fontSize' in value &&
								  'lineHeight' in value
								? serializeTypography(value, token)
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

			const nestInSelector = (
				content: string,
				selector: string,
				indentation: string
			) => `${indentation}${selector} {\n${content}\n${indentation}}`;

			return (
				header +
				selector
					.reverse()
					.reduce(
						(content, currentSelector, index) =>
							nestInSelector(
								content,
								currentSelector,
								indentation.repeat(selector.length - 1 - index)
							),
						content
					) +
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
				return (
					'viv-' + token.path.filter((p: string) => p !== 'DEFAULT').join('-')
				);
			},
		},
	},
};

export type Theme = 'light' | 'dark';

export const createCssPlatform = (theme: Theme): PlatformConfig => ({
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
	],
	buildPath: `./dist/${theme}/`,
	files: [
		{
			destination: 'semantic-color.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('color') && token.filePath.includes('semantic'),
		},
		{
			destination: 'pattern-action-color.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('color') && token.filePath.includes('action'),
		},
		{
			destination: 'pattern-control-color.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('color') && token.filePath.includes('control'),
		},
		{
			destination: 'pattern-control-size.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('size') && token.filePath.includes('control'),
		},
		{
			destination: 'semantic-size.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('semantic') && token.filePath.includes('/size'),
		},
		{
			destination: 'semantic-text.css',
			format: 'vvd/css/variables-with-typography',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('text') &&
				token.filePath.includes('semantic') &&
				!token.filePath.includes('color'),
		},
		{
			destination: 'semantic-elevation.css',
			format: 'vvd/css/semantic-elevation',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.filePath.includes('semantic/elevation') &&
				token.path[0] === 'elevation',
		},
	],
	actions: ['vvd/css/createIndex', 'vvd/css/addFontsLinks'],
});
