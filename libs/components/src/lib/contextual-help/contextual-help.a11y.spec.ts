import { axe, fixture } from '@repo/shared';
import { ContextualHelp } from './contextual-help';
import '.';

const COMPONENT_TAG = 'vwc-contextual-help';

describe('a11y: vwc-contextual-help', () => {
	let element: ContextualHelp;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ContextualHelp;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
