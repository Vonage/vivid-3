/**
 * Boost the weight of h1 headings (title of page) in the search index.
 * Remove default weighting for all other headings.
 */
module.exports = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	if (token.tag === 'h1') {
		token.attrSet('data-pagefind-weight', '10');
	} else {
		token.attrSet('data-pagefind-weight', '1');
	}
	return self.renderToken(tokens, idx, options);
};
