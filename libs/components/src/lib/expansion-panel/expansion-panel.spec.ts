import { fixture } from '@vivid-nx/shared';
import { ExpansionPanel } from './expansion-panel';
import '.';

const COMPONENT_TAG = 'vwc-expansion-panel';

describe('vwc-expansion-panel', () => {
	let element: ExpansionPanel;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ExpansionPanel;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-expansion-panel', async () => {
			expect(element).toBeInstanceOf(ExpansionPanel);
		});
	});
});
