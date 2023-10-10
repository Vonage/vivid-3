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

	draggableClasses = ['pin'];
	currentlyDragged: any = null;

	audioPlayer!: any;
	playPause!: any;
	playpauseBtn!: HTMLElement;
	progress!: any;
	sliders!: HTMLElement[];
	player!: any;
	currentTime!: any;
	totalTime!: any;
	speaker!: any;

	override connectedCallback() {
		super.connectedCallback();

		window.addEventListener('mousedown', this.onMouseDown);

		this.playpauseBtn.addEventListener('click', this.togglePlay);
		this.player.addEventListener('timeupdate', this.updateProgress);
		this.player.addEventListener('loadedmetadata', () => {
			this.totalTime.textContent = this.formatTime(this.player.duration);
		});
		this.player.addEventListener('ended', () => {
			this.playPause.setAttribute('d', 'M18 12L0 24V0');
			this.player.currentTime = 0;
		});

		this.sliders.forEach((slider: HTMLElement) => {
			const pin: any = slider.querySelector('.pin');
			slider.addEventListener('click', window[pin!.dataset.method] as any);
		});
	}

	onMouseDown = (event: any): any => {
		if (!this.isDraggable(event.target)) return false;

		this.currentlyDragged = event.target;
		const handleMethod: any = this.currentlyDragged!.dataset.method;

		this.addEventListener('mousemove', window[handleMethod] as any, false);

		window.addEventListener('mouseup', this.onMouseUp, handleMethod);
	};


	onMouseUp = (handleMethod: any) => {
		this.currentlyDragged = false;
		window.removeEventListener('mousemove', window[handleMethod] as any, false);
	};

	isDraggable = (el: HTMLElement) => {
		let canDrag = false;
		const classes = Array.from(el.classList);
		this.draggableClasses.forEach(draggable => {
			if (classes.indexOf(draggable) !== -1)
				canDrag = true;
		});
		return canDrag;
	};

	inRange = (event: any) => {
		const rangeBox = this.getRangeBox(event);
		const rect = rangeBox.getBoundingClientRect();
		const direction = rangeBox.dataset.direction;
		if (direction == 'horizontal') {
			const min = rangeBox.offsetLeft;
			const max = min + rangeBox.offsetWidth;
			if (event.clientX < min || event.clientX > max) return false;
		} else {
			const min = rect.top;
			const max = min + rangeBox.offsetHeight;
			if (event.clientY < min || event.clientY > max) return false;
		}
		return true;
	};

	updateProgress = () => {
		const current: number = this.player!.currentTime;
		const percent = (current / this.player!.duration) * 100;
		(this.progress as HTMLElement).style.width = percent + '%';

		this.currentTime!.textContent = this.formatTime(current);
	};

	getRangeBox = (event: any) => {
		let rangeBox = event.target;
		const el = this.currentlyDragged;
		if (event.type == 'click' && this.isDraggable(event.target)) {
			rangeBox = event.target.parentElement.parentElement;
		}
		if (event.type == 'mousemove') {
			rangeBox = el!.parentElement!.parentElement;
		}
		return rangeBox;
	};

	getCoefficient = (event: any) => {
		const slider = this.getRangeBox(event);
		const rect = slider.getBoundingClientRect();
		let K = 0;
		if (slider.dataset.direction == 'horizontal') {

			const offsetX = event.clientX - slider.offsetLeft;
			const width = slider.clientWidth;
			K = offsetX / width;

		} else if (slider.dataset.direction == 'vertical') {

			const height = slider.clientHeight;
			const offsetY = event.clientY - rect.top;
			K = 1 - offsetY / height;

		}
		return K;
	};

	rewind = (event: any) => {
		if (this.inRange(event)) {
			this.player!.currentTime = this.player!.duration * this.getCoefficient(event);
		}
	};

	changeVolume = (event: any) => {
		if (this.inRange(event)) {
			this.player!.volume = this.getCoefficient(event);
		}
	};

	formatTime = (time: number) => {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time % 60);
		return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
	};

	togglePlay = () => {
		if (this.player.paused) {
			(this.playPause as HTMLElement).setAttribute('d', 'M0 0h6v24H0zM12 0h6v24h-6z');
			this.player.play();
		} else {
			(this.playPause as HTMLElement).setAttribute('d', 'M18 12L0 24V0');
			this.player.pause();
		}
	};
}