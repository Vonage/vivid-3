import { axe, fixture } from '@repo/shared';
import { KbdShortcut } from './kbd-shortcut';
import '.';
import '../kbd-key';

const COMPONENT_TAG = 'vwc-kbd-shortcut';

describe('a11y: vwc-kbd-shortcut', () => {
	let element: KbdShortcut;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
				<vwc-kbd-key name="C"></vwc-kbd-key>
			</${COMPONENT_TAG}>`
		)) as KbdShortcut;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
