import { axe, fixture } from '@vivid-nx/shared';
import { AudioPlayer } from './audio-player';
import '.';

const COMPONENT_TAG = 'vwc-audio-player';
const SOURCE = 'https://download.samplelib.com/mp3/sample-6s.mp3';

describe('a11y: vwc-audio-player', () => {
	let element: AudioPlayer;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="${SOURCE}"></${COMPONENT_TAG}>`
		)) as AudioPlayer;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
