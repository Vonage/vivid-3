import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Button } from './button';
import '.';

const COMPONENT_TAG = 'vwc-button';

describe('a11y: vwc-button', () => {
	let element: Button;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Button;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Home';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	it('should pass html a11y test when anchor', async () => {
		element.label = 'Link text';
		element.href = '/somewhere';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	describe('icon-only', () => {
		it('should pass html a11y test', async () => {
			element.icon = 'home';
			element.ariaLabel = 'Back to homepage';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
