import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { RadioGroup } from './radio-group';
import '../radio';
import '.';

const COMPONENT_TAG = 'vwc-radio-group';

describe('vwc-radio-group a11y', () => {
	let element: RadioGroup;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const fixtureElement = fixture(`
      <${COMPONENT_TAG}>
        <vwc-radio value="0" label="one"></vwc-radio>
        <vwc-radio value="1" label="two"></vwc-radio>
        <vwc-radio value="2" label="three"></vwc-radio>
      </${COMPONENT_TAG}>
    `) as HTMLElement;
		element =
			fixtureElement instanceof RadioGroup
				? fixtureElement
				: (fixtureElement.querySelector(COMPONENT_TAG) as RadioGroup);
		await elementUpdated(element);
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
