import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['audio-player'];

async function testMenuOpen({ page }: { page: Page }) {
	const template = `
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
>
</vwc-audio-player>
</div>`;

	page.setViewportSize({ width: 600, height: 500 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(500);

	const pressedPlayback = await page.locator('#playback-open-button');
	await pressedPlayback.click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/open-playback-menu.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<div style="margin: 5px;">
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
		<vwc-audio-player
			skip-by="10"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
		<vwc-audio-player
			skip-by="30"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px; width: 500px">
		<vwc-audio-player
			skip-by="5"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
		<vwc-audio-player
			skip-by="10"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
		<vwc-audio-player
			skip-by="30"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>
	<div style="margin: 5px;">
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
	</div>
	<div style="margin: 5px; width: 350px;">
		<vwc-audio-player
			playback-rates="0.75, 1, 1.5"
			skip-by="5"
			class="audio-player"
			src="/assets/ui-tests/audio/example-6s.mp3"
		></vwc-audio-player>
	</div>`;

	page.setViewportSize({ width: 800, height: 1000 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/audio-player.png'
	);
});

test('audio with open menu for playback rates', testMenuOpen);
