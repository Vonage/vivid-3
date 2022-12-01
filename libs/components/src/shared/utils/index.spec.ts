import { loadComponentsModules } from '.';

describe('loadComponentsModules', () => {
	it('should load components modules', async () => {
		const components = ['button'];
		const prefix = 'vivid';

		await loadComponentsModules(components, prefix);

		components.forEach((component) => {
			expect(customElements.get(`${prefix}-${component}`)).toBeDefined();
		});
	});
});
