import { defaultPrefix } from '../design-system';

export const loadComponentsModules = (components: string[], prefix: string) => {
	const param = prefix !== defaultPrefix ? `?prefix=${prefix}` : '';
	components.forEach((component) => import(`../${component}/index.js${param}`));

	return Promise.all(
		components.map(component =>
			customElements.whenDefined(`${prefix}-${component}`)
		)
	);
};
