export const loadComponentsModules = async (components: string[], prefix: string) =>
	await Promise.all(
		components.map(component =>
			import(`../${component}/index.js?prefix=${prefix}`))
	);
