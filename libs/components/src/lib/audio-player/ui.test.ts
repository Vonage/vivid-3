import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['audio-player'];

test('should show the component', async ({ page }: { page: Page }) => {
	await page.setViewportSize({ width: 800, height: 1000 });
	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template: `<div style="margin: 5px;">
		<vwc-audio-player
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px;">
		<vwc-audio-player
			notime
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px;">
		<vwc-audio-player
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px; width: 500px">
		<vwc-audio-player
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>`,
	});
	await takeScreenshot(page, 'audio-player');

	// Safari sometimes struggles with loading multiple audio files, so we split off playback-rates tests
	await renderTemplate({
		page,
		template: `<div style="margin: 5px;">
		<vwc-audio-player
			playback-rates="0.5, 1, 1.5, 2"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px; width: 500px">
		<vwc-audio-player
			playback-rates="0.5, 1, 1.5, 2"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px; width: 350px;">
		<vwc-audio-player
			playback-rates="0.75, 1, 1.5"
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px;">
		<vwc-audio-player
			connotation="cta"
			playback-rates="0.75, 1, 1.5"
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px;">
		<vwc-audio-player
			disabled
			playback-rates="0.75, 1, 1.5"
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>`,
	});
	await takeScreenshot(page, 'playback-rates');

	await page.setViewportSize({ width: 600, height: 500 });
	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template: `
			<style>
				.wrapper {
					width: 100%;
					height: 500px;
					position: relative;
				}
			</style>
			<div class="wrapper">
				<vwc-audio-player
					src="/assets/ui-tests/audio/example-6s.mp3"
					playback-rates="0.5, 1, 1.5, 2"
				></vwc-audio-player>
			</div>`,
		setup: async () => {
			await page.waitForTimeout(500);
			await page.locator('#playback-open-button').click();
		},
	});
	await page.waitForTimeout(200);

	await takeScreenshot(page, 'open-playback-menu');
});
