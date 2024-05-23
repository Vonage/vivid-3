/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable, type ValueConverter } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { MediaSkipBy } from '../enums';
import { Localized } from '../../shared/patterns';
import type { Slider } from '../slider/slider';

/**
 * Types of audio player connotation.
 *
 * @public
 */
export type AudioPlayerConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

function formatTime(time: number) {
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return min + ':' + (sec < 10 ? '0' + sec : sec);
}

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
export class AudioPlayer extends FoundationElement {
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
	skipBy?: MediaSkipBy;

	/**
	 *
	 * @internal
	 */
	@observable paused = true;

	/**
	 *
	 * @internal
	 */
	@observable duration?: number;

	/**
	 * @internal
	 */
	_sliderEl!: Slider;

	#playerEl = new Audio();

	/**
	 * @internal
	 */
	_timeStampEl!: HTMLDivElement;

	constructor() {
		super();
		this.#playerEl.addEventListener('timeupdate', this.#updateProgress);
		this.#playerEl.addEventListener('loadedmetadata', this.#updateTotalTime);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		document.addEventListener('mouseup', this._rewind);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		document.addEventListener('mouseup', this._rewind);
	}

	srcChanged() {
		(this.#playerEl.src as any) = this.src;
	}

	pausedChanged = () => {
		if (this.paused) {
			this.#playerEl.pause();
		} else {
			this.#updateProgress();
			this.#playerEl!.play();
		}
	}

	/**
	 * @internal
	 */
	_onSkipButtonClick(isForward: boolean) {
		if (this.#playerEl) {
			const currentTime = this.#playerEl.currentTime;
			const skipDirection = isForward ? 1 : -1; // Positive for forward, negative for backward
			const skipValue = parseInt(this.skipBy!) * skipDirection;
			const newTime = currentTime + skipValue;

			this.#playerEl.currentTime = Math.max(
				0,
				Math.min(this.#playerEl.duration, newTime)
			);
			this.#updateProgress(); // Update progress after skipping
		}
	}
	/**
	 * @internal
	 */
	#updateProgress = () =>  {
		let currentTime: HTMLElement | null;
		const current: number = this.#playerEl.currentTime;
		const percent = (current / this.#playerEl.duration) * 100;

		if (this._sliderEl) {
			this._sliderEl.value = percent.toString();
			this._sliderEl.ariaValuetext = formatTime(current);
		}

		if (percent === 100) {
			this.paused = true;
		}

		if (this._timeStampEl) {
			currentTime = this._timeStampEl.querySelector('.current-time');
			if (currentTime) currentTime.textContent = formatTime(current);
		}
	}

	/**
	 * @internal
	 */
	#updateTotalTime = () => {
		let totalTime: HTMLElement | null;
		if (this.#playerEl) this.duration = this.#playerEl.duration;
		if (this._timeStampEl) {
			totalTime = this._timeStampEl.querySelector('.total-time');
			if (totalTime)
				totalTime.textContent = formatTime(this.#playerEl.duration);
		}
	}

	/**
	 * @internal
	 */
	_rewind = () => {
		if (this.#playerEl) {
			this.#playerEl.currentTime =
				this.#playerEl.duration * (Number(this._sliderEl.value) / 100);
		}
	};

	/**
	 * @internal
	 */
	_handleSliderEvent(event: Event) {
		if (event.target === this._sliderEl) {
			this.paused = true;
			if (this.#playerEl) {
				this.#playerEl.pause();
			}
			this._rewind();
		}

		return true;
	}

}

export interface AudioPlayer extends Localized {}
applyMixins(AudioPlayer, Localized);

// TODO::add paused to documentation
// TODO::remove all `_` and set them as private (not always trivial)
