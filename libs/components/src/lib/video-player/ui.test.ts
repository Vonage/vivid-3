import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['video-player'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.layout {
				max-width: 760px;
				padding: 8px;
			}
			.spacer {
				padding-bottom: 8px;
			}
		</style>
		<div class="layout">
			<div class="spacer">
				<vwc-video-player id="video-player" poster="/assets/ui-tests/videos/example-5s/ed-poster.jpeg">
					<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
				</vwc-video-player>
			</div>

			<div class="spacer">
				<vwc-video-player id="video-player-controls">
					<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
				</vwc-video-player>
			</div>

			<div class="spacer">
				<vwc-video-player id="video-player-controls-2">
					<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
					<track kind="captions"
						src="/assets/ui-tests/videos/example-5s/captions.en.vtt" srclang="en" label="English">
					<track kind="descriptions"
						src="/assets/ui-tests/videos/example-5s/descriptions.en.vtt" label="English" srclang="en">
					<track kind="chapters" src="/assets/ui-tests/videos/example-5s/chapters.en.vtt" srclang="en">
				</vwc-video-player>
			</div>

			<div class="spacer">
				<vwc-video-player src="invalid.xyz"></vwc-video-player>
			</div>

			<div class="spacer">
				<vwc-video-player></vwc-video-player>
			</div>
		</div>
	`;

	await loadComponents({ page, components });
	await renderTemplate({
		page,
		template,
		setup: async () => {
			// hide elements that could lead to a flakey test
			await page.waitForSelector('#video-player-controls .vjs-tech');
			await page.evaluate(async () => {
				const videoEl = document
					.querySelector('#video-player-controls')!
					.shadowRoot!.querySelector('video')!;
				const videoEl2 = document
					.querySelector('#video-player-controls-2')!
					.shadowRoot!.querySelector('video')!;
				const loadProgressEl = document
					.querySelector('#video-player-controls')!
					.shadowRoot!.querySelector<HTMLElement>('.vjs-load-progress')!;
				const loadProgressEl2 = document
					.querySelector('#video-player-controls-2')!
					.shadowRoot!.querySelector<HTMLElement>('.vjs-load-progress')!;
				videoEl.style.visibility = 'hidden';
				videoEl2.style.visibility = 'hidden';
				loadProgressEl.style.visibility = 'hidden';
				loadProgressEl2.style.visibility = 'hidden';
				await videoEl.play();
				videoEl.pause();
				videoEl.currentTime = 0;
				await videoEl2.play();
				videoEl2.pause();
				videoEl2.currentTime = 0;
			});

			// activate menus
			const videoWrapper = await page.$(
				'#video-player-controls .vjs-controls-enabled'
			);
			videoWrapper?.evaluate((element) =>
				element.classList.add('vjs-user-active')
			);
			const volumePanel = await page.$(
				'#video-player-controls .vjs-volume-panel'
			);
			volumePanel?.evaluate((element) => element.classList.add('vjs-hover'));
			const playbackRate = await page.$(
				'#video-player-controls .vjs-playback-rate.vjs-control'
			);
			playbackRate?.evaluate((element) => element.classList.add('vjs-hover'));
			const captions = await page.$(
				'#video-player-controls-2 .vjs-subs-caps-button.vjs-control'
			);
			captions?.evaluate((element) => element.classList.add('vjs-hover'));
		},
	});

	await takeScreenshot(page, 'video-player');
});

test('should hide the track menu buttons when no track elements are provided', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-video-player>
			<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
		</vwc-video-player>`;

	await loadComponents({ page, components });
	await renderTemplate({ page, template });
	await page.waitForLoadState('domcontentloaded');
	await page.waitForSelector('.vjs-tech');

	await expect(
		page.locator('.vjs-subs-caps-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
	await expect(
		page.locator('.vjs-descriptions-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
	await expect(
		page.locator('.vjs-chapters-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
});

test('should show the button and populate the menu when adding audio description tracks', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-video-player>
			<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
			<track kind="descriptions"
				src="/assets/ui-tests/videos/example-5s/descriptions.en.vtt" label="English" srclang="en">
		</vwc-video-player>`;

	await loadComponents({ page, components });
	await renderTemplate({ page, template });
	await page.waitForLoadState('domcontentloaded');
	await page.waitForSelector('.vjs-tech');
	await expect(
		page.locator('.vjs-descriptions-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
	await expect(
		page.locator('.vjs-descriptions-button.vjs-control .vjs-menu li')
	).toHaveCount(2);
});

test('should show the button when adding caption tracks', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-video-player>
			<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
			<track kind="captions"
				src="/assets/ui-tests/videos/example-5s/captions.en.vtt" srclang="en" label="English">
		</vwc-video-player>`;

	await loadComponents({ page, components });
	await renderTemplate({ page, template });
	await page.waitForLoadState('domcontentloaded');
	await page.waitForSelector('.vjs-tech');
	await expect(
		page.locator('.vjs-subs-caps-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
});

test('should show the button when adding a chapter track', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-video-player>
			<source src="/assets/ui-tests/videos/example-5s/sample-5s.webm" type="video/webm">
			<track kind="chapters" src="/assets/ui-tests/videos/example-5s/chapters.en.vtt" srclang="en">
		</vwc-video-player>`;

	await loadComponents({ page, components });
	await renderTemplate({ page, template });
	await page.waitForLoadState('domcontentloaded');
	await page.waitForSelector('.vjs-tech');
	await expect(
		page.locator('.vjs-chapters-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
});
