import { elementUpdated, fixture } from '@vivid-nx/shared';
import { MediaSkipBy } from '../enums';
import { DEFAULT_PLAYBACK_RATES, VideoPlayer } from './video-player';
import '.';

const COMPONENT_TAG = 'vwc-video-player';

const VIDEO_SRC = 'video.mp4';

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
		return element.shadowRoot?.querySelector(
			'.vjs-big-play-button'
		) as HTMLButtonElement;
	}

	function getVideoEle() {
		return element.shadowRoot!.querySelector('video') as HTMLVideoElement;
	}

	function getDialogContentEle() {
		return element.shadowRoot!.querySelector('.vjs-modal-dialog-content');
	}

	function getTrackElements() {
		const videoEle = getVideoEle();
		return videoEle?.querySelectorAll('track');
	}

	function getSkipButtons(amount: MediaSkipBy) {
		const skipBackwardBtn = element.shadowRoot?.querySelector(
			`.vjs-skip-backward-${amount}`
		);
		const skipForwardBtn = element.shadowRoot?.querySelector(
			`.vjs-skip-forward-${amount}`
		);
		return [skipBackwardBtn, skipForwardBtn];
	}

	function getPosterElement() {
		return element.shadowRoot!.querySelector('picture')!;
	}

	describe('basic', () => {
		it('should be initialized as a vwc-video-player', async () => {
			expect(element).toBeInstanceOf(VideoPlayer);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should be initialize with default state', async () => {
			expect(element.src).toBe(undefined);
			expect(element.poster).toBe(undefined);
			expect(element.autoplay).toBe(false);
			expect(element.loop).toBe(false);
			expect(element.skipBy).toBe(MediaSkipBy.Ten);
			expect(element.playbackRates).toBe(DEFAULT_PLAYBACK_RATES);
		});

		it('should remove the lang attribute to avoid clash with vivid localization', () => {
			expect(element.shadowRoot?.querySelector('[lang]')).toBe(null);
		});

		it('should initialize the video element with default attributes', () => {
			const videoElement = getVideoEle();
			expect(videoElement.getAttribute('crossorigin')).toEqual('anonymous');
			expect(videoElement.hasAttribute('playsinline')).toBe(true);
		});
	});

	describe('src', () => {
		it('should show the invalid src error when no src provided', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const noSrcErrorEl = element.shadowRoot!.getElementById('no-sources');
			const dialogContentEl = getDialogContentEle();

			expect(noSrcErrorEl?.classList.contains('vjs-hidden')).toBe(false);
			expect(dialogContentEl!.textContent?.trim()).toBe(
				'No compatible source was found for this media.'
			);
		});

		it('should remove the vjs-hidden class when src is set', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} src="${VIDEO_SRC}"></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const bigPlayBtn = getBigPlayButton();
			expect(bigPlayBtn?.classList.contains('vjs-hidden')).toBe(false);
		});

		it('should initialize the video when a valid src is provided', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const bigPlayButtonExistsWithoutASource = getBigPlayButton();

			element.src = 'new-src.mp4';
			await elementUpdated(element);
			const bigPlayBtn = getBigPlayButton();

			expect(bigPlayButtonExistsWithoutASource).toBeFalsy();
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
			const autoplayExistsWhenAttributeIsSet =
				getVideoEle().hasAttribute('autoplay');

			element.autoplay = false;
			elementUpdated(element);

			expect(autoplayExistsWhenAttributeIsSet).toBe(true);
			expect(getVideoEle().hasAttribute('autoplay')).toBe(false);
		});
	});

	describe('poster', () => {
		it('should reflect poster on the video element', async () => {
			const poster = 'poster.jpg';
			element = (await fixture(
				`<${COMPONENT_TAG} poster="${poster}">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;

			expect(getPosterElement().querySelector('img')!.getAttribute('src')).toBe(
				poster
			);
		});
	});

	describe('loop', () => {
		it('should reflect loop attribute on the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} loop>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const videoEle = getVideoEle();
			expect(videoEle.loop).toBe(true);
		});
	});

	function menuItemsMatchReverseOrderOfRates(
		playbackRates: string[],
		playbackRatesMenuItems: NodeListOf<Element>
	) {
		return playbackRates.reverse().reduce((acc, rate, index) => {
			return (
				acc &&
				playbackRatesMenuItems[index].querySelector('.vjs-menu-item-text')!
					.textContent === `${rate}x`
			);
		}, true);
	}

	describe('playback rates', () => {
		it('should set custom playback rates menu according to given value', async () => {
			const playbackRates = '0.25, 0.5, 1';
			const playbackRatesArray = playbackRates.split(', ');

			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="${playbackRates}">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;

			await elementUpdated(element);

			const playbackRatesMenuItems = element.shadowRoot!.querySelectorAll(
				'.vjs-playback-rate .vjs-menu li'
			);

			expect(playbackRatesMenuItems.length).toBe(playbackRatesArray.length);

			expect(
				menuItemsMatchReverseOrderOfRates(
					playbackRatesArray,
					playbackRatesMenuItems
				)
			).toBe(true);
		});

		it('should hide playback rates when passed an empty string', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const playbackRate =
				element.shadowRoot?.querySelector('.vjs-playback-rate');
			expect(playbackRate?.classList.contains('vjs-hidden')).toBe(true);
		});

		it('should hide playback rates when no playback rate is given', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			const playbackRate =
				element.shadowRoot?.querySelector('.vjs-playback-rate');
			expect(playbackRate?.classList.contains('vjs-hidden')).toBe(true);
		});
	});

	describe('captions', () => {
		it('should add captions tracks as children of the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
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
			const trackElements = getTrackElements();

			expect(trackElements.length).toBe(2);
			expect(trackElements[0].getAttribute('label')).toBe('English');
			expect(trackElements[0].getAttribute('kind')).toBe('captions');
			expect(trackElements[1].getAttribute('label')).toBe('French');
			expect(trackElements[1].getAttribute('kind')).toBe('captions');
		});
	});

	describe('audio descriptions', () => {
		it('should add descriptions tracks as children of the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
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
			const trackEles = getTrackElements();

			expect(trackEles.length).toBe(2);
			expect(trackEles[0].getAttribute('label')).toBe('English');
			expect(trackEles[0].getAttribute('kind')).toBe('descriptions');
			expect(trackEles[1].getAttribute('label')).toBe('French');
			expect(trackEles[1].getAttribute('kind')).toBe('descriptions');
		});
	});

	describe('chapters', () => {
		it('should add chapter track as child of the video element', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} playback-rates="">
					<source src="${VIDEO_SRC}" type="video/mp4">
					<track kind="chapters" src="chapters.vtt">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			await elementUpdated(element);
			const trackEles = getTrackElements();

			expect(trackEles.length).toBe(1);
			expect(trackEles[0].getAttribute('kind')).toBe('chapters');
		});
	});

	describe('skip-by', () => {
		it('should set skip buttons according to skip-by attributes and show the buttons', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="${MediaSkipBy.Thirty}">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;

			expect(getSkipButtons(MediaSkipBy.Thirty)[0]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Thirty)[1]).toBeTruthy();
			expect(
				getSkipButtons(MediaSkipBy.Thirty)[0]?.classList.contains('vjs-hidden')
			).toBe(false);
			expect(
				getSkipButtons(MediaSkipBy.Thirty)[1]?.classList.contains('vjs-hidden')
			).toBe(false);
		});

		it('should change skip button amount when skipBy is set and show the buttons', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="${MediaSkipBy.Thirty}">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;

			element.skipBy = MediaSkipBy.Five;
			await elementUpdated(element);

			expect(getSkipButtons(MediaSkipBy.Five)[0]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Five)[1]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Thirty)[0]).toBeNull();
			expect(getSkipButtons(MediaSkipBy.Thirty)[1]).toBeNull();
			expect(
				getSkipButtons(MediaSkipBy.Five)[0]?.classList.contains('vjs-hidden')
			).toBe(false);
			expect(
				getSkipButtons(MediaSkipBy.Five)[1]?.classList.contains('vjs-hidden')
			).toBe(false);
		});

		it('should hide the skip buttons when passed 0', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} skip-by="0">
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			expect(getSkipButtons(MediaSkipBy.Zero)[0]).toBeTruthy();
			expect(getSkipButtons(MediaSkipBy.Zero)[1]).toBeTruthy();
			expect(
				getSkipButtons(MediaSkipBy.Zero)[0]?.classList.contains('vjs-hidden')
			).toBe(true);
			expect(
				getSkipButtons(MediaSkipBy.Zero)[1]?.classList.contains('vjs-hidden')
			).toBe(true);
		});
	});

	function setVideoPauseState(pauseState = true) {
		vi.spyOn(element._player, 'paused').mockImplementationOnce(
			() => pauseState
		);
	}

	describe('events', () => {
		function endVideo(videoPlayer: VideoPlayer) {
			videoPlayer._player.trigger('ended');
		}
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<source src="${VIDEO_SRC}" type="video/mp4">
				</${COMPONENT_TAG}>`
			)) as VideoPlayer;
			vi.spyOn(element._player, 'play').mockImplementation(function (
				this: any
			) {
				this.trigger('play');
			});
			vi.spyOn(element._player, 'pause').mockImplementation(function (
				this: any
			) {
				return this.handleTechPause_();
			});
		});

		afterEach(() => {
			element._player.play.mockRestore();
			element._player.pause.mockRestore();
		});

		it('should emit the play event when the play button is pressed', async () => {
			const spy = vi.fn();
			element.addEventListener('play', spy);

			const playBtn = getBigPlayButton();
			playBtn?.click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit the pause event when the pause button is pressed while pause state is false', async () => {
			const pauseBtn = element.shadowRoot?.querySelector(
				'.vjs-play-control'
			) as HTMLButtonElement;
			const spy = vi.fn();
			element.addEventListener('pause', spy);
			setVideoPauseState(false);

			pauseBtn?.click();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit the ended event when the video ended', () => {
			const spy = vi.fn();
			element.addEventListener('ended', spy);
			endVideo(element);
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});
