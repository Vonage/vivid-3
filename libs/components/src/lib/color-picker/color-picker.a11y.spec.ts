import { axe, elementUpdated, fixture } from '@repo/shared';
import { ColorPicker } from './color-picker';
import '.';

const COMPONENT_TAG = 'vwc-color-picker';

describe('a11y: vwc-color-picker', () => {
	let element: ColorPicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ColorPicker;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Color picker';
		element.value = '#ffffff';
		element.helperText = 'Helper text';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
