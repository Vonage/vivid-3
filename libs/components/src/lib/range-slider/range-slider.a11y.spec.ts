import {
	axe,
	elementUpdated,
	fixture,
} from '@vivid-nx/shared';
import { RangeSlider } from './range-slider';
import '.';

const COMPONENT_TAG = 'vwc-range-slider';

describe('vwc-range-slider', () => {
	let element: RangeSlider;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RangeSlider;
	});

	it('should pass html a11y test', async () => {
			await elementUpdated(element);
			expect(await axe(element)).toHaveNoViolations();
		});
});
