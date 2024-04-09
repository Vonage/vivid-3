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

	get #sliderElement() {
		return this.shadowRoot!.querySelector('.slider') as Slider;
	}

	#nativeAudioPlayer!: HTMLAudioElement;

	@observable duration?: number;

	get #timeStampElement() {
		return this.shadowRoot!.querySelector('.time-stamp') as HTMLDivElement;
	}

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
		if (this.src) {
			this.#nativeAudioPlayer.src = this.src;
		}
		this.#sliderElement.addEventListener('mousedown', this.#handleSliderClick);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#sliderElement.removeEventListener('mousedown', this.#handleSliderClick);
	}

	#updateProgress = () => {
		let currentTime: HTMLElement | null;
		const current: number = this.#nativeAudioPlayer.currentTime;
		const percent = (current / this.#nativeAudioPlayer.duration) * 100;

		if (this.#sliderElement) {
			this.#sliderElement.value = percent.toString();
			this.#sliderElement.ariaValuetext = formatTime(current);
		}

		if (percent === 100) {
			this.paused = true;
		}

		if (this.#timeStampElement) {
			currentTime = this.#timeStampElement.querySelector('.current-time');
			if (currentTime) currentTime.textContent = formatTime(current);
		}
	};

	#updateTotalTime = () => {
		let totalTimeElement: HTMLElement | null;
		this.duration = this.#nativeAudioPlayer.duration;
		if (this.#timeStampElement) {
			totalTimeElement = this.#timeStampElement.querySelector('.total-time');
			if (totalTimeElement) totalTimeElement.textContent = formatTime(this.duration);
		}
	};

	pausedChanged = () => {
		if (this.paused) {
			this.#nativeAudioPlayer!.pause();
		} else {
			this.#updateProgress();
			this.#nativeAudioPlayer!.play();
		}
	};

	#handleSliderMouseUp = () => {
		if (this.#nativeAudioPlayer) {
			const duration = !isNaN(this.#nativeAudioPlayer.duration) ? this.#nativeAudioPlayer.duration : 0;
			const currentTime = duration * (Number(this.#sliderElement.value) / 100);
			this.#nativeAudioPlayer.currentTime = currentTime;
		}
		document.removeEventListener('mouseup', this.#handleSliderMouseUp);
	};

	#handleSliderClick = () => {
		document.addEventListener('mouseup', this.#handleSliderMouseUp);
	};
}

export function formatTime(time: number) {
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
}
export interface AudioPlayer extends Localized { }
applyMixins(AudioPlayer, Localized);

