/* eslint-disable max-len */
import { attr, Observable, type ValueConverter } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Localized } from '../../shared/patterns';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import type { Connotation } from '../enums';
import { MediaSkipBy } from '../enums';
import type { Slider } from '../slider/slider';

/**
 * Types of audio player connotation.
 *
 * @public
 */
export type AudioPlayerConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

export type AudioPlayerMediaSkipBy = ExtractFromEnum<
	MediaSkipBy,
	MediaSkipBy.Zero | MediaSkipBy.Five | MediaSkipBy.Ten | MediaSkipBy.Thirty
>;

export const SKIP_DIRECTIONS = {
	FORWARD: 1,
	BACKWARD: -1,
};

export type SKIP_DIRECTIONS_TYPE =
	(typeof SKIP_DIRECTIONS)[keyof typeof SKIP_DIRECTIONS];

export function formatTime(time: number) {
	if (!time || Number.isNaN(time)) {
		return '0:00';
	}
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return min + ':' + (sec < 10 ? '0' + sec : sec);
}

const PAUSE = true;
const PLAY = false;
/**
 * Converter to filter out invalid values for the skip-by attribute.
 */
const validSkipByConverter: ValueConverter = {
	toView(value: MediaSkipBy): MediaSkipBy {
		return value;
	},
	fromView(value: string): MediaSkipBy | undefined {
		return (Object.values(MediaSkipBy) as string[]).includes(value)
			? (value as MediaSkipBy)
			: undefined;
	},
};

/**
 * @public
 * @component audio-player
 */
export class AudioPlayer extends Localized(VividElement) {
	@attr({ attribute: 'play-button-aria-label' }) playButtonAriaLabel:
		| string
		| null = null;
	@attr({ attribute: 'pause-button-aria-label' }) pauseButtonAriaLabel:
		| string
		| null = null;
	@attr({ attribute: 'slider-aria-label' }) sliderAriaLabel: string | null =
		null;

	@attr({ attribute: 'skip-forward-aria-label' }) skipForwardButtonAriaLabel:
		| string
		| null = null;

	@attr({ attribute: 'skip-backward-aria-label' }) skipBackwardButtonAriaLabel:
		| string
		| null = null;

	/**
	 * The connotation the audio-player should have.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr connotation?: AudioPlayerConnotation;

	/**
	 * Indicates the audio-player's src.
	 *
	 * @public
	 * HTML Attribute: src
	 */
	@attr src?: string;

	srcChanged() {
		if (this.src === undefined) {
			this.setSrc('');
		} else {
			this.setSrc(this.src);
		}
	}

	private revokeSrc() {
		const src = this.getCurrentSrc();
		if (src && src.startsWith('blob:')) {
			URL.revokeObjectURL(src);
		}
	}

	private getCurrentSrc(): string {
		return this.#playerEl.currentSrc || this.#playerEl.src || '';
	}

	private canPlayType(type: string): boolean {
		return this.#playerEl.canPlayType(type) !== '';
	}

	private setSrc(url: string, blob?: Blob) {
		const prevSrc = this.getCurrentSrc();

		// Clean up previous source
		this.revokeSrc();
		this.#audioBuffer = undefined;

		// Cancel any pending fetch
		if (this.#fetchAbortController) {
			this.#fetchAbortController.abort();
			this.#fetchAbortController = undefined;
		}

		// Create object URL if we have a blob and the browser can play it
		const newSrc =
			blob && (this.canPlayType(blob.type) || !url)
				? URL.createObjectURL(blob)
				: url;

		// Reset the media element
		if (prevSrc) {
			this.#playerEl.removeAttribute('src');
		}

		// Set the new source with fallback
		if (newSrc || url) {
			try {
				this.#playerEl.src = newSrc;
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log('Falling back to original URL due to error:', error);
				// Fallback to the original URL if setting the new source fails
				this.#playerEl.src = url;
			}
		}
	}

	get playbackRate() {
		Observable.track(this, 'playbackRate');
		return this.#playerEl.playbackRate;
	}

	set playbackRate(value) {
		this.#playerEl.playbackRate = value;
		Observable.notify(this, 'playbackRate');
	}

	/**
	 * Indicates whether audio player is disabled.
	 *
	 * @public
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 *
	 * @public
	 * HTML Attribute: notime
	 */
	@attr({ mode: 'boolean' }) notime = false;

	/**
	 * Allows the audio to skip back or forward
	 *
	 * @public
	 * HTML Attribute: skip-by
	 */
	@attr({
		attribute: 'skip-by',
		converter: validSkipByConverter,
	})
	skipBy?: AudioPlayerMediaSkipBy;

	/**
	 * Sets the available playback rates. When an empty string, no choices will be available
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: playback-rates
	 */
	@attr({ attribute: 'playback-rates' })
	playbackRates: string | null = null;

	get paused(): boolean {
		Observable.track(this, 'paused');
		return this.#playerEl.paused;
	}

	set paused(_) {
		//
	}

	#audioBuffer?: AudioBuffer;

	#fetchAbortController?: AbortController;

	async #fetchAndCacheAudioBuffer() {
		if (this.#audioBuffer || !this.src) return;

		this.#fetchAbortController = new AbortController();
		const signal = this.#fetchAbortController.signal;

		try {
			const response = await fetch(this.src, { signal });
			const blob = await response.blob();

			this.setSrc(this.src, blob);

			// Decode audio data for duration calculation
			const arrayBuffer = await blob.arrayBuffer();
			const audioContext = new window.AudioContext();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
			audioContext.close();

			this.#audioBuffer = audioBuffer;
			Observable.notify(this, 'duration');
		} catch (e: unknown) {
			/* v8 ignore else -- @preserve */
			if (e instanceof Error && e.name !== 'AbortError') {
				// eslint-disable-next-line no-console
				console.error('Error loading audio:', e);
			}
		} finally {
			this.#fetchAbortController = undefined;
		}
	}

	get duration() {
		Observable.track(this, 'duration');
		const duration = this.#playerEl.duration;

		if (Number.isFinite(duration) && duration > 0) {
			return duration;
		}

		if (this.#audioBuffer && this.#audioBuffer.duration > 0) {
			return this.#audioBuffer.duration;
		}

		return duration;
	}

	set duration(_) {
		//
	}

	get currentTime() {
		Observable.track(this, 'currentTime');
		return this.#playerEl.currentTime;
	}

	set currentTime(value) {
		this.#playerEl.currentTime = value;
	}

	get #sliderEl(): Slider | null {
		return this.shadowRoot!.querySelector('.slider');
	}

	#playerEl = new Audio();

	#isProgrammaticSliderUpdate = false;

	/**
	 * Enables fallback logic to fetch and decode audio buffer for duration when metadata is missing.
	 *
	 * @public
	 * HTML Attribute: duration-fallback
	 */
	@attr({ mode: 'boolean', attribute: 'duration-fallback' })
	durationFallback = false;

	constructor() {
		super();
	}

	override connectedCallback(): void {
		super.connectedCallback();

		this.#playerEl.addEventListener('timeupdate', this.#updateProgress);
		this.#playerEl.addEventListener('loadedmetadata', this.#updateTotalTime);
		this.#playerEl.addEventListener('durationchange', this.#updateTotalTime);
		this.#setSliderInteractionListeners();

		this.#setPausedState();
		this.#updateProgress();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#setSliderInteractionListeners(false);
		this.pause();

		this.#playerEl.removeEventListener('timeupdate', this.#updateProgress);
		this.#playerEl.removeEventListener('loadedmetadata', this.#updateTotalTime);
		this.#playerEl.removeEventListener('durationchange', this.#updateTotalTime);
	}

	play() {
		this.#pausedChanged(PLAY);
	}

	pause() {
		this.#pausedChanged(PAUSE);
	}

	#setSliderInteractionListeners(add = true) {
		const action = add ? 'addEventListener' : 'removeEventListener';
		/* v8 ignore else -- @preserve */
		if (this.#sliderEl) {
			this.#sliderEl[action]('change', this.#updateCurrentTimeOnSliderChange);
		}
	}

	#pausedChanged = (pausing: boolean) => {
		if (pausing === this.paused) {
			this.#setPausedState();
			return;
		}
		if (!this.paused) {
			this.#playerEl.pause();
		} else {
			this.#updateProgress();
			this.#playerEl!.play();
		}
		this.#setPausedState();
	};

	#updateProgress = () => {
		Observable.notify(this, 'currentTime');

		const duration = this.duration;
		const currentTime = this.currentTime;
		const isValid =
			Number.isFinite(duration) &&
			duration > 0 &&
			Number.isFinite(currentTime) &&
			currentTime >= 0;
		const percent = isValid ? (currentTime / duration) * 100 : 0;

		/* v8 ignore else -- @preserve */
		if (this.#sliderEl) {
			this.#isProgrammaticSliderUpdate = true;
			this.#sliderEl.value = percent.toString();
			this.#isProgrammaticSliderUpdate = false;
		}
		if (isValid && percent === 100) {
			this.pause();
		}
	};

	#updateTotalTime = () => {
		Observable.notify(this, 'duration');

		// If duration is not valid, trigger fallback
		if (
			!Number.isFinite(this.#playerEl.duration) ||
			this.#playerEl.duration <= 0
		) {
			if (this.durationFallback) {
				this.#fetchAndCacheAudioBuffer();
			}
		}
	};

	#dragInterval?: number;

	#updateCurrentTimeOnSliderChange = () => {
		if (!this.paused && this.#sliderEl!.isDragging) {
			this.pause();
			this.#dragInterval = window.setInterval(() => {
				if (!this.#sliderEl!.isDragging) {
					clearInterval(this.#dragInterval);
					this.play();
				}
			}, 0);
		}

		if (this.#isProgrammaticSliderUpdate) {
			return;
		}

		/* v8 ignore else -- @preserve */
		if (this.#playerEl) {
			this.currentTime = (this.duration * Number(this.#sliderEl!.value)) / 100;
		}
	};

	#setPausedState = () => {
		Observable.notify(this, 'paused');
	};

	/**
	 * Skips the current time by the skipBy value
	 *
	 * @param skipDirection - the direction to skip
	 *
	 * @internal
	 */
	skip(skipDirection: SKIP_DIRECTIONS_TYPE) {
		const currentTime = this.currentTime;
		const skipValue = parseInt(this.skipBy!) * skipDirection;
		const newTime = currentTime + skipValue;

		this.currentTime = Math.max(0, Math.min(this.duration, newTime));
	}
}
