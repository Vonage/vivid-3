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

	// TODO: 1. comment it as its not functional, 2. change it string - same as video-player
	/**
	 *
	 * @public
	 * HTML Attribute: playback speed
	 */
	@attr({ mode: 'boolean', attribute: 'playback-rates' }) playbackRates = false;

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

	/**
	 * @internal
	 */
	_playerEl!: any;

	/**
	 * @internal
	 */
	_timeStampEl!: HTMLDivElement;

	override connectedCallback(): void {
		super.connectedCallback();
		document.addEventListener('mouseup', this._rewind);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		document.addEventListener('mouseup', this._rewind);
	}

	/**
	 * @internal
	 */
	_togglePlay() {
		if (this.paused) {
			this._updateProgress();
			this._playerEl!.play();
		} else {
			this._playerEl!.pause();
		}
		this.paused = !this.paused;
	}

	/**
	 * @internal
	 */
	_onSkipButtonClick(isForward: boolean) {
		if (this._playerEl) {
			const currentTime = this._playerEl.currentTime;
			const skipDirection = isForward ? 1 : -1; // Positive for forward, negative for backward
			const skipValue = parseInt(this.skipBy!) * skipDirection;
			const newTime = currentTime + skipValue;

			this._playerEl.currentTime = Math.max(
				0,
				Math.min(this._playerEl.duration, newTime)
			);
			this._updateProgress(); // Update progress after skipping
		}
	}
	/**
	 * @internal
	 */
	_updateProgress() {
		let currentTime: HTMLElement | null;
		const current: number = this._playerEl.currentTime;
		const percent = (current / this._playerEl.duration) * 100;

		if (this._sliderEl) {
			this._sliderEl.value = percent.toString();
			this._sliderEl.ariaValuetext = this._formatTime(current);
		}

		if (percent === 100) {
			this.paused = true;
		}

		if (this._timeStampEl) {
			currentTime = this._timeStampEl.querySelector('.current-time');
			if (currentTime) currentTime.textContent = this._formatTime(current);
		}
	}

	/**
	 * @internal
	 */
	_updateTotalTime() {
		let totalTime: HTMLElement | null;
		if (this._playerEl) this.duration = this._playerEl.duration;
		if (this._timeStampEl) {
			totalTime = this._timeStampEl.querySelector('.total-time');
			if (totalTime)
				totalTime.textContent = this._formatTime(this._playerEl.duration);
		}
	}

	/**
	 * @internal
	 */
	_rewind = () => {
		if (this._playerEl) {
			this._playerEl.currentTime =
				this._playerEl.duration * (Number(this._sliderEl.value) / 100);
		}
	};

	/**
	 * @internal
	 */
	_handleSliderEvent(event: Event) {
		if (event.target === this._sliderEl) {
			this.paused = true;
			if (this._playerEl) {
				this._playerEl.pause();
			}
			this._rewind();
		}

		return true;
	}

	/**
	 * @internal
	 */
	_formatTime(time: number) {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + (sec < 10 ? '0' + sec : sec);
	}
}

export interface AudioPlayer extends Localized {}
applyMixins(AudioPlayer, Localized);
