import { axe } from '@repo/shared/test-utils/axe';
import { fixture } from '@repo/shared/test-utils/fixture';
import type { Divider } from './divider';
import '.';

const COMPONENT_TAG = 'vwc-divider';

describe('vwc-divider', () => {
	let element: Divider;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Divider;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
