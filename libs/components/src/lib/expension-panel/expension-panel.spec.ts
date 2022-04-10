import { fixture } from '@vivid-nx/shared';
import { ExpensionPanel } from './expension-panel';
import '.';

const COMPONENT_TAG = 'vwc-expension-panel';

describe('vwc-expension-panel', () => {
	let element: ExpensionPanel;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ExpensionPanel;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-expension-panel', async () => {
			expect(element).toBeInstanceOf(ExpensionPanel);
		});
	});
});
