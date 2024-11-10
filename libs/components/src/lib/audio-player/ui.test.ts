import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
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
src="https://download.samplelib.com/mp3/sample-6s.mp3"
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
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	page.setViewportSize({ width: 500, height: 1000 });

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
