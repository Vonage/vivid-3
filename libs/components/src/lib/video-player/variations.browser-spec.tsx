import { table, variationTest } from '@repo/browser-tests/variation-test';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { videoPlayerDefinition } from './definition';

const VideoPlayer = component(videoPlayerDefinition);

// Minimal valid WebM (VP8, 2×2px black, 40ms, 475 bytes).
// Generated with: ffmpeg -f lavfi -i 'color=black:s=2x2:d=0.04' -c:v libvpx -b:v 100k -an -frames:v 1 -y tiny.webm
const tinyVideoDataUrl =
	'data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAGrEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggETTbuMU6uEHFO7a1OsggGV7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8iuAQAAAAAAAD/XgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA4g4EBI+ODhAJiWgDgkLCBArqBApqBAlWwhFW5gQESVMNn0HNzzWPAi2PFiAAAAAAAAAABZ8iYRaOHRU5DT0RFUkSHi0xhdmMgbGlidnB4Z8ihRaOIRFVSQVRJT05Eh5MwMDowMDowMC4wNDAwMDAwMDAAH0O2dajngQCjo4EAAIAQAgCdASoCAAIAAEcIhYWIhYSIAgIADA1gAP7/q1CAHFO7a5G7j7OBALeK94EB8YIBaPCBAw==';

// Tiny 1×1 green PNG used as a poster image
const tinyPosterDataUrl =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Minimal VTT data URLs for text track testing.
// Subtitles: a single cue covering the clip, provided in two languages.
// Chapters: two cues that video.js parses to populate the chapters menu.
//
// Note: WebKit does not support data: URLs for <track> elements, and the
// video element also has crossorigin="anonymous" which makes WebKit even
// stricter. Blob URLs are same-origin and work in all browsers.
function vttBlobUrl(content: string): string {
	return URL.createObjectURL(new Blob([content], { type: 'text/vtt' }));
}
const subtitlesEnDataUrl = vttBlobUrl(
	'WEBVTT\n\n00:00:00.000 --> 00:00:30.000\nEnglish subtitle'
);
const subtitlesJpDataUrl = vttBlobUrl(
	'WEBVTT\n\n00:00:00.000 --> 00:00:30.000\nJapanese subtitle'
);
const chaptersDataUrl = vttBlobUrl(
	'WEBVTT\n\n00:00:00.000 --> 00:00:20.000\nIntroduction\n\n00:00:20.000 --> 00:01:00.000\nMain Content'
);

/**
 * Helper to stabilize the video player for screenshotting.
 * Waits for video.js to fully initialize, mocks the video element's play()
 * so that clicking play updates the video.js UI state (control bar becomes
 * visible) without starting actual playback — keeping the progress bar frozen
 * at its initial position for a deterministic screenshot.
 *
 * @param menuSelector CSS selector for the control-bar button to hover,
 *   opening its dropdown menu before the screenshot is taken.
 */
async function stabilizePlayer(
	_ctrl: SampleControls,
	menuSelector: string
): Promise<void> {
	const wrapper = document.getElementById('isolated-render-target')!;
	const videoPlayer = wrapper.querySelector('vwc-video-player') as any;

	// Wait for video.js player to be created
	await new Promise<void>((resolve) => {
		const check = () => {
			if (videoPlayer?._player) {
				resolve();
			} else {
				requestAnimationFrame(check);
			}
		};
		check();
	});

	const player = videoPlayer._player;

	// Wait for the player's tech (HTML5 video element) to be ready
	await new Promise<void>((resolve) => {
		player.ready(resolve);
	});

	// Mock the native video element's play() so clicking "play" causes video.js
	// to update its UI state (adds vjs-has-started / vjs-playing, shows the
	// control bar) without actually advancing playback or moving the progress bar.
	const videoEl = videoPlayer.shadowRoot!.querySelector('video')!;
	videoEl.play = (): Promise<void> => {
		videoEl.dispatchEvent(new Event('play'));
		return Promise.resolve();
	};

	// Press play (triggers the mocked play, shows the control bar)
	await _ctrl.click();

	// For the chapters menu, video.js must fetch and parse the VTT before the
	// menu has any items to display. Poll until the cues appear in the DOM.
	if (menuSelector === '.vjs-chapters-button') {
		await new Promise<void>((resolve) => {
			const check = () => {
				const items = videoPlayer.shadowRoot!.querySelectorAll(
					'.vjs-chapters-button .vjs-menu li.vjs-menu-item'
				);
				if (items.length > 0) {
					resolve();
				} else {
					setTimeout(check, 50);
				}
			};
			check();
		});
	}

	// Hover to open the specified menu
	await _ctrl.hoverDeepSelector(menuSelector);

	await document.fonts.ready;
}

variationTest(
	'video-player',
	table({
		caption: 'Layout',
		xAxis: {
			'skip-by': { '5s': '5', '10s': '10', '30s': '30' },
		},
		yAxis: {
			variant: { default: {} },
		},
		render: async (variant) => {
			const el = (
				<VideoPlayer style="inline-size: 400px" {...flattenAttrs(variant)}>
					<source src={tinyVideoDataUrl} type="video/webm" />
				</VideoPlayer>
			);
			return renderIsolated(el, {
				setup: (ctrl) => stabilizePlayer(ctrl, '.vjs-playback-rate'),
			});
		},
	}),
	table({
		caption: 'Menus',
		xAxis: {
			menu: {
				subtitles: '.vjs-subs-caps-button',
				// chapters: '.vjs-chapters-button', (webkit fails to load them)
			},
		},
		yAxis: {
			variant: { default: {} },
		},
		render: async (variant) => {
			const { menu } = variant as {
				menu: string;
				[k: string]: unknown;
			};
			const el = (
				<VideoPlayer style="inline-size: 400px">
					<source src={tinyVideoDataUrl} type="video/webm" />
					<track
						kind="subtitles"
						src={subtitlesEnDataUrl}
						srclang="en"
						label="English"
					/>
					<track
						kind="subtitles"
						src={subtitlesJpDataUrl}
						srclang="jp"
						label="Japanese"
					/>
					<track kind="chapters" src={chaptersDataUrl} srclang="en" />
				</VideoPlayer>
			);
			return renderIsolated(el, {
				setup: (ctrl) => stabilizePlayer(ctrl, menu),
			});
		},
	}),
	table({
		caption: 'States',
		xAxis: {
			state: {
				'no source (error)': {},
				'initial (pre-play)': { hasSource: true },
				'with poster': { hasSource: true, poster: tinyPosterDataUrl },
			},
		},
		yAxis: {
			variant: { default: {} },
		},
		render: async (variant) => {
			const { state, ...rest } = variant as {
				state: { hasSource?: boolean; poster?: string };
				[k: string]: unknown;
			};
			const el = (
				<VideoPlayer
					style="inline-size: 400px"
					poster={state.poster}
					{...flattenAttrs(rest)}
				>
					{state.hasSource ? (
						<source src={tinyVideoDataUrl} type="video/webm" />
					) : null}
				</VideoPlayer>
			);
			// The pre-play state shows the big play button without needing
			// full player stabilization. Error state has no video.js at all.
			// Use renderIsolated to ensure video.js has time to initialize.
			return renderIsolated(el, {
				setup: async () => {
					// Wait for video.js initialization
					await new Promise((r) => setTimeout(r, 200));
				},
			});
		},
	})
);
