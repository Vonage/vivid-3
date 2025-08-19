export const escapeStringInCssSelector = (string: string) => {
	// For CSS attribute selectors, we need to escape special characters
	// Escape backslashes first, then quotes
	return string
		.replace(/\\/g, '\\\\') // Escape backslashes
		.replace(/"/g, '\\"') // Escape double quotes
		.replace(/'/g, "\\'"); // Escape single quotes
};

export const attributeSelector = (
	componentName: string,
	attributes: Array<[string, string]>
) => {
	return attributes
		.map(
			([attr, value]) =>
				`[data-vvd-component="${componentName}"][${attr}="${escapeStringInCssSelector(
					value
				)}"]`
		)
		.join(',');
};
