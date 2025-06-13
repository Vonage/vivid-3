import { axe, elementUpdated, fixture } from '@repo/shared';
import { Dialog } from './dialog';
import { setDialogPolyfill } from './dialog.spec';
import '.';

const COMPONENT_TAG = 'vwc-dialog';
setDialogPolyfill();
describe('a11y: vwc-dialog', () => {
	let element: Dialog;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Dialog;
	});

	it('should pass html a11y test', async () => {
		element.open = true;
		element.setAttribute('aria-label', 'Test dialog');
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
