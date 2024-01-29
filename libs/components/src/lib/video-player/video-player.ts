import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import videojs from 'video.js';

function getPlaybackRatesArray(playbackRates: string | undefined): number[] {
	const defaultRates = [0.5, 1, 1.5, 2];
	if (playbackRates === undefined) return defaultRates;
	if (playbackRates === '') return [];
	const ratesArray: number[] = [];
	
	playbackRates.split(',').forEach((numStr: string) => {
		const num = Number(numStr);
		if (!isNaN(num)) ratesArray.push(num);
	});
	return ratesArray.length ? ratesArray : defaultRates;
}

/**
 * Base class for video-player
 *
 * @public
 */
export class VideoPlayer extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr poster?: string;

	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr autoplay?: boolean;

	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr({attribute: 'playback-rates'}) playbackRates?: string;

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
		this._player = videojs(videoEle, {
			sources,
			poster: this.poster,
			controls: true,
			preload: 'auto',
			autoplay: this.autoplay ? 'muted' : false,
			playbackRates: getPlaybackRatesArray(this.playbackRates),
		}, () => {
			control?.classList.add('ready');
		});
	}

	override disconnectedCallback(): void {
		super.connectedCallback();
		if (this._player) {
			this._player.dispose();
		}
	}
}
