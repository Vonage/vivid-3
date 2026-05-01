const tsx = require('tsx/cjs/api');
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unregister = tsx.register();

const {
	styleDictionary,
} = require('../../../../libs/design-tokens/scripts/style-dictionary');

async function getTokens() {
	let styleDictionaryInstance = await styleDictionary.init();
	// Use absolute path to avoid working directory issues
	const designTokensPath = path.resolve(__dirname, '../../../../libs/design-tokens/src/*/*/*.dtcg.json');
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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_prefix, category, semantic, scale] = cleanName.split('/');

		const entry = {
			name: cleanName,
			category,
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
}

module.exports = async function () {
	const tokens = await getTokens();

	return {
		layout: 'article.njk',
		parent: 'Foundations',
		order: 2.5,
		tokens,
	};
};
