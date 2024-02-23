import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { MediaSkipBy } from '../enums';
import { DEFAULT_PLAYBACK_RATES, VideoPlayer } from './video-player';
import { videoPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-video-player';

const VIDEO_SRC = 'video.mp4';

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
				<source src="${VIDEO_SRC}" type="video/mp4">
			</${COMPONENT_TAG}>`
		)) as VideoPlayer;
	});

	function getBigPlayButton() {
		return element.shadowRoot?.querySelector('.vjs-big-play-button') as HTMLButtonElement;
	}

	describe('basic', () => {
		it('should be initialized as a vwc-video-player', async () => {
			expect(videoPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(VideoPlayer);
		});

		it('should be initialise in its default state', async () => {
			expect(element.src).toBe(undefined);
			expect(element.poster).toBe(undefined);
			expect(element.autoplay).toBe(false);
			expect(element.loop).toBe(false);
			expect(element.skipBy).toBe(MediaSkipBy.Ten);
			expect(element.playbackRates).toBe(DEFAULT_PLAYBACK_RATES);
		});

		it('should show the big play button by removing the vjs-hidden class', async () => {
			const bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
		});

		it('should remove the redundant lang attribute', () => {
			expect(element.shadowRoot?.querySelector('[lang]')).toBe(null);
		});
	});

	describe('src', () => {
		it('should show the big play button by removing the vjs-hidden class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} src="${VIDEO_SRC}"></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
		});
	});

	describe('autoplay', () => {
		it('should set the muted attribute on the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} autoplay>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelector('.vjs-autoplay')).not.toBe(null);
		});
	});

	describe('loop', () => {
		it('should set the loop attribute on the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} loop>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelector('.vjs-loop')).not.toBe(null);
		});
	});

	describe('playback rates', () => {
		it('should set custom playback rates', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="0.25, 0.5, 1">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const playbackRatesMenuItems = element.shadowRoot?.querySelectorAll('.vjs-playback-rate .vjs-menu li');
			expect(playbackRatesMenuItems?.length).toBe(3);
			if (playbackRatesMenuItems?.length === 3) {
				expect(playbackRatesMenuItems[0].querySelector('.vjs-menu-item-text')!.textContent).toBe('1x');
				expect(playbackRatesMenuItems[1].querySelector('.vjs-menu-item-text')!.textContent).toBe('0.5x');
				expect(playbackRatesMenuItems[2].querySelector('.vjs-menu-item-text')!.textContent).toBe('0.25x');
			}
		});

		it('should disable playback rates when passed an empty string', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
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
					<source src="${VIDEO_SRC}" type="video/mp4">
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
					<source src="${VIDEO_SRC}" type="video/mp4">
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
					<source src="${VIDEO_SRC}" type="video/mp4">
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
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const SkipBackwardBtn = element.shadowRoot?.querySelector('.vjs-skip-backward-30');
			expect(SkipBackwardBtn?.classList.contains('vjs-hidden')).toBe(false);
			const SkipForwardBtn = element.shadowRoot?.querySelector('.vjs-skip-forward-30');
			expect(SkipForwardBtn?.classList.contains('vjs-hidden')).toBe(false);
		});

		it('should disable skip by buttons when passed 0', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="0">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const SkipBackwardBtn = element.shadowRoot?.querySelector('.vjs-skip-backward-false');
			expect(SkipBackwardBtn?.classList.contains('vjs-hidden')).toBe(true);
			const SkipForwardBtn = element.shadowRoot?.querySelector('.vjs-skip-forward-false');
			expect(SkipForwardBtn?.classList.contains('vjs-hidden')).toBe(true);
		});
	});

	function setVideoPauseState(pauseState = true) {
		jest.spyOn(element.player, 'paused').mockImplementationOnce(() => pauseState);
	}

	describe('events', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			jest.spyOn(element.player, 'play').mockImplementation(function(this: any) {
				this.trigger('play');
			});
			jest.spyOn(element.player, 'pause').mockImplementation(function(this: any) {
				return this.handleTechPause_();
			});
		});

		afterEach(() => {
			element.player.play.mockRestore();
			element.player.pause.mockRestore();
		});

		it('should emit the play event when the play button is pressed', async () => {
			const spy = jest.fn();
			element.addEventListener('play', spy);

			const playBtn = getBigPlayButton();
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
			element.player.trigger('ended');
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