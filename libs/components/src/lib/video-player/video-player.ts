import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import videojs from 'video.js';
import { SkipBy } from '../enums';

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
 */
export class VideoPlayer extends FoundationElement {
	/**
	 * Reference to am image which is displayed before the video is played
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: poster
	 */
	@attr poster?: string;

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
	 * HTML Attribute: text
	 */
	@attr({attribute: 'playback-rates'}) playbackRates: string = "0.5, 1, 1.5, 2";

	/**
	 * Allows the video to loop back to the beginning when finished
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: loop
	 */
	@attr({attribute: 'skip-by'}) skipBy: SkipBy = SkipBy.Ten;

	_player: any;

	override connectedCallback(): void {
		super.connectedCallback();
		
		const videoEle = document.createElement('video');
		const trackEles = this.querySelectorAll('track');
		for(let x = 0; x < trackEles.length; x++) {
			videoEle.appendChild(trackEles[x]);
		}
		const control = this.shadowRoot?.querySelector('.control')
		control?.appendChild(videoEle);
		const srcEles = this.querySelectorAll('source');
		const sources = Array.from(srcEles).map((el) => ({
			src: el.getAttribute('src'),
			type: el.getAttribute('type'),
		}));
		const skipByValue = parseInt(this.skipBy || '0');
		const skipButtons = {
			forward: skipByValue,
			backward: skipByValue,
		};
		this._player = videojs(videoEle, {
			fluid: true,
			sources,
			poster: this.poster,
			controls: true,
			preload: 'auto',
			loop: this.loop ? true : false,
			autoplay: this.autoplay ? 'muted' : false,
			playbackRates: getPlaybackRatesArray(this.playbackRates),
			controlBar: {
				skipButtons: skipByValue > 0 ? skipButtons : false,
				remainingTimeDisplay: { displayNegative: false },
			},
		});
	}

	override disconnectedCallback(): void {
		super.connectedCallback();
		if (this._player) {
			this._player.dispose();
		}
	}
}
