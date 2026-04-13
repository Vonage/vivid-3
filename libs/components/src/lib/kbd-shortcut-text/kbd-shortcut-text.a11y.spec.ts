import { axe, fixture } from '@repo/shared';
import { KbdShortcutText } from './kbd-shortcut-text';
import '.';

const COMPONENT_TAG = 'vwc-kbd-shortcut-text';

describe('a11y: vwc-kbd-shortcut-text', () => {
	let element: KbdShortcutText;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>Control+C</${COMPONENT_TAG}>`
		)) as KbdShortcutText;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
