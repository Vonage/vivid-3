import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['video-player'];

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
