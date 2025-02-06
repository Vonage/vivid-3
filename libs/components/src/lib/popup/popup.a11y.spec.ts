import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	let element: Popup;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Popup;
	});

	it('should pass html a11y test', async () => {
		element.open = true;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
