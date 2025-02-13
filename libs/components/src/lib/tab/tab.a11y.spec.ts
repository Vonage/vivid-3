import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Tab } from './tab';
import '.';

const COMPONENT_TAG = 'vwc-tab';

describe('a11y: vwc-tab', () => {
	let element: Tab;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const container = (await fixture(
			`<div role="tablist"><${COMPONENT_TAG}></${COMPONENT_TAG}></div>`
		)) as HTMLDivElement;
		element = container.querySelector(COMPONENT_TAG) as Tab;
	});

	it('should pass html a11y tests', async () => {
		element.label = 'Label';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
