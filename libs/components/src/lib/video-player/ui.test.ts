import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
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
				<vwc-video-player id="video-player" poster="/assets/ui-tests/ed-poster.jpeg">
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
	await loadTemplate({ page, template });

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('domcontentloaded');

	// Wait for the poster image to be fully loaded
	const locator = page.locator('#video-player .vjs-poster img');
	const promise = locator.evaluate(
		(image: any) => image.complete || new Promise((f) => (image.onload = f))
	);
	await Promise.resolve(promise);

	await page.waitForSelector('#video-player-controls .vjs-tech');
	const videoEle = await page.$('#video-player-controls video');
	const videoEle2 = await page.$('#video-player-controls-2 video');
	const loadProgress = await page.$(
		'#video-player-controls .vjs-load-progress'
	);
	const loadProgress2 = await page.$(
		'#video-player-controls-2 .vjs-load-progress'
	);
	// hide elements that could lead to a flakey test
	videoEle?.evaluate((element) => (element.style.visibility = 'hidden'));
	videoEle2?.evaluate((element) => (element.style.visibility = 'hidden'));
	loadProgress?.evaluate((element) => (element.style.visibility = 'hidden'));
	loadProgress2?.evaluate((element) => (element.style.visibility = 'hidden'));

	await videoEle!.evaluate((video) => (video as HTMLVideoElement)!.play());
	await videoEle2!.evaluate((video) => (video as HTMLVideoElement)!.play());
	await videoEle!.evaluate((video) => (video as HTMLVideoElement)!.pause());
	await videoEle2!.evaluate((video) => (video as HTMLVideoElement)!.pause());

	// activate menus
	const videoWrapper = await page.$(
		'#video-player-controls .vjs-controls-enabled'
	);
	videoWrapper?.evaluate((element) => element.classList.add('vjs-user-active'));
	const volumePanel = await page.$('#video-player-controls .vjs-volume-panel');
	volumePanel?.evaluate((element) => element.classList.add('vjs-hover'));
	const playbackRate = await page.$(
		'#video-player-controls .vjs-playback-rate.vjs-control'
	);
	playbackRate?.evaluate((element) => element.classList.add('vjs-hover'));
	const captions = await page.$(
		'#video-player-controls-2 .vjs-subs-caps-button.vjs-control'
	);
	captions?.evaluate((element) => element.classList.add('vjs-hover'));

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/video-player.png',
		{ maxDiffPixelRatio: 0.01 }
	);
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
	await loadTemplate({ page, template });
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
	await loadTemplate({ page, template });
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
	await loadTemplate({ page, template });
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
	await loadTemplate({ page, template });
	await page.waitForLoadState('domcontentloaded');
	await page.waitForSelector('.vjs-tech');
	await expect(
		page.locator('.vjs-chapters-button.vjs-control')
	).not.toHaveClass('.vjs-hidden');
});
