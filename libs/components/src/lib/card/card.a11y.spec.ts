import { axe, elementUpdated, fixture } from '@repo/shared';
import { Card } from './card';
import '.';

const COMPONENT_TAG = 'vwc-card';

describe('a11y: vwc-card', () => {
	let element: Card;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Card;
	});

	it('should pass html a11y test', async () => {
		element.headline = 'card headline';
		element.subtitle = 'card subtitle';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
