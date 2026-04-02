import 'element-internals-polyfill';

import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import type { NumberField } from './number-field';
import '.';

const COMPONENT_TAG = 'vwc-number-field';

describe('a11y: vwc-number-field', () => {
	let element: NumberField;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NumberField;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.errorText = 'Error';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
