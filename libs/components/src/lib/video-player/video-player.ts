import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import videojs from 'video.js';
import { MediaSkipBy } from '../enums';
import { Localized } from '../../shared/patterns';

export const DEFAULT_PLAYBACK_RATES = '0.5, 1, 1.5, 2';

function getPlaybackRatesArray(playbackRates: string): number[] {
	if (playbackRates === '') return [];
	const ratesArray: number[] = [];
	
	playbackRates.split(',').forEach((numStr: string) => {
		const num = Number(numStr);
		if (!isNaN(num)) ratesArray.push(num);
	});
	return ratesArray;
}

/**
 * Base class for video-player
 *
 * @public
 * @slot - Default slot
 * @event play - Fired when the video is played
 * @event pause - Fired when the video is paused
 * @event ended - Fired when the video is ended
 */
export class VideoPlayer extends FoundationElement {
	/**
	 * Reference to an image which is displayed before the video is played
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: poster
	 */
	@attr poster?: string;

	/**
	 * URL of a video file
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: src
	 */
	@attr src?: string;

	/**
	 * @internal
	 */
	srcChanged() {
		if (this.player) {
			this.initialiseVideo();
		}
	}

	/**
	 * Allows the video will play automatically (muted)
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autoplay
	 */
	@attr({ mode: 'boolean' }) autoplay = false;

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: loop
	 */
	@attr({ mode: 'boolean' }) loop = false;

	/**
	 * Sets the available playback rates. When an empty string, no choices will be available
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: playback-rates
	 */
	@attr({attribute: 'playback-rates', mode: 'fromView'}) playbackRates: string = DEFAULT_PLAYBACK_RATES;

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: skip-by
	 */
	@attr({attribute: 'skip-by', mode: 'fromView'}) skipBy: MediaSkipBy = MediaSkipBy.Ten;

	/**
	 * @internal
	 */
	player: any;

	/**
	 * @internal
	 */
	videoEle: any;

	override connectedCallback(): void {
		super.connectedCallback();
		
		this.initialiseVideo();
	}

	override disconnectedCallback(): void {
		super.connectedCallback();
		if (this.player) {
			this.player.dispose();
		}
	}

	/**
	 * @internal
	 */
	getSettings() {
		const srcEles = this.querySelectorAll('source');
		const sources = this.src 
			? [{ src: this.src }]
			: Array.from(srcEles).map((el) => ({
				src: el.getAttribute('src'),
				type: el.getAttribute('type'),
			}));
		const skipByValue = parseInt(this.skipBy);
		const skipButtons = {
			forward: skipByValue,
			backward: skipByValue,
		};
		return {
			languages: {
				current: this.locale.videoPlayer,
			},
			experimentalSvgIcons: true,
			language: 'current',
			fluid: true,
			sources,
			poster: this.poster,
			controls: true,
			muted: this.autoplay,
			preload: 'auto',
			playbackRates: getPlaybackRatesArray(this.playbackRates),
			controlBar: {
				skipButtons: skipByValue > 0 ? skipButtons : false,
				remainingTimeDisplay: { displayNegative: false },
			},
		};
	}

	/**
	 * @internal
	 */
	initialiseVideo() {
		const settings = this.getSettings();
		if (this.player) this.player.dispose();

		this.videoEle = document.createElement('video');
		const trackEles = this.querySelectorAll('track');
		for(let x = 0; x < trackEles.length; x++) {
			this.videoEle.appendChild(trackEles[x]);
		}
		if (this.loop) this.videoEle.setAttribute('loop', '');
		if (this.autoplay) this.videoEle.setAttribute('autoplay', '');
		const control = this.shadowRoot!.querySelector('.control');
		control!.appendChild(this.videoEle);

		this.player = videojs(this.videoEle, settings);
		this.shadowRoot!.querySelector('[lang]')!.removeAttribute('lang'); // removes lang="current" from the component
		
		this.player.on('play', () => this.$emit('play'));
		this.player.on('pause', () => this.$emit('pause'));
		this.player.on('ended', () => this.$emit('ended'));
	}
}

export interface VideoPlayer extends Localized { }
applyMixins(VideoPlayer, Localized);