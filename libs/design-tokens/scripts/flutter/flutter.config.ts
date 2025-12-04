import type { Hooks, PlatformConfig } from 'style-dictionary/types';
import { type ColorValue, getHex } from '../utils/hexify.util';

function double(value: string | number) {
	return String(parseFloat(String(value)).toFixed(2));
}

function color(token: ColorValue) {
	const str = getHex(token).toUpperCase();
	return `Color(0x${str.slice(6)}${str.slice(1, 6)})`;
}

export const flutterConfig: Hooks = {
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
						parseFloat(token.$value.fontSize.value)
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
				const stops = token.$value.map((stop) => {
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
					$1.toUpperCase().replace('-', '').replace('_', '').replace('/', '')
				);
			},
		},
	},
};

export const flutterPlatform: PlatformConfig = {
	options: {
		selector: '.vvd-root, ::part(vvd-root)',
	},
	basePxFontSize: 14,
	transforms: [
		'vvd/value/flutter/color',
		'vvd/name/flutter',
		'vvd/value/flutter/dimension',
		'vvd/value/flutter/typography',
		'vvd/value/flutter/borderRadius',
		'vvd/value/flutter/shadow',
	],
	buildPath: './flutter-dist/',
	files: [
		{
			destination: 'vivid-design-tokens.dart',
			format: 'flutter/class.dart',
			options: {
				className: 'VvdTokens',
			},
		},
	],
};
