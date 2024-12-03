import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import videojs from 'video.js';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { MediaSkipBy } from '../enums';
import { Localized } from '../../shared/patterns';
import { getPlaybackRatesArray } from '../../shared/utils/playbackRates';

export const DEFAULT_PLAYBACK_RATES = '0.5, 1, 1.5, 2';

function appendProgressBarToStart(videoPlayer: any) {
	const controlBar = videoPlayer.getChild('ControlBar');
	const current = controlBar.getChild('CurrentTimeDisplay');
	const progress = controlBar.getChild('ProgressControl');
	const duration = controlBar.getChild('DurationDisplay');
	const divider = controlBar.getChild('TimeDivider');
	controlBar.removeChild(progress);
	controlBar.removeChild(current);
	controlBar.removeChild(divider);
	controlBar.removeChild(duration);
	controlBar.addChild(current, {}, 0);
	controlBar.addChild(progress, {}, 1);
	controlBar.addChild(duration, {}, 2);
}

/**
 * Base class for video-player
 *
 * @public
 * @component video-player
 * @slot - Default slot
 * @event {CustomEvent<undefined>} play - Fired when the video is played
 * @event {CustomEvent<undefined>} pause - Fired when the video is paused
 * @event {CustomEvent<undefined>} ended - Fired when the video is ended
 */
export class VideoPlayer extends FoundationElement {
	/**
	 * Reference to an image which is displayed before the video is played
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: poster
	 */
	@attr poster?: string;

	/**
	 * URL of a video file
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: src
	 */
	@attr src?: string;

	/**
	 * @internal
	 */
	srcChanged() {
		this.#initVideo();
	}

	/**
	 * Allows the video will play automatically (muted)
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autoplay
	 */
	@attr({ mode: 'boolean' }) autoplay = false;

	/**
	 * @internal
	 */
	autoplayChanged() {
		if (this._player) {
			this.#initVideo();
		}
	}

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: loop
	 */
	@attr({ mode: 'boolean' }) loop = false;

	/**
	 * Sets the available playback rates. When an empty string, no choices will be available
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: playback-rates
	 */
	@attr({ attribute: 'playback-rates', mode: 'fromView' })
	playbackRates: string = DEFAULT_PLAYBACK_RATES;

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: skip-by
	 */
	@attr({ attribute: 'skip-by', mode: 'fromView' }) skipBy: MediaSkipBy =
		MediaSkipBy.Ten;

	/**
	 * @internal
	 */
	skipByChanged() {
		if (this._player) {
			this.#initVideo();
		}
	}

	/**
	 * @internal
	 */
	_player: any;

	/**
	 * @internal
	 */
	#videoElement: any;

	override connectedCallback(): void {
		super.connectedCallback();

		this.#initVideo();
	}

	override disconnectedCallback(): void {
		super.connectedCallback();
		this.#disposePlayer();
	}

	/**
	 * @internal
	 */
	#getSources() {
		const srcEles = this.querySelectorAll('source');
		if (srcEles.length === 0 && !this.src) return undefined;
		return this.src
			? [{ src: this.src }]
			: Array.from(srcEles).map((el) => ({
					src: el.getAttribute('src'),
					type: el.getAttribute('type'),
			  }));
	}

	/**
	 * @internal
	 */
	#getSettings() {
		const sources = this.#getSources();
		const skipByValue = parseInt(this.skipBy);
		return {
			languages: {
				current: this.locale.videoPlayer,
			},
			sources,
			poster: this.poster,
			muted: this.autoplay,
			playbackRates: getPlaybackRatesArray(this.playbackRates),
			controlBar: {
				skipButtons: {
					forward: skipByValue,
					backward: skipByValue,
				},
				remainingTimeDisplay: { displayNegative: false },
				volumePanel: { inline: false },
			},
			textTrackSettings: false,
			experimentalSvgIcons: true,
			language: 'current',
			fluid: true,
			controls: true,
			preload: 'auto',
		};
	}

	get #noSourceErrorElement() {
		return this.shadowRoot!.getElementById('no-sources');
	}

	#disposePlayer() {
		this._player && this._player.dispose();
	}

	#setupVideoElement() {
		this.#videoElement = document.createElement('video');
		const trackElements = this.querySelectorAll('track');
		for (let x = 0; x < trackElements.length; x++) {
			this.#videoElement.appendChild(trackElements[x]);
		}
		this.#videoElement.setAttribute('crossorigin', 'anonymous');
		this.#videoElement.toggleAttribute('playsinline', true);
		if (this.loop) {
			this.#videoElement.setAttribute('loop', '');
		}
		if (this.autoplay) {
			this.#videoElement.setAttribute('autoplay', '');
		}
		this.#controlElement!.appendChild(this.#videoElement);
	}

	get #controlElement() {
		return this.shadowRoot!.querySelector('.control');
	}

	#hideNoSourceError(show = true) {
		this.#noSourceErrorElement?.classList.toggle('vjs-hidden', show);
	}

	#setupVideoPlayer(settings: any) {
		this._player = videojs(this.#videoElement, settings);
		this.shadowRoot!.querySelector('[lang]')!.removeAttribute('lang');
	}

	#setupPlayerEvents() {
		this._player.on('play', () => this.$emit('play'));
		this._player.on('pause', () => this.$emit('pause'));
		this._player.on('ended', () => this.$emit('ended'));
	}
	/**
	 * @internal
	 */
	#initVideo() {
		this.#disposePlayer();
		const settings = this.#getSettings();

		if (
			settings.sources &&
			this.#controlElement &&
			this.#noSourceErrorElement
		) {
			this.#hideNoSourceError();
			this.#setupVideoElement();
			this.#setupVideoPlayer(settings);
			appendProgressBarToStart(this._player);
			this.#setupPlayerEvents();
		} else {
			this.#hideNoSourceError(false);
		}
	}
}

export interface VideoPlayer extends Localized {}
applyMixins(VideoPlayer, Localized);
