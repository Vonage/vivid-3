import { axe, elementUpdated, fixture } from '@repo/shared';
import { KbdKey } from './kbd-key';
import '.';

const COMPONENT_TAG = 'vwc-kbd-key';

describe('a11y: vwc-kbd-key', () => {
	let element: KbdKey;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as KbdKey;
	});

	it('should pass html a11y test with a name', async () => {
		element.name = 'Enter';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	it('should pass html a11y test with Custom slot', async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} name="Custom">Fn</${COMPONENT_TAG}>`
		)) as KbdKey;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
