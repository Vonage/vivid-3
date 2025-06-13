import { axe, fixture } from '@repo/shared';
import { AppearanceUi } from './appearance-ui';

const COMPONENT_TAG = 'docs-appearance-ui';

describe('docs-appearance-ui', () => {
	let element: AppearanceUi;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as AppearanceUi;
	});

	describe('basic', () => {
		it('should be initialized as a docs-appearance-ui', async () => {
			expect(element).toBeInstanceOf(AppearanceUi);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
