/* eslint-disable max-len */
import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
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
	 * Indicates the audio player's type.
	 *
	 * @public
	 */
	@attr type?: string;

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
	 * @public
	 * HTML Attribute: paused
	 */
	@attr({ mode: 'fromView' }) paused = true;

	/**
	 * @internal
	 */
	private player!: HTMLAudioElement;

	/**
	 * @internal
	 */
	private slider!: HTMLDivElement;

	override connectedCallback() {
		super.connectedCallback();

		this.player = this.shadowRoot?.querySelector('audio') as HTMLAudioElement;
		this.slider = this.shadowRoot?.querySelector('.slider') as HTMLDivElement;
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('mouseup', this.#onMouseUp);
	}

	onMouseDown = (): any => {
		this.addEventListener('mousemove', this.rewind, false);
		window.addEventListener('mouseup', this.#onMouseUp);
	};

	togglePlay = () => {
		if (this.paused) {
			this.player.play();
		} else {
			this.player.pause();
		}
		this.paused = !this.paused;
	};

	updateProgress = () => {
		const current: number = this.player.currentTime;
		const percent = (current / this.player.duration) * 100;
		(this.slider.querySelector('.progress') as HTMLElement).style.width = percent + '%';

		const currentTime: HTMLSpanElement | null | undefined = this.shadowRoot?.querySelector('.current-time');
		if (currentTime) currentTime.textContent = this.#formatTime(current);
	};

	updateTotalTime = () => {
		const totalTime: HTMLSpanElement | null | undefined = this.shadowRoot?.querySelector('.total-time');
		if (totalTime) totalTime.textContent = this.#formatTime(this.player.duration);
	};

	rewind = (event: MouseEvent) => {
		if (this.#inRange(event) && this.player) {
			this.player.currentTime = this.player.duration * this.#getCoefficient(event);
		}
	};

	#getCoefficient = (event: MouseEvent) => {
		const offsetX = event.clientX - this.slider.offsetLeft;
		const width = this.slider.clientWidth;
		return offsetX / width;
	};

	#onMouseUp = () => {
		this.removeEventListener('mousemove', this.rewind, false);
		window.removeEventListener('mouseup', this.#onMouseUp);
	};

	#inRange = (event: MouseEvent) => {
		const min = this.slider.offsetLeft;
		const max = min + this.slider.offsetWidth;
		if (event.clientX < min || event.clientX > max) return false;
		return true;
	};

	#formatTime = (time: number) => {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	};
}