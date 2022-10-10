import { fixture } from '@vivid-nx/shared';
import { Slider } from './slider';
import '.';

const COMPONENT_TAG = 'vwc-slider';

describe('vwc-slider', () => {
	let element: Slider;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Slider;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-slider', async () => {
			expect(element).toBeInstanceOf(Slider);
		});
	});
});
