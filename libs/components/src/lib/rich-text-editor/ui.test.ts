import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	BASE_URL,
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import type * as rte from './definition';

let RTEConfig: typeof rte.RTEConfig;
let RTECore: typeof rte.RTECore;
let RTETextBlockStructure: typeof rte.RTETextBlockStructure;
let RTEToolbarFeature: typeof rte.RTEToolbarFeature;
let RTEFontSizeFeature: typeof rte.RTEFontSizeFeature;
let RTEBoldFeature: typeof rte.RTEBoldFeature;
let RTEItalicFeature: typeof rte.RTEItalicFeature;
let RTEUnderlineFeature: typeof rte.RTEUnderlineFeature;
let RTEStrikethroughFeature: typeof rte.RTEStrikethroughFeature;
let RTEMonospaceFeature: typeof rte.RTEMonospaceFeature;

const components = ['rich-text-editor'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-rich-text-editor style="width: 500px"></vwc-rich-text-editor>`;
	await loadComponents({
		page,
		components,
	});
	await page.addScriptTag({
		type: 'module',
		content: `
			import * as rte from "${BASE_URL}/libs/components/dist/rich-text-editor/index.js";
			for (const key in rte) {
				window[key] = rte[key];
			}
		`,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.evaluate(() => {
				const rteElement = document.querySelector('vwc-rich-text-editor')!;
				const config = new RTEConfig([
					new RTECore(),
					new RTETextBlockStructure(),
					new RTEToolbarFeature(),
					new RTEFontSizeFeature(),
					new RTEBoldFeature(),
					new RTEItalicFeature(),
					new RTEUnderlineFeature(),
					new RTEStrikethroughFeature(),
					new RTEMonospaceFeature(),
				]);
				rteElement.instance = config.instantiateEditor([
					{
						type: 'heading',
						attrs: { level: 1 },
						content: [{ type: 'text', text: 'heading-1' }],
					},
					{
						type: 'heading',
						attrs: { level: 2 },
						content: [{ type: 'text', text: 'heading-2' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'paragraph' }],
					},
				]);
			});
		},
	});

	await takeScreenshot(page, 'rich-text-editor');
});
