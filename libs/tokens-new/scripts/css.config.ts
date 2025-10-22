import type { Hooks, PlatformConfig } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';

export const cssConfig: Hooks = {
	actions: {
		'vvd/createIndex': {
			do: async function (_, platform, options, volume) {
				let out = await fileHeader({ options });
				out += platform.files
					.map((file) => `@import '${file.destination}';`)
					.join('\n');

				volume.writeFileSync(`${platform.buildPath}index.css`, out);
			},
			undo(_, platform, options, volume): void | Promise<void> {
				if (volume.existsSync(`${platform.buildPath}index.css`)) {
					volume.unlinkSync(`${platform.buildPath}index.css`);
				}
			},
		},
	},
	transforms: {
		'vvd/css/value/dimension': {
			type: 'value',
			filter: (token) => token.$type === 'dimension',
			transform(token) {
				return `${token.$value.value}px`;
			},
		},
		'vvd/css/value/typography': {
			type: 'value',
			filter: (token) => token.$type === 'typography',
			transform(token, platform) {
				const fontSize = `${
					token.$value.fontSize.value / platform.basePxFontSize
				}rem`;
				const lineHeight = `${
					token.$value.lineHeight / platform.basePxFontSize
				}rem`;
				return `${token.$value.fontWeight} ${fontSize}/${lineHeight} "${token.$value.fontFamily}"`;
			},
		},
		'vvd/css/value/shadow': {
			type: 'value',
			filter: (token) => token.$type === 'shadow',
			transform(token) {
				return token.$value
					.map(
						(stop: any) =>
							`${stop.offsetX}px ${stop.offsetY}px ${stop.blur} ${stop.spread} ${stop.color}`
					)
					.join(', ');
			},
		},
		'vvd/css/value/roundRems': {
			type: 'value',
			transform(token) {
				if (typeof token.$value !== 'string') return;
				return token.$value.replace(/(\d+[.|,]\d+)rem/gm, (_, value) => {
					return `${String(Math.round(Number(value) * 100) / 100)}rem`;
				});
			},
		},
		'vvd/css/name': {
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
		'vvd/css/name',
		'vvd/css/value/dimension',
		'vvd/css/value/shadow', // 'shadow/css/shorthand' - // Format mismatch, as StyleDictionary uses WIP format version
		'vvd/css/value/typography', //'typography/css/shorthand' - // Format mismatch, as StyleDictionary uses WIP format version
		'size/pxToRem',
		'vvd/css/value/roundRems',
	],
	buildPath: './dist/',
	files: [
		{
			destination: 'density-default.css',
			format: 'css/variables',
			filter: (token) => token.filePath.includes('density'),
		},
		{
			destination: 'elevation-default.css',
			format: 'css/variables',
			filter: (token) => token.filePath.includes('elevation'),
		},
		{
			destination: 'radius-default.css',
			format: 'css/variables',
			filter: (token) => token.filePath.includes('radius'),
		},
		{
			destination: 'size-default.css',
			format: 'css/variables',
			filter: (token) => token.filePath.includes('size'),
		},
		{
			destination: 'typography-default.css',
			format: 'css/variables',
			filter: (token) => token.filePath.includes('typography'),
		},
	],
	actions: ['vvd/createIndex'],
};
