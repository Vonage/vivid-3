import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Switch } from './switch';
import '.';

const COMPONENT_TAG = 'vwc-switch';

describe('vwc-switch', () => {
	let element: Switch;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Switch;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Label';
			element.checked = true;
			element.value = 'test';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		describe('aria-label', () => {
			it('should pass html a11y test', async () => {
				element.ariaLabel = 'Label';
				element.checked = true;
				element.value = 'test';
				await elementUpdated(element);

				expect(await axe(element)).toHaveNoViolations();
			});
		});
	});
});
