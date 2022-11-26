export const loadComponentsModules = (components: string[], prefix: string) =>
	Promise.all(
		components.map(component =>
			import(`../${component}/index.js?prefix=${prefix}`)
		)
	);
