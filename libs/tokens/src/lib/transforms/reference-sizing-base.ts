module.exports = {
  name: "referenceSizingBase",
  type: "value",
  transitive: true,
	matcher: (token) => token.attributes.type === "base",
  transformer: ({ name }) => `var(--${name})`,
};
