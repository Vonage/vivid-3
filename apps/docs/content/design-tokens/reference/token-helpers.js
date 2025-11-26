const tsx = require('tsx/cjs/api');

const unregister = tsx.register();

const {
	styleDictionary,
} = require('../../../../../libs/design-tokens/scripts/style-dictionary');

module.exports.getTokens = async function (type) {
	let styleDictionaryInstance = await styleDictionary.init();
	styleDictionaryInstance = await styleDictionaryInstance.extend({
		source: ['../../libs/design-tokens/src/*.dtcg.json'],
	});

	const names = Array.from(
		await styleDictionaryInstance.tokenMap.keys()
	).filter((key) => {
		const [_prefix, category, _semantic, _scale] = key
			.replace(/[{}]/gm, '')
			.split('/');
		return category === type;
	});

	if (names.length === 0) {
		return [];
	}

	const cssTokens = await styleDictionaryInstance.getPlatformTokens('css');
	const flutterTokens = await styleDictionaryInstance.getPlatformTokens(
		'flutter'
	);

	return names.map((name) => {
		const cssToken = cssTokens.tokenMap.get(name);
		const flutterToken = flutterTokens.tokenMap.get(name);
		const cleanName = name.replace(/[{}]/gm, '');
		const [_prefix, category, semantic, scale] = cleanName.split('/');

		return {
			name: cleanName,
			category,
			semantic,
			scale,
			description: cssToken.$description ?? '',
			type: cssToken.$type,
			css: cssToken.name,
			flutter: flutterToken.name,
			preview: cssToken.$value,
		};
	});
};

unregister();
