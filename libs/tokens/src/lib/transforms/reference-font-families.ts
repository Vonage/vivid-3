import type { Named, Transform } from "style-dictionary";


export const referenceFontFamilies: Named<Transform> = {
  name: "referenceFontFamilies",
  type: "value",
  transitive: true,
	matcher: (token) => {
		// console.log(token);
		return token.type === 'fontFamilies';
		// return ["upright", "monospace"].includes(token.attributes.type)
	},
  transformer: ({ name }) => `var(--${name})`,
};
