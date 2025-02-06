import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { TextArea } from './text-area';
import '.';

const COMPONENT_TAG = 'vwc-text-area';

describe('a11y: vwc-text-area', () => {
	let element: TextArea;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TextArea;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.value = 'Value text';
		element.resize = 'both';
		element.helperText = 'Helper text';
		element.errorText = 'Error text';
		element.charCount = true;

		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
