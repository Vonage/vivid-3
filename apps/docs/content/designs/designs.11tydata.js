const tsx = require('tsx/cjs/api');
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unregister = tsx.register();

const {
	styleDictionary,
} = require('../../../../libs/design-tokens/scripts/style-dictionary');

async function getTokens() {
	let styleDictionaryInstance = await styleDictionary.init();
	const tokenBase = path.resolve(__dirname, '../../../../libs/design-tokens/src');
	styleDictionaryInstance = await styleDictionaryInstance.extend({
		source: [
			`${tokenBase}/global/**/*.dtcg.json`,
			`${tokenBase}/theme/light/**/*.dtcg.json`,
		],
	});

	const cssTokens = await styleDictionaryInstance.getPlatformTokens('css');
	const flutterTokens =
		await styleDictionaryInstance.getPlatformTokens('flutter');

	const output = {};

	const elements = ['bg', 'fill', 'surface', 'text', 'border'];
	const roles = [
		'neutral',
		'primary',
		'announcement',
		'info',
		'success',
		'warning',
		'danger',
		'inverse',
	];
	const prominences = ['strong', 'subtle', 'secondary', 'tertiary'];
	const states = ['hover', 'active', 'selected', 'disabled', 'error', 'valid'];
	const scales = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

	for (const tokenName of styleDictionaryInstance.tokenMap.keys()) {
		const cssToken = cssTokens.tokenMap.get(tokenName);
		const flutterToken = flutterTokens.tokenMap.get(tokenName);
		const cleanName = tokenName.replace(/[{}]/gm, '').replace(/\.DEFAULT/g, '');
		const nameArr = cleanName.split('.');
		const element = nameArr.filter((part) => elements.includes(part)).join('-');
		const role = nameArr.filter((part) => roles.includes(part)).join('-');
		const prominence = nameArr
			.filter((part) => prominences.includes(part))
			.join('-');
		const state = nameArr.filter((part) => states.includes(part)).join('-');
		const foundScale = nameArr.find((part) => scales.includes(part));
		const scale = foundScale || nameArr[2];
		const category = nameArr[0];
		const semantic = nameArr[1];
		const subGroup =
			nameArr[2] !== scale
				? nameArr[2]
				: category === 'control' && foundScale && nameArr.length > 3
					? nameArr[2]
					: null;

		const originalValue = cssToken.original?.$value;
		const reference =
			typeof originalValue === 'string' && originalValue.startsWith('{')
				? originalValue
				: undefined;

		const entry = {
			name: cleanName,
			category,
			tokenType: cssToken.$extensions?.tokenType,
			element,
			role,
			prominence,
			state,
			semantic,
			scale,
			description: cssToken.$description ?? '',
			type: cssToken.$type,
			css: cssToken.name,
			flutter: flutterToken.name,
			preview: cssToken.$value.hex || cssToken.$value,
			reference,
		};

		const categoryGroup = (output[category] ??= {});
		const semanticGroup = (categoryGroup[semantic] ??= []);

		semanticGroup.push(entry);
		if (cssToken.$type === 'typography') {
			semanticGroup[nameArr[nameArr.length - 1]] = entry;
		} else if (scale && isNaN(Number(scale)) && subGroup !== scale) {
			semanticGroup[scale] = entry;
		}
		if (subGroup) {
			const subArray = (semanticGroup[subGroup] ??= []);
			subArray.push(entry);
			if (scale) subArray[nameArr[nameArr.length - 1]] = entry;
		}
	}

	return output;
}

module.exports = async function () {
	const tokens = await getTokens();

	return {
		layout: 'article.njk',
		parent: 'Design Tokens',
		tokens,
	};
};
