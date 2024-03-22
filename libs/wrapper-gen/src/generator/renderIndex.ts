export default function renderIndex(components: string[]) {
	return components
		.map(
			(component) => `export { default as ${component} } from './${component}';`
		)
		.join('\n');
}
