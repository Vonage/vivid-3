import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { SplitButton } from './split-button';
import '.';

const COMPONENT_TAG = 'vwc-split-button';

describe('a11y: vwc-split-button', () => {
	let element: SplitButton;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SplitButton;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Button label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
