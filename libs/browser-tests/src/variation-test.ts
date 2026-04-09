import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import type { TableDefinition } from './table';
import { renderTable } from './table';
import {
	getIframe,
	getWrapper,
	renderContent,
	resetPage,
	testViewport,
} from './page';
import { waitForImagesDecode, waitForPaintCommitted } from './render';
import { iterateValues } from './dimensions';

/**
 * Take a screenshot of the test wrapper and compare to baseline.
 */
async function takeScreenshot(name: string): Promise<void> {
	// Ensure all <img> elements (e.g. from renderIsolated) are fully decoded.
	// Data URL images are still decoded asynchronously and Firefox may capture
	// blank placeholders if we screenshot before decoding completes.
	await waitForImagesDecode(getWrapper());

	// Work around vitest browser mode issue:
	// Because the page is rendered in an iframe, taking screenshots of elements larger than the viewport will not capture content outside the viewport
	// Also vitest in some cases scales the iframe, which affects the screenshot as well.
	// Before taking a screenshot, set the iframe size to the size of the content
	const isOversize =
		getWrapper().clientWidth > testViewport.width ||
		getWrapper().clientHeight > testViewport.height;

	if (isOversize) {
		const iframe = getIframe();
		const w = getWrapper().clientWidth;
		const h = getWrapper().clientHeight;
		iframe.style.width = `${w}px`;
		iframe.style.height = `${h}px`;
		// Wait for the compositor to paint the newly-exposed area.
		// Without this, Firefox may capture white/unpainted pixels at the
		// right and bottom edges of the expanded iframe.
		await waitForPaintCommitted();
	}

	const locator = page.elementLocator(getWrapper());
	await expect.element(locator).toMatchScreenshot(name, {
		comparatorOptions: {
			allowedMismatchedPixelRatio: 0.01,
			threshold: 0.05,
		},
	});

	if (isOversize) {
		const iframe = getIframe();
		iframe.style.width = '';
		iframe.style.height = '';
		// Ensure it is cleaned up for the next test
		await waitForPaintCommitted();
	}
}

/**
 * Convert a table caption to a kebab-case screenshot name.
 */
function captionToScreenshotName(caption: string): string {
	return caption
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Render a matrix table, display it, and take a screenshot.
 * The screenshot name is derived automatically from the table caption.
 *
 * @param def - Table definition created by `table()`
 */
async function captureTable(def: TableDefinition): Promise<void> {
	const table = await renderTable(def);

	await resetPage();

	await renderContent(table);

	await takeScreenshot(captionToScreenshotName(def.caption));
}

export const table = (def: TableDefinition) => {
	if (Object.keys(def.xAxis).length < 1)
		throw new Error('There must be at least one dimension on the xAxis');
	if (Object.keys(def.yAxis).length < 1)
		throw new Error('There must be at least one dimension on the yAxis');
	for (const [name, values] of Object.entries({ ...def.xAxis, ...def.yAxis })) {
		if (Array.from(iterateValues(values)).length < 1)
			throw new Error(`Invalid dimension '${name}': 0 values`);
	}
	return def;
};

export function variationTest(
	name: string,
	...tables: TableDefinition[]
): void {
	for (const def of tables) {
		test(`${name} - ${def.caption}`, async () => {
			await captureTable(def);
		});
	}
}
