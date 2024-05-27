/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, Observable, type ValueConverter } from '@microsoft/fast-element';
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

export const SKIP_DIRECTIONS = {
	FORWARD: 1,
	BACKWARD: -1
};

export type SKIP_DIRECTIONS_TYPE = typeof SKIP_DIRECTIONS[keyof typeof SKIP_DIRECTIONS];

function formatTime(time: number) {
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return min + ':' + (sec < 10 ? '0' + sec : sec);
}

const PAUSE = true;
const PLAY = false;
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

	get paused(): boolean {
		Observable.track(this, 'paused');
		return this.#playerEl.paused;
	}

	set paused(value) {
		value;
	}

	get duration() {
		Observable.track(this, 'duration');
		return this.#playerEl.duration;
	}

	set duration(value) {
		value;
	}

	get #sliderEl(): Slider | null | undefined {
		return this.shadowRoot?.querySelector('.slider');
	}

	#playerEl = new Audio();

	get #timeStampEl(): HTMLDivElement | null | undefined {
		return this.shadowRoot?.querySelector('.time-stamp');
	}

	constructor() {
		super();
		this.#playerEl.addEventListener('timeupdate', this.#updateProgress);
		this.#playerEl.addEventListener('loadedmetadata', this.#updateTotalTime);
		this.addEventListener('vwc-audio-player:skip', this.#skip as EventListener);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		document.addEventListener('mouseup', this.#rewind);
		this.#setInteractionListeners();
		this.#setPausedState();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		document.addEventListener('mouseup', this.#rewind);
		this.#setInteractionListeners(false);
	}

	play() {
		this.#pausedChanged(PLAY);
	}

	pause() {
		this.#pausedChanged(PAUSE);
	}

 	#setInteractionListeners(add = true) {
		const action = add ? 'addEventListener' : 'removeEventListener';
		this.shadowRoot!.querySelector('.base')![action]('keyup', this.#handleSliderEvent);
		this.shadowRoot!.querySelector('.base')![action]('keydown', this.#handleSliderEvent);
		this.shadowRoot!.querySelector('.base')![action]('mousedown', this.#handleSliderEvent);
	}

	srcChanged() {
		(this.#playerEl.src as any) = this.src;
	}

	#pausedChanged = (pausing = PAUSE) => {
		if (pausing === this.paused) {
			return;
		}
		if (!this.paused) {
			this.#playerEl.pause();
		} else {
			this.#updateProgress();
			this.#playerEl!.play();
		}
		this.#setPausedState();
	}

	#skip = (event: CustomEvent) => {
    const skipDirection: SKIP_DIRECTIONS_TYPE = event.detail;
		if (this.#playerEl) {
			const currentTime = this.#playerEl.currentTime;
			const skipValue = parseInt(this.skipBy!) * skipDirection;
			const newTime = currentTime + skipValue;

			this.#playerEl.currentTime = Math.max(
				0,
				Math.min(this.#playerEl.duration, newTime)
			);
			this.#updateProgress();
		}
	}

	#updateProgress = () =>  {
		let currentTime: HTMLElement | null;
		const current: number = this.#playerEl.currentTime;
		const percent = (current / this.#playerEl.duration) * 100;

		if (this.#sliderEl) {
			this.#sliderEl.value = percent.toString();
			this.#sliderEl.ariaValuetext = formatTime(current);
		}

		if (percent === 100) {
			this.pause();
		}

		if (this.#timeStampEl) {
			currentTime = this.#timeStampEl.querySelector('.current-time');
			if (currentTime) currentTime.textContent = formatTime(current);
		}
	}

	#updateTotalTime = () => {
		let totalTime: HTMLElement | null;
		Observable.notify(this, 'duration');
		if (this.#timeStampEl) {
			totalTime = this.#timeStampEl.querySelector('.total-time');
			if (totalTime)
				totalTime.textContent = formatTime(this.#playerEl.duration);
		}
	}

	#rewind = () => {
		if (this.#playerEl) {
			this.#playerEl.currentTime =
				this.#playerEl.duration * (Number(this.#sliderEl!.value) / 100);
		}
	};

	#handleSliderEvent = (event: Event) => {
		if (event.target === this.#sliderEl) {
			this.pause();
			this.#rewind();
		}

		return true;
	}

	#setPausedState = () => {
		Observable.notify(this, 'paused');
	};
}

export interface AudioPlayer extends Localized {}
applyMixins(AudioPlayer, Localized);

// TODO::add skip method to documentation or make it private
// TODO::consider the document event listener - could we have a bug there? Anyway, cover it with tests
// TODO::handling the slider drag is faulty and buggy - should imitate the native behavior (if playing - keep playing after drag)
// TODO::when setting `src` to '' and then trying tp play it doesn't handle this case... (the rewind function IMO)
