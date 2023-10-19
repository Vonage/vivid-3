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
	sliderEl!: HTMLDivElement;

	playerEl!: any;

	controlEl!: HTMLDivElement;

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('mouseup', this.onMouseUp);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('mouseup', this.onMouseUp);
	}

	onMouseDown(_event: MouseEvent) {
		this.addEventListener('mousemove', this.rewind, false);
	}

	togglePlay() {
		if (this.paused) {
			this.playerEl!.play();
		} else {
			this.playerEl!.pause();
		}
		this.paused = !this.paused;
	}

	updateProgress() {
		const current: number = this.playerEl!.currentTime;
		const percent = (current / this.playerEl.duration) * 100;
		(this.sliderEl.querySelector('.progress') as HTMLElement).style.width = percent + '%';

		this.controlEl.querySelector('.current-time')!.textContent = this.formatTime(current);
	}

	updateTotalTime() {
		const totalTime = this.controlEl.querySelector('.total-time');
		if (totalTime) totalTime.textContent = this.formatTime(this.playerEl.duration);
	}

	rewind(event: MouseEvent) {
		if (this.inRange(event)) {
			this.playerEl.currentTime = this.playerEl.duration * this.getCoefficient(event);
		}
	}

	getCoefficient(event: MouseEvent) {
		const offsetX = event.clientX - this.sliderEl.offsetLeft;
		const width = this.sliderEl.clientWidth;
		return offsetX / width;
	}

	onMouseUp() {
		this.removeEventListener('mousemove', this.rewind, false);
	}

	inRange(event: MouseEvent) {
		const min = this.sliderEl!.offsetLeft;
		const max = min + this.sliderEl!.offsetWidth;
		if (event.clientX < min || event.clientX > max) return false;
		return true;
	}

	formatTime(time: number) {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	}
}