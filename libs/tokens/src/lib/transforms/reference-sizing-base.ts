import type { Named, Transform } from "style-dictionary";


export default {
  name: "referenceSizingBase",
  type: "value",
  transitive: true,
	matcher: (token) => token.attributes.type === "base",
  transformer: ({ name }) => `var(--${name})`,
} as Named<Transform>;
