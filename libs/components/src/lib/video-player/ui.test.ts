import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['video-player'];

test('initialises in a ready to play state', async ({ page }: { page: Page }) => {
	const template = `
		<div style="max-width: 600px; padding: 8px;">
			<vwc-video-player poster="//live.staticflickr.com/45/150125790_2df6475599_b.jpg">
				<source src="//vjs.zencdn.net/v/oceans.webm" type="video/mp4">
			</vwc-video-player>
		</div>
	`;

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
		'./snapshots/video-player.png'
	);
});
