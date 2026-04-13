import { axe, fixture } from '@repo/shared';
import { PlatformSwitch } from './platform-switch';
import '.';

const COMPONENT_TAG = 'vwc-platform-switch';

describe('a11y: vwc-platform-switch', () => {
	let element: PlatformSwitch;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<span data-os="apple">Apple shortcut</span>
				<span>Default shortcut</span>
			</${COMPONENT_TAG}>`
		)) as PlatformSwitch;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
