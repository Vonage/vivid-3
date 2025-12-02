import type { Hooks, PlatformConfig, TransformedToken } from 'style-dictionary/types';
import { type ColorValue, getHex } from '../utils/hexify.util';
import { fileHeader } from 'style-dictionary/utils';

function double(value: string | number) {
	return String(parseFloat(String(value)).toFixed(2));
}

function color(token: ColorValue) {
	const str = getHex(token).toUpperCase();
	return `Color(0x${str.slice(6)}${str.slice(1, 6)})`;
}

export const flutterConfig: Hooks = {
	actions: {
		'vvd/flutter/createPackage': {
			do(_dictionary, platform, file, volume) {
				volume.cpSync('./files/', platform.buildPath, { recursive: true } as any);
			},
			undo(_dictionary, platform, _config, volume) {
				volume.unlinkSync(platform.buildPath);
			},
		},
	},
	formats: {
		'vvd/flutter/variables': async ({ dictionary, file, options }) => {
			const header = await fileHeader({ file, options });

			const variables = Array.from(dictionary.tokenMap.values()).map(
				(token: TransformedToken) => `const ${token.name} = ${token.$value};`,
			);

			return `${header}import 'package:flutter/painting.dart';\n\n${variables.join('\n')}`;
		},
	},
	transforms: {
		'vvd/value/flutter/borderRadius': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) =>
				token.$type === 'dimension' && token.name.includes('radius'),
			transform(token) {
				return `Radius.circular(${double(token.$value)})`;
			},
		},
		'vvd/value/flutter/color': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'color',
			transform: function (token) {
				return color(token.$value);
			},
		},
		'vvd/value/flutter/dimension': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'dimension',
			transform(token) {
				return double(token.$value.value);
			},
		},
		'vvd/value/flutter/typography': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'typography',
			transform(token) {
				const fontFamily = token.$value.fontFamily
					.toLowerCase()
					.includes('mono')
					? 'SpeziaMono'
					: 'Spezia';
				const fontSize = double(token.$value.fontSize.value);
				const lineHeight = double(
					parseFloat(token.$value.lineHeight) /
						parseFloat(token.$value.fontSize.value),
				);
				const fontWeight = token.$value.fontWeight;
				const fontWidth = token.$value.fontFamily.toLowerCase().includes('wide')
					? '75'
					: '50';

				return `TextStyle(
			fontFamily: ${fontFamily},
			fontSize: ${fontSize},
    	height: ${lineHeight},
    	letterSpacing: 0.0,
			fontVariations: [
				FontVariation('wght', ${fontWeight}.0),
				FontVariation('wdth', ${fontWidth}.0),
			],
		)`;
			},
		},
		'vvd/value/flutter/shadow': {
			type: 'value',
			/* v8 ignore next -- @preserve */
			filter: (token) => token.$type === 'shadow',
			transform(token) {
				const stops = token.$value.map((stop: any) => {
					return `			BoxShadow(
					color: ${color(stop.color)},
					offset: Offset(${double(stop.offsetX)}, ${double(stop.offsetY)}),
					blurRadius: ${double(stop.blur)},
					spreadRadius: ${double(stop.spread)},
			)`;
				});
				return `<BoxShadow>[\n${stops.join(',\n')}\n    ]`;
			},
		},
		'vvd/name/flutter': {
			type: 'name',
			transform(token) {
				return token.name.replace(/([-_\/][a-z0-9])/g, ($1) =>
					$1.toUpperCase().replace('-', '').replace('_', '').replace('/', ''),
				);
			},
		},
	},
};

export const flutterPlatform: PlatformConfig = {
	basePxFontSize: 14,
	transforms: [
		'vvd/value/flutter/color',
		'vvd/name/flutter',
		'vvd/value/flutter/dimension',
		'vvd/value/flutter/typography',
		'vvd/value/flutter/borderRadius',
		'vvd/value/flutter/shadow',
	],
	buildPath: './flutter-dist',
	files: [
		{
			destination: 'lib/vivid-design-tokens.dart',
			format: 'vvd/flutter/variables',
			// TODO: Remove this filter after font licensing is sorted out and typography tokens are rolled out.
			filter: (token) => !token.filePath.includes('typography'),
			options: {
				className: 'VvdTokens',
			},
		},
	],
	actions: ['vvd/flutter/createPackage'],
};
