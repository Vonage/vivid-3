import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { Connotation } from '../enums';
import type { Alert } from './alert';
import '.';

const COMPONENT_TAG = 'vwc-alert';

describe('a11y: vwc-alert', () => {
	let element: Alert;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Alert;
	});

	it('should pass html a11y test', async () => {
		element.text = 'Alert text';
		element.headline = 'Alert heading';
		element.open = true;
		element.connotation = Connotation.Alert;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
