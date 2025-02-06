import {
	axe,
  elementUpdated,
	fixture,
} from '@vivid-nx/shared';
import { Slider } from './slider';
import '.';

const COMPONENT_TAG = 'vwc-slider';

describe('a11y: vwc-slider', () => {
	let element: Slider;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });
	
	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Slider;
	});

	it('should pass html a11y test', async () => {
    element.ariaLabel = 'Label';
      element.min = 3;
      element.max = 10;
      element.value = '5';
      await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
});
