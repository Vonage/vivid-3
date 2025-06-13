import { axe, elementUpdated, fixture } from '@repo/shared';
import { Toggletip } from './toggletip';
import '../button';
import '.';

const COMPONENT_TAG = 'vwc-toggletip';

describe('a11y: vwc-toggletip', () => {
	let element: Toggletip;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Toggletip;
	});

	it('should pass html a11y test', async () => {
		element.anchor = 'anchorButton';
		element.open = true;
		element.innerHTML = 'Test content';
		element.headline = 'Headline';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
