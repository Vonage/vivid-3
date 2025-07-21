import { axe, elementUpdated, fixture } from '@repo/shared';
import { Checkbox } from './checkbox';
import '.';

const COMPONENT_TAG = 'vwc-checkbox';

describe('a11y: vwc-checkbox', () => {
	let element: Checkbox;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Checkbox;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Checkbox label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	describe('no label', () => {
		it('should pass html a11y test', async () => {
			element.ariaLabel = 'Label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
