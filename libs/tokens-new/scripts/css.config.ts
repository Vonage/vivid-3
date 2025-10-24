import type { Hooks, PlatformConfig } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';

const hexify = (num: number) => {
	return Math.round(num * 255)
		.toString(16)
		.padStart(2, '0');
};

interface ColorValue {
	colorSpace: string;
	components: [number, number, number];
	alpha: number;
	hex: string;
}

function getHex(token: ColorValue) {
	const [r, g, b] = token.components;
	const a = token.alpha;
	return `#${hexify(r)}${hexify(g)}${hexify(b)}${hexify(a)}`;
}

export const cssConfig: Hooks = {
	actions: {
		'vvd/css/createIndex': {
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
		'vvd/value/css/dimension': {
			type: 'value',
			filter: (token) => token.$type === 'dimension',
			transform(token) {
				return `${token.$value.value}px`;
			},
		},
		'vvd/value/css/typography': {
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
		'vvd/value/css/shadow': {
			type: 'value',
			filter: (token) => token.$type === 'shadow',
			transform(token) {
				return token.$value
					.map(
						(stop: any) =>
							`${stop.offsetX}px ${stop.offsetY}px ${stop.blur} ${stop.spread} ${getHex(stop.color)}`,
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
	actions: ['vvd/css/createIndex'],
};
