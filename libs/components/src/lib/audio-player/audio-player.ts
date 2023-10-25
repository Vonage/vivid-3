/* eslint-disable max-len */
import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums';

/**
 * Types of audio player connotation.
 *
 * @public
 */
export type AudioPlayerConnotation = Extract<Connotation, | Connotation.Accent | Connotation.CTA>;

const PADDING = 16;
/**
 * Base class for audio-player
 *
 * @public
 */
export class AudioPlayer extends FoundationElement {
	/**
	 * The connotation the audio-player should have.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr connotation?: BadgeConnotation;
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
	 * HTML Attribute: timestamp
	 */
	@attr({ mode: 'boolean' }) timestamp = false;

	/**
	 *
	 * @public
	 * HTML Attribute: noseek
	 */
	@attr({ mode: 'boolean' }) noseek = false;

	/**
	 *
	 * @internal
	 */
	@observable paused = true;

	/**
	 * @internal
	 */
	_sliderEl!: HTMLDivElement;

	/**
	 * @internal
	 */
	_playerEl!: any;

	/**
	 * @internal
	 */
	_controlEl!: HTMLDivElement;

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('mouseup', this._onMouseUp);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('mouseup', this._onMouseUp);
	}

	/**
	 * @internal
	 */
	_onMouseDown(_event: MouseEvent) {
		this.addEventListener('mousemove', this._rewind, false);
	}

	/**
	 * @internal
	 */
	_togglePlay() {
		if (this.paused) {
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
		const current: number = this._playerEl!.currentTime;
		const percent = (current / this._playerEl.duration) * 100;
		const progress = this._controlEl.querySelector('.progress') as HTMLElement;
		if (progress) progress.style.width = percent + '%';

		const currentTime = this._controlEl.querySelector('.current-time');
		if (currentTime) currentTime.textContent = this._formatTime(current);
	}

	/**
	 * @internal
	 */
	_updateTotalTime() {
		const totalTime = this._controlEl.querySelector('.total-time');
		if (totalTime) totalTime.textContent = this._formatTime(this._playerEl.duration);
	}

	/**
	 * @internal
	 */
	_rewind(event: MouseEvent) {
		if (this._inRange(event) && this._playerEl.duration) {
			this._playerEl.currentTime = this._playerEl.duration * this._getCoefficient(event);
		}
	}

	/**
	 * @internal
	 */
	_getCoefficient(event: MouseEvent) {
		const offsetX = event.clientX - this._sliderEl.offsetLeft - PADDING;
		const width = this._sliderEl.clientWidth;
		return offsetX / width;
	}

	/**
	 * @internal
	 */
	_onMouseUp() {
		this.removeEventListener('mousemove', this._rewind, false);
	}

	/**
	 * @internal
	 */
	_inRange(event: MouseEvent) {
		const min = this._sliderEl.offsetLeft + PADDING;
		const max = min + this._sliderEl.offsetWidth;
		if (event.clientX < min || event.clientX > max) return false;
		return true;
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