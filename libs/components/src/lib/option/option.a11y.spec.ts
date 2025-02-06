import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { ListboxOption } from './option';
import '.';

const COMPONENT_TAG = 'vwc-option';

describe('a11y: vwc-option', () => {
	let element: ListboxOption;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ListboxOption;
	});

	it('should pass html a11y test', async () => {
			element = (await fixture(
				`<div role="listbox" aria-label="Dummy listbox">
					<${COMPONENT_TAG} text="text" value="value"></${COMPONENT_TAG}>
				</div>`
			)) as ListboxOption;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
});
