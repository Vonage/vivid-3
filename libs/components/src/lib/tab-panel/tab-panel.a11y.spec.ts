import { axe, fixture } from '@repo/shared';
import { TabPanel } from './tab-panel';
import '.';

const COMPONENT_TAG = 'vwc-tab-panel';

describe('a11y: vwc-tab-panel', () => {
	let element: TabPanel;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TabPanel;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
