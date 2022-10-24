import type { Named, Transform } from "style-dictionary";


export const referenceSizingBase: Named<Transform> = {
  name: "referenceSizingBase",
  type: "value",
  transitive: true,
	matcher: (token) => token.attributes.type === "base",
  transformer: ({ name }) => `var(--${name})`,
};
