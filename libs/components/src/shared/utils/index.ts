export const loadComponentsModules = (components: string[], prefix: string) => {
	components.forEach((component) => import(`../${component}/index.js?prefix=${prefix}`));

	return Promise.all(
		components.map(component =>
			customElements.whenDefined(`${prefix}-${component}`)
		)
	);
};
