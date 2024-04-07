/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
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
 * @public
 * @component audio-player
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
	 *
	 * @internal
	 */
	@observable duration?: number;

	/**
	 * @internal
	 */
	_sliderEl!: Slider;

	#nativeAudioPlayer!: HTMLAudioElement;

	/**
	 * @internal
	 */
	_timeStampEl!: HTMLDivElement;

	srcChanged(_: string, newSrc: string) {
		if (!this.#nativeAudioPlayer) {
			return;
		}
		this.#nativeAudioPlayer.src = newSrc;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#nativeAudioPlayer = new Audio();
		this.#nativeAudioPlayer.addEventListener('timeupdate', this.#updateProgress);
		this.#nativeAudioPlayer.addEventListener('loadedmetadata', this.#updateTotalTime);
		this.addEventListener('keydown', this._rewind);
		this.addEventListener('mousedown', this._rewind);
		this.addEventListener('keyup', this._rewind);
		document.addEventListener('mouseup', this._rewind);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._rewind);
		this.removeEventListener('mousedown', this._rewind);
		this.removeEventListener('keyup', this._rewind);
		document.removeEventListener('mouseup', this._rewind);
	}

	/**
	 * @internal
	 */
	_togglePlay() {
		if (this.paused) {
			this.#updateProgress();
			this.#nativeAudioPlayer!.play();
		} else {
			this.#nativeAudioPlayer!.pause();
		}
		this.paused = !this.paused;
	}

	/**
	 * @internal
	 */
	#updateProgress = () => {
		let currentTime: HTMLElement | null;
		const current: number = this.#nativeAudioPlayer.currentTime;
		const percent = (current / this.#nativeAudioPlayer.duration) * 100;

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
	#updateTotalTime = () => {
		let totalTime: HTMLElement | null;
		if (this.#nativeAudioPlayer) this.duration = this.#nativeAudioPlayer.duration;
		if (this._timeStampEl) {
			totalTime = this._timeStampEl.querySelector('.total-time');
			if (totalTime) totalTime.textContent = this._formatTime(this.#nativeAudioPlayer.duration);
		}
	}

	/**
	 * @internal
	 */
	_rewind = () => {
		this.paused = true;
		if (this.#nativeAudioPlayer) {
			this.#nativeAudioPlayer.pause();
			this.#nativeAudioPlayer.currentTime = this.#nativeAudioPlayer.duration * (Number(this._sliderEl.value) / 100);
		}
	};

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
