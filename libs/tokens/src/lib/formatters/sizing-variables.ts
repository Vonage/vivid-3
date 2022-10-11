module.exports = {
	name: 'sizingVariables',
	formatter({ dictionary }) {
		return dictionary.allProperties.map((token) => {
			token.original.value = token.original.value= 'var()';
			if (token.attributes.type === 'expanded') {
				console.log(token)
			}
			return `$${token.name}: calc(${token.value});`
		}).join('\n');
	}
};
