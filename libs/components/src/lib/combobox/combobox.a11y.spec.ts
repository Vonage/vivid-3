import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Combobox } from './combobox';
import '.';

const COMPONENT_TAG = 'vwc-combobox';

describe('a11y: vwc-combobox', () => {
	let element: Combobox;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Combobox;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Combobox label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
