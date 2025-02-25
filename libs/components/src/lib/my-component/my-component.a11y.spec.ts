import { axe, fixture } from '@vivid-nx/shared';
import { MyComponent } from './my-component';
import '.';

const COMPONENT_TAG = 'vwc-my-component';

describe('a11y: vwc-my-component', () => {
	let element: MyComponent;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as MyComponent;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
