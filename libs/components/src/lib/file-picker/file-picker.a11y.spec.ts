import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { FilePicker } from './file-picker';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

describe('a11y: vwc-file-picker', () => {
	let element: FilePicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
		) as FilePicker;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Test label';
		element.helperText = 'Helper text';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
