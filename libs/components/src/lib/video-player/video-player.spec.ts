import { elementUpdated, fixture } from '@vivid-nx/shared';
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

	function getVideoEle() {
		return element.shadowRoot!.querySelector('video') as HTMLVideoElement;
	}

	function getDialogContentEle() {
		return element.shadowRoot!.querySelector('.vjs-modal-dialog-content');
	}

	function isBigPlayButtonVisible() {
		const btn = getBigPlayButton();
		if (!btn) return false;
		return !btn.classList.contains('vjs-hidden');
	}

	function getSkipButtons(amount: MediaSkipBy) {
		const skipBackwardBtn = element.shadowRoot?.querySelector(`.vjs-skip-backward-${amount}`);
		const skipForwardBtn = element.shadowRoot?.querySelector(`.vjs-skip-forward-${amount}`);
		return [skipBackwardBtn, skipForwardBtn];
	}

	describe('basic', () => {
		it('should be initialized as a vwc-video-player', async () => {
			expect(videoPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(VideoPlayer);
		});

		it('should be initialize with default state', async () => {
			expect(element.src).toBe(undefined);
			expect(element.poster).toBe(undefined);
			expect(element.autoplay).toBe(false);
			expect(element.loop).toBe(false);
			expect(element.skipBy).toBe(MediaSkipBy.Ten);
			expect(element.playbackRates).toBe(DEFAULT_PLAYBACK_RATES);
		});

		it('should show the big play button by removing the vjs-hidden class', async () => {
			expect(isBigPlayButtonVisible()).toBe(true);
		});

		it('should remove the lang attribute to avoid clash with vivid localization', () => {
			expect(element.shadowRoot?.querySelector('[lang]')).toBe(null);
		});
	});

	describe('src', () => {
		describe('no src provided', () => {
			it('should show the internal invalid src error message', async() => {
				element = (await fixture(
					`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
				)) as VideoPlayer;
				await elementUpdated(element);
				const noSrcErrorEl = element.shadowRoot!.getElementById('no-sources');
				const dialogContentEl = getDialogContentEle();
				expect(noSrcErrorEl?.classList.contains('vjs-hidden')).toBe(false);
				expect(dialogContentEl!.textContent?.trim()).toBe('No compatible source was found for this media.');
			});
		});

		describe('invalid src', () => {
			xit('should show the invalid src error message', async() => {
				element = (await fixture(
					`<${COMPONENT_TAG} src="invalid.xyz"></${COMPONENT_TAG}>`
				)) as VideoPlayer;
				await elementUpdated(element);
				const noSrcErrorEl = element.shadowRoot!.getElementById('no-sources');
				const dialogContentEl = getDialogContentEle();
				expect(noSrcErrorEl?.classList.contains('vjs-hidden')).toBe(false);
				expect(dialogContentEl!.textContent).toBe('No compatible source was found for this media.');
			});
		});

		it('should show the big play button by removing the vjs-hidden class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} src="${VIDEO_SRC}"></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
		});

		it('should allow the src to be updated', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			let bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn).toBeFalsy();
			element.src = 'new-src.mp4';
			await elementUpdated(element);
			bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
		});
	});

	describe('autoplay', () => {
		it('should reflect autoplay on the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} autoplay>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			let videoEle = getVideoEle();
			expect(videoEle?.hasAttribute('autoplay')).toBe(true);

			element.autoplay = false;
			elementUpdated(element);

			videoEle = getVideoEle();
			expect(videoEle?.hasAttribute('autoplay')).toBe(false);
		});
	});

	describe('loop', () => {
		it('should set the loop attribute on the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} loop>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const videoEle = getVideoEle();
			expect(videoEle?.loop).toBe(true);
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

		it('should hide playback rates when passed an empty string', async () => {
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
		xit('should display the captions button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
					<track 
						kind="captions"
						src="captions.en.vtt" 
						srclang="en" 
						label="English" 
						default>
					<track 
						kind="captions" 
						src="captions.fr.vtt" 
						srclang="fr" 
						label="French">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelectorAll('[kind="captions"]').length).toBe(2);
			const subsCapsBtn = element.shadowRoot!.querySelector('.vjs-subs-caps-button');
			// console.log(subsCapsBtn?.innerHTML);
		});
	});

	describe('audio descriptions', () => {
		it('should display the audio description button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
					<track 
						kind="descriptions" 
						src="descriptions.en.vtt" 
						label="English" 
						srclang="en" 
						default>
    				<track 
							kind="descriptions" 
							src="descriptions.fr.vtt" 
							label="French" 
							srclang="fr">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelectorAll('[kind="descriptions"]').length).toBe(2);
		});
	});

	describe('chapters', () => {
		it('should display the chapters button and menu', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
					<track kind="chapters" src="chapters.vtt">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			expect(element.shadowRoot!.querySelector('[kind="chapters"]')).not.toBe(null);
		});
	});

	describe('skip-by buttons', () => {
		it('should modify skip button amount', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="${MediaSkipBy.Thirty}">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			
			expect(getSkipButtons(MediaSkipBy.Thirty)[0]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Thirty)[1]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Ten)[0]).toBeNull();
			expect(getSkipButtons(MediaSkipBy.Ten)[1]).toBeNull();

			element.skipBy = MediaSkipBy.Five;
			await elementUpdated(element);

			expect(getSkipButtons(MediaSkipBy.Five)[0]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Five)[1]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Thirty)[0]).toBeNull();
			expect(getSkipButtons(MediaSkipBy.Thirty)[1]).toBeNull();
		});

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
});