import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { VideoPlayer } from './video-player';
import { videoPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-video-player';

jest.mock('video.js', () => {
	const actualVideoJS = jest.requireActual('video.js');

	return {
		__esModule: true,
		default: actualVideoJS
	};
});

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
		it('should be initialized as a vwc-video-player', async () => {
			expect(videoPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(VideoPlayer);
		});

		it('should be initialise in its default state', async () => {
			expect(element.poster).toBe(undefined);
			expect(element.autoplay).toBe(undefined);
			expect(element.loop).toBe(undefined);
			const posterEle = element.shadowRoot?.querySelector('.vjs-poster');
			expect(posterEle?.classList.contains('vjs-hidden')).toBe(true);
			const bigPlayBtn = element.shadowRoot?.querySelector('.vjs-big-play-button');
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
			const captionsBtn = element.shadowRoot?.querySelector('.vjs-subs-caps-button');
			expect(captionsBtn?.classList.contains('vjs-hidden')).toBe(true);
			const descriptionsBtn = element.shadowRoot?.querySelector('.vjs-descriptions-button');
			expect(descriptionsBtn?.classList.contains('vjs-hidden')).toBe(true);
			const chaptersBtn = element.shadowRoot?.querySelector('.vjs-chapters-button');
			expect(chaptersBtn?.classList.contains('vjs-hidden')).toBe(true);
			const playbackRatesMenuItems = element.shadowRoot?.querySelectorAll('.vjs-playback-rate .vjs-menu li');
			expect(playbackRatesMenuItems?.length).toBe(4);
			if (playbackRatesMenuItems?.length === 4) {
				expect(playbackRatesMenuItems[0].textContent).toBe('2x');
				expect(playbackRatesMenuItems[1].textContent).toBe('1.5x');
				expect(playbackRatesMenuItems[2].textContent).toBe('1x, selected');
				expect(playbackRatesMenuItems[3].textContent).toBe('0.5x');
			}
			const SkipBackwardBtn = element.shadowRoot?.querySelector('.vjs-skip-backward-10');
			expect(SkipBackwardBtn?.classList.contains('vjs-hidden')).toBe(false);
			const SkipForwardBtn = element.shadowRoot?.querySelector('.vjs-skip-forward-10');
			expect(SkipForwardBtn?.classList.contains('vjs-hidden')).toBe(false);
			const videoEle = element.shadowRoot?.querySelector('video');
			expect(videoEle?.hasAttribute('loop')).toBe(false);
		});

		it('removes the redundant lang attribute', () => {
			expect(element.shadowRoot?.querySelector('[lang]')).toBe(null);
		});
	});

	describe('autoplay', () => {
		it('should play automatically and be muted', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} autoplay="true">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element._settings.autoplay).toBe('muted');
		});
	});

	describe('loop', () => {
		it('should add the loop attribute to the video settings', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} loop="true">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element._settings.loop).toBe(true);
		});
	});

	describe('playback rates', () => {
		it('should set custom playback rates', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="0.25, 0.5, 1">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const playbackRatesMenuItems = element.shadowRoot?.querySelectorAll('.vjs-playback-rate .vjs-menu li');
			expect(playbackRatesMenuItems?.length).toBe(3);
			if (playbackRatesMenuItems?.length === 3) {
				expect(playbackRatesMenuItems[0].textContent).toBe('1x, selected');
				expect(playbackRatesMenuItems[1].textContent).toBe('0.5x');
				expect(playbackRatesMenuItems[2].textContent).toBe('0.25x');
			}
		});

		it('should disable playback rates when passed an empty string', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const playbackRate = element.shadowRoot?.querySelector('.vjs-playback-rate');
			expect(playbackRate?.classList.contains('vjs-hidden')).toBe(true);
		});
	});

	describe('captions', () => {
		it('displays the captions button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
					<track 
						kind="captions"
						src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.en.vtt" 
						srclang="en" 
						label="English" 
						default>
					<track 
						kind="captions" 
						src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.en.vtt" 
						srclang="fr" 
						label="French">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelectorAll('[kind="captions"]').length).toBe(2);
		});
	});

	describe('audio descriptions', () => {
		it('displays the audio description button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
					<track 
						kind="descriptions" 
						src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/descriptions.en.vtt" 
						label="English" 
						srclang="en" 
						default>
    				<track 
							kind="descriptions" 
							src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/descriptions.en.vtt" 
							label="French" 
							srclang="fr">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelectorAll('[kind="descriptions"]').length).toBe(2);
		});
	});

	describe('chapters', () => {
		it('displays the chapters button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
					<track kind="chapters" src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/chapters.en.vtt">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelector('[kind="chapters"]')).not.toBe(null);
		});
	});

	describe('skip-by buttons', () => {
		it('should modify skip button amount', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="30">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const SkipBackwardBtn = element.shadowRoot?.querySelector('.vjs-skip-backward-30');
			expect(SkipBackwardBtn?.classList.contains('vjs-hidden')).toBe(false);
			const SkipForwardBtn = element.shadowRoot?.querySelector('.vjs-skip-forward-30');
			expect(SkipForwardBtn?.classList.contains('vjs-hidden')).toBe(false);
		});

		it('should disable skip by buttonss when passed 0', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="0">
					<source src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const SkipBackwardBtn = element.shadowRoot?.querySelector('.vjs-skip-backward-false');
			expect(SkipBackwardBtn?.classList.contains('vjs-hidden')).toBe(true);
			const SkipForwardBtn = element.shadowRoot?.querySelector('.vjs-skip-forward-false');
			expect(SkipForwardBtn?.classList.contains('vjs-hidden')).toBe(true);
		});
	});

	function getPlayButton() {
		return element.shadowRoot?.querySelector('.vjs-big-play-button') as HTMLButtonElement;
	}

	function setVideoPauseState(pauseState = true) {
		jest.spyOn(element._player, 'paused').mockImplementationOnce(() => pauseState);
	}

	describe('events', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<source src="./short-test.mp4" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			jest.spyOn(element._player, 'play').mockImplementation(function(this: any) {
				this.trigger('play');
			});
			jest.spyOn(element._player, 'pause').mockImplementation(function(this: any) {
				return this.handleTechPause_();
			});
		});

		afterEach(() => {
			element._player.play.mockRestore();
			element._player.pause.mockRestore();
		});

		it('should emit the play event when the play button is pressed', async () => {
			const spy = jest.fn();
			element.addEventListener('play', spy);

			const playBtn = getPlayButton();
			playBtn?.click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit the pause event when the pause button is pressed while pause state is false', async () => {
			const pauseBtn = element.shadowRoot?.querySelector('.vjs-play-control') as HTMLButtonElement;
			const spy = jest.fn();
			element.addEventListener('pause', spy);
			setVideoPauseState(false);

			pauseBtn?.click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit the ended event when the video ended', () => {
			const spy = jest.fn();
			element.addEventListener('ended', spy);
			element._player.trigger('ended');
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});


	describe('a11y', () => {
		// skipped because there are aria tags (menus) inside video.js that are not correct
		xit('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});