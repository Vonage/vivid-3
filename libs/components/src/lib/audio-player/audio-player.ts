/* eslint-disable max-len */
import { attr, Observable, type ValueConverter } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { MediaSkipBy } from '../enums';
import { Localized } from '../../shared/patterns';
import type { Slider } from '../slider/slider';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

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
	typeof SKIP_DIRECTIONS[keyof typeof SKIP_DIRECTIONS];

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

	get playbackRate() {
		Observable.track(this, 'playbackRate');
		return this.#playerEl.playbackRate;
	}

	set playbackRate(value) {
		this.#playerEl.playbackRate = value;
		Observable.notify(this, 'playbackRate');
	}

	srcChanged() {
		if (this.src === undefined) {
			this.#playerEl.removeAttribute('src');
		} else {
			this.#playerEl.src = this.src;
		}
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

	get duration() {
		Observable.track(this, 'duration');
		return this.#playerEl.duration;
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

	constructor() {
		super();
		this.#playerEl.addEventListener('timeupdate', this.#updateProgress);
		this.#playerEl.addEventListener('loadedmetadata', this.#updateTotalTime);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#setSliderInteractionListeners();
		this.#setPausedState();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#setSliderInteractionListeners(false);
		this.pause();
	}

	play() {
		this.#pausedChanged(PLAY);
	}

	pause() {
		this.#pausedChanged(PAUSE);
	}

	#setSliderInteractionListeners(add = true) {
		const action = add ? 'addEventListener' : 'removeEventListener';
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

	#currentTimeChanged = false;
	#updateProgress = () => {
		this.#currentTimeChanged = true;
		Observable.notify(this, 'currentTime');
		const percent = (this.currentTime / this.duration) * 100;
		this.#sliderEl!.currentValue = percent.toString();
		if (percent === 100) {
			this.pause();
		}
	};

	#updateTotalTime = () => {
		Observable.notify(this, 'duration');
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

		if (!this.#currentTimeChanged && this.#playerEl) {
			this.currentTime = (this.duration * Number(this.#sliderEl!.value)) / 100;
		}
		this.#currentTimeChanged = false;
	};

	#setPausedState = () => {
		Observable.notify(this, 'paused');
	};
}
