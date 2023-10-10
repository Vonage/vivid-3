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

	currentlyDragged: any = null;

	playpauseBtn!: HTMLElement;
	progress!: any;
	slider!: HTMLElement;
	player!: any;
	currentTime!: any;
	totalTime!: any;
	pin!: HTMLElement;

	override connectedCallback() {
		super.connectedCallback();

		window.addEventListener('mousedown', this.onMouseDown);

		this.playpauseBtn.addEventListener('click', this.togglePlay);
		this.player.addEventListener('timeupdate', this.updateProgress);
		this.player.addEventListener('loadedmetadata', () => {
			this.totalTime.textContent = this.formatTime(this.player.duration);
		});
		this.player.addEventListener('ended', () => {
			//this.playPause.setAttribute('d', 'M18 12L0 24V0');
			this.player.currentTime = 0;
		});

		this.slider.addEventListener('click', this.rewind);
	}

	onMouseDown = (event: any): any => {
		if (event.target !== this.pin) return;

		this.currentlyDragged = event.target;
		this.addEventListener('mousemove', this.rewind, false);
		window.addEventListener('mouseup', this.onMouseUp);
	};


	onMouseUp = () => {
		this.currentlyDragged = false;
		window.removeEventListener('mousemove', this.rewind, false);
	};

	inRange = (event: any) => {
		const min = this.slider.offsetLeft;
		const max = min + this.slider.offsetWidth;
		if (event.clientX < min || event.clientX > max) return false;
		return true;
	};

	updateProgress = () => {
		const current: number = this.player.currentTime;
		const percent = (current / this.player.duration) * 100;
		(this.progress as HTMLElement).style.width = percent + '%';

		this.currentTime.textContent = this.formatTime(current);
	};

	getCoefficient = (event: any) => {
		const offsetX = event.clientX - this.slider.offsetLeft;
		const width = this.slider.clientWidth;
		return offsetX / width;
	};

	rewind = (event: any) => {
		if (this.inRange(event)) {
			this.player.currentTime = this.player.duration * this.getCoefficient(event);
		}
	};

	formatTime = (time: number) => {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	};

	togglePlay = () => {
		if (this.player.paused) {
			//(this.playPause as HTMLElement).setAttribute('d', 'M0 0h6v24H0zM12 0h6v24h-6z');
			this.player.play();
		} else {
			//(this.playPause as HTMLElement).setAttribute('d', 'M18 12L0 24V0');
			this.player.pause();
		}
	};
}