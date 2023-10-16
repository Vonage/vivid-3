/* eslint-disable max-len */
import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums';

/**
 * Types of badge connotation.
 *
 * @public
 */
export type BadgeConnotation = Extract<Connotation, | Connotation.Accent | Connotation.CTA>;

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

	_playerEl!: HTMLAudioElement;

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('mouseup', this.#onMouseUp);
	}

	onMouseDown = (_event: MouseEvent): any => {
		this.addEventListener('mousemove', this.rewind, false);
		window.addEventListener('mouseup', this.#onMouseUp);
	};

	togglePlay = () => {
		if (this.paused) {
			this._playerEl.play();
		} else {
			this._playerEl.pause();
		}
		this.paused = !this.paused;
	};

	updateProgress = () => {
		const current: number = this._playerEl.currentTime;
		const percent = (current / this._playerEl.duration) * 100;
		(this._sliderEl.querySelector('.progress') as HTMLElement).style.width = percent + '%';

		const currentTime: HTMLSpanElement | null | undefined = this.shadowRoot?.querySelector('.current-time');
		if (currentTime) currentTime.textContent = this.#formatTime(current);
	};

	updateTotalTime = () => {
		const totalTime: HTMLSpanElement | null | undefined = this.shadowRoot?.querySelector('.total-time');
		if (totalTime) totalTime.textContent = this.#formatTime(this._playerEl.duration);
	};

	rewind = (event: MouseEvent) => {
		if (this.#inRange(event) && this._playerEl) {
			this._playerEl.currentTime = (this._playerEl.duration * this.#getCoefficient(event) as number);
		}
	};

	#getCoefficient = (event: MouseEvent) => {
		const offsetX = event.clientX - this._sliderEl.offsetLeft;
		const width = this._sliderEl.clientWidth;
		return offsetX / width;
	};

	#onMouseUp = () => {
		this.removeEventListener('mousemove', this.rewind, false);
		window.removeEventListener('mouseup', this.#onMouseUp);
	};

	#inRange = (event: MouseEvent) => {
		const min = this._sliderEl.offsetLeft;
		const max = min + this._sliderEl.offsetWidth;
		if (event.clientX < min || event.clientX > max) return false;
		return true;
	};

	#formatTime = (time: number) => {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	};
}