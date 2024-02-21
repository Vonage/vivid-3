import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import videojs from 'video.js';
import { SkipBy } from '../enums';
import { Localized } from '../../shared/patterns';
import { iconFontStyles } from './IconFontStyles';

function getPlaybackRatesArray(playbackRates: string): number[] {
	if (playbackRates === '') return [];
	const ratesArray: number[] = [];
	
	playbackRates.split(',').forEach((numStr: string) => {
		const num = Number(numStr);
		if (!isNaN(num)) ratesArray.push(num);
	});
	return ratesArray;
}

const installIconFontStyle = (document: Document) => {
	if (!document.head.querySelector('#vjs-icons')) {
		const iconStyle = document.createElement('style');
		iconStyle.id = 'vjs-icons';
		document.head.appendChild(iconStyle);
		iconStyle.sheet!.insertRule(iconFontStyles, 0);
	}
};

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
	 * Allows the video will play automatically (muted)
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autoplay
	 */
	@attr autoplay?: boolean;

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: loop
	 */
	@attr loop?: boolean;

	/**
	 * Sets the available playback rates. When an empty string, no choices will be available
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: playback-rates
	 */
	@attr({attribute: 'playback-rates', mode: 'fromView'}) playbackRates: string = '0.5, 1, 1.5, 2';

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: skip-by
	 */
	@attr({attribute: 'skip-by', mode: 'fromView'}) skipBy: SkipBy = SkipBy.Ten;

	_player: any;
	_settings: any;
	

	override connectedCallback(): void {
		super.connectedCallback();
		installIconFontStyle(document);
		
		const videoEle = document.createElement('video');
		const trackEles = this.querySelectorAll('track');
		for(let x = 0; x < trackEles.length; x++) {
			videoEle.appendChild(trackEles[x]);
		}
		const control = this.shadowRoot!.querySelector('.control');
		control!.appendChild(videoEle);
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

		this._settings = {
			languages: {
				current: this.locale.videoPlayer,
			},
			language: 'current',
			fluid: true,
			sources,
			poster: this.poster,
			controls: true,
			preload: 'auto',
			loop: !!this.loop,
			autoplay: this.autoplay ? 'muted' : false,
			playbackRates: getPlaybackRatesArray(this.playbackRates),
			controlBar: {
				skipButtons: skipByValue > 0 ? skipButtons : false,
				remainingTimeDisplay: { displayNegative: false },
			},
		};
		
		this._player = videojs(videoEle, this._settings);
		// removes lang="current" from the component
		this.shadowRoot!.querySelector('[lang]')!.removeAttribute('lang');

		this._player.on('play', () => this.$emit('play'));
		this._player.on('pause', () => this.$emit('pause'));
		this._player.on('ended', () => this.$emit('ended'));
	}

	override disconnectedCallback(): void {
		super.connectedCallback();
		if (this._player) {
			this._player.dispose();
		}
	}
}

export interface VideoPlayer extends Localized { }
applyMixins(VideoPlayer, Localized);