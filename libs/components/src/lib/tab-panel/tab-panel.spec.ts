import { fixture, axe } from '@vivid-nx/shared';
import { TabPanel } from './tab-panel';
import '.';

const COMPONENT_TAG = 'vwc-tab-panel';

describe('vwc-tab-panel', () => {
	let element: TabPanel;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TabPanel;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tab-panel', async () => {
			expect(element).toBeInstanceOf(TabPanel);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
