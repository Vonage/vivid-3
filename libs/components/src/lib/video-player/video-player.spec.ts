import { axe, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { VideoPlayer } from './video-player';
import { videoPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-video-player';

describe('vwc-video-player', () => {
	let element: VideoPlayer;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
			</${COMPONENT_TAG}>`
		)) as VideoPlayer;
	});

	describe('basic', () => {
		fit('should be initialized as a vwc-video-player', async () => {
			expect(videoPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(VideoPlayer);
		});
	});

	xdescribe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
