import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import type { Note } from './note';
import '.';

const COMPONENT_TAG = 'vwc-note';

describe('a11y: vwc-note', () => {
	let element: Note;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Note;
	});

	it('should pass html a11y test', async () => {
		element.headline = 'Headline';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
