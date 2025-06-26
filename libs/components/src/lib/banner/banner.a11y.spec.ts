import { axe, elementUpdated, fixture } from '@repo/shared';
import { Banner } from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

describe('a11y: vwc-banner', () => {
	let element: Banner;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Banner;
	});

	it('should pass html a11y test', async () => {
		element.removable = true;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	describe('role', function () {
		it('should change role to role text', async function () {
			element.role = 'alert';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		it('should change role when role attribute is set', async function () {
			element.setAttribute('role', 'alert');
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
