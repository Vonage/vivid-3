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
		const category = nameArr[1];
		const semantic = nameArr[2];
		const scale = nameArr[3];

		const entry = {
			name: cleanName,
			category,
			tokenType: cssToken.docs?.tokenType,
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
		};

		const categoryGroup = (output[category] ??= {});
		const semanticGroup = (categoryGroup[semantic] ??= []);

		semanticGroup.push(entry);
	}

	return output;
};

unregister();
