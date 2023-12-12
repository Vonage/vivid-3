import { axe, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { AppearanceUi } from './appearance-ui';
import { appearanceUiDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-appearance-ui';

describe('vwc-appearance-ui', () => {
	let element: AppearanceUi;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as AppearanceUi;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-appearance-ui', async () => {
			expect(appearanceUiDefinition()).toBeInstanceOf(
				FoundationElementRegistry
			);
			expect(element).toBeInstanceOf(AppearanceUi);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
