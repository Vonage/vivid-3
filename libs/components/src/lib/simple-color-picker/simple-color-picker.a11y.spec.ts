import { axe, fixture } from '@repo/shared';
import { SimpleColorPicker } from './simple-color-picker';
import '.';

const COMPONENT_TAG = 'vwc-simple-color-picker';

describe('a11y: vwc-simple-color-picker', () => {
	let element: SimpleColorPicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SimpleColorPicker;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
