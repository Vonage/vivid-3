import { iconDefinition } from '../../lib/icon/definition';
import { badgeDefinition } from '../../lib/badge/definition';
import { designSystem, registerFactory } from '.';

describe('design system', () => {
	it('should export \'designSystem\'', async () => {
		expect(designSystem).toBeDefined();
	});

	it('should register with custom prefix instead of default', async () => {
		const elementsDefinitions = [badgeDefinition(), iconDefinition()];
		const registerBadge = registerFactory(elementsDefinitions);
		const defaultPrefix = 'vwc';
		const customPrefix = 'dashboard';

		registerBadge(customPrefix);

		await Promise.all(
			elementsDefinitions.map(({ definition }) =>
				customElements.whenDefined(`${customPrefix}-${definition.baseName}`)
			));

		elementsDefinitions.forEach(({ definition }) => {
			expect(customElements.get(`${customPrefix}-${definition.baseName}`)).toBeDefined();
			expect(customElements.get(`${defaultPrefix}-${definition.baseName}`)).toBeUndefined();
		});
	});

	it('should register a component along with its integrated components', async () => {
		const elementsDefinitions = [badgeDefinition(), iconDefinition()];
		const registerBadge = registerFactory(elementsDefinitions);
		const defaultPrefix = 'vwc';

		registerBadge();

		await Promise.all(
			elementsDefinitions.map(({ definition }) =>
				customElements.whenDefined(`${defaultPrefix}-${definition.baseName}`)
			));

		elementsDefinitions.forEach(({ definition }) => {
			expect(customElements.get(`${defaultPrefix}-${definition.baseName}`)).toBeDefined();
		});
	});
});
