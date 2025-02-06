import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';

describe('a11y: vwc-select', () => {
	let element: Select;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Select;
	});

	it('should pass html a11y test', async () => {
		element.innerHTML = `
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    `;
		element.selectedIndex = 2;
		element.label = 'Label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
