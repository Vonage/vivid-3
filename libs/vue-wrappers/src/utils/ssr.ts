/**
 * The Vue 3 server renderer does not support the '^' and '.' prefixes in props.
 * Instead, it will forward all props verbatim as attributes resulting in output
 * like `^label="Hello"` in the final HTML.
 * This function drops props forwarded as properties and removes the '^' prefix
 * from attributes when running in SSR mode.
 */
export function handleVue3Props(
	props: Record<string, unknown>
): Record<string, unknown> {
	// Checking if we are running in SSR mode is different depending on the
	// environment:
	// - Nuxt: `process.server`
	// - Vite SSR: `import.meta.env.SSR` but it doesn't apply to node_modules by default
	// In Vite SSR, consumers will have to set process.server to true or add the library
	// to 'ssr.noExternal' in the vite config.
	// The import.meta.env.SSR check is also useful in regular vite projects as it allows
	// them to tree shake the SSR code path.
	// For this reason, the condition is written in a way to allow tree shaking if only
	// one of the expressions has been statically replaced.
	// Note: Do not move or modify the expression without validating tree shaking
	if (
		/* v8 ignore next 8 */
		// @ts-ignore
		__IMPORT_META_ENV_PLACEHOLDER__?.SSR !== false &&
		// @ts-ignore
		(globalThis.process && process.server) !== false &&
		// @ts-ignore
		((globalThis.process && process.server) ||
			// @ts-ignore
			__IMPORT_META_ENV_PLACEHOLDER__?.SSR)
	) {
		const newProps: Record<string, unknown> = {};
		for (const key in props) {
			if (key[0] === '^') {
				newProps[key.slice(1)] = props[key];
			}
		}
		return newProps;
	} else {
		return props;
	}
}
