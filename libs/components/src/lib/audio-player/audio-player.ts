/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';
import type { Slider } from '../slider/slider';

/**
 * Types of audio player connotation.
 *
 * @public
 */
export type AudioPlayerConnotation = Extract<Connotation, | Connotation.Accent | Connotation.CTA>;

/**
 * Base class for audio-player
 *
 * @public
 */

export class AudioPlayer extends FoundationElement {
	@attr({ attribute: 'play-button-aria-label' }) playButtonAriaLabel: string | null = null;
	@attr({ attribute: 'pause-button-aria-label' }) pauseButtonAriaLabel: string | null = null;
	@attr({ attribute: 'slider-aria-label' }) sliderAriaLabel: string | null = null;
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

	@attr({ converter: nullableNumberConverter }) duration?: number;

	/**
	 *
	 * @public
	 * HTML Attribute: notime
	 */
	@attr({ mode: 'boolean' }) notime = false;

	/**
	 *
	 * @internal
	 */
	@observable paused = true;

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
	_updateProgress() {
		const current: number = this._playerEl.currentTime;
		const percent = (current / this._playerEl.duration) * 100;

		if (this._sliderEl) {
			this._sliderEl.value = percent.toString();
			this._sliderEl.ariaValuetext = this._formatTime(current);
		}
		const currentTime = this._timeStampEl.querySelector('.current-time');
		if (currentTime) currentTime.textContent = this._formatTime(current);

		if (percent === 100) {
			this.paused = true;
		}
	}

	/**
	 * @internal
	 */
	_updateTotalTime() {
		const totalTime = this._timeStampEl.querySelector('.total-time');
		if (totalTime) totalTime.textContent = this._formatTime(this._playerEl.duration);
		if (this._playerEl) this.duration = this._playerEl.duration;
	}

	/**
	 * @internal
	 */
	_rewind() {
		this._playerEl.pause();
		this.paused = true;
		this._playerEl.currentTime = this._playerEl.duration * (Number(this._sliderEl.value) / 100);
	}

	/**
	 * @internal
	 */
	_formatTime(time: number) {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	}
}

export interface AudioPlayer extends Localized { }
applyMixins(AudioPlayer, Localized);
