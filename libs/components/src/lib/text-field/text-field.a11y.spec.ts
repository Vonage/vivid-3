import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { TextField } from './text-field';
import '.';

const COMPONENT_TAG = 'vwc-text-field';

describe('a11y: vwc-text-field', () => {
	let element: TextField;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TextField;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.value = 'Value text';
		element.helperText = 'Helper text';
		element.errorText = 'Error text';
		element.charCount = true;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
