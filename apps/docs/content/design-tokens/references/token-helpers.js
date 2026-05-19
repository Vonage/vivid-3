const tsx = require('tsx/cjs/api');
const path = require('path');

const unregister = tsx.register();

const {
	styleDictionary,
} = require('../../../../../libs/design-tokens/scripts/style-dictionary');

const elements = ['bg', 'fill', 'surface', 'text', 'border'];
const roles = ['neutral', 'primary', 'announcement', 'info', 'success', 'warning', 'danger', 'inverse'];
const prominences = ['strong', 'subtle', 'secondary', 'tertiary'];
const states = ['hover', 'active', 'selected', 'disabled', 'error', 'valid'];
const scales = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

module.exports.getTokens = async function () {
	let styleDictionaryInstance = await styleDictionary.init();
	// Use absolute path to avoid working directory issues
	const designTokensPath = path.resolve(__dirname, '../../../../../libs/design-tokens/src/*/*/*.dtcg.json');
	styleDictionaryInstance = await styleDictionaryInstance.extend({
		source: [designTokensPath],
	});

	const cssTokens = await styleDictionaryInstance.getPlatformTokens('css');
	const flutterTokens =
		await styleDictionaryInstance.getPlatformTokens('flutter');

	const output = {};

	for (const tokenName of styleDictionaryInstance.tokenMap.keys()) {
		const cssToken = cssTokens.tokenMap.get(tokenName);
		const flutterToken = flutterTokens.tokenMap.get(tokenName);
		const cleanName = tokenName.replace(/[{}]/gm, '');
		const nameArr = cleanName.split('/');
		const element = nameArr.filter(part => elements.includes(part)).join('-');
		const role = nameArr.filter(part => roles.includes(part)).join('-');
		const prominence = nameArr.filter(part => prominences.includes(part)).join('-');
		const state = nameArr.filter(part => states.includes(part)).join('-');
		const scale = nameArr.find(part => scales.includes(part)) || nameArr[3];
		const subGroup = nameArr[3] !== scale ? nameArr[3] : null;
		const category = nameArr[1];
		const semantic = nameArr[2];

		const originalValue = cssToken.original?.$value;
		const reference = typeof originalValue === 'string' && originalValue.startsWith('{') ? originalValue : undefined;

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
		} else if (scale && isNaN(Number(scale))) {
			semanticGroup[scale] = entry;
		}
		if (subGroup) {
			const subArray = (semanticGroup[subGroup] ??= []);
			subArray.push(entry);
			if (scale) subArray[nameArr[nameArr.length - 1]] = entry;
		}
	}

	return output;
};

unregister();
