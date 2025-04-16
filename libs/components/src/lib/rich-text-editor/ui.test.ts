import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['rich-text-editor'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-rich-text-editor></vwc-rich-text-editor>`;
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

	const richTextEditor = await page.$('vwc-rich-text-editor');
	await richTextEditor?.focus();
	await page.keyboard.type('Title');
	await page.evaluate(
		(editor) => (editor as any).setTextBlock('title'),
		richTextEditor
	);
	await page.keyboard.press('Enter');
	await page.keyboard.type('Subtitle');
	await page.evaluate(
		(editor) => (editor as any).setTextBlock('subtitle'),
		richTextEditor
	);
	await page.keyboard.press('Enter');
	await page.keyboard.type('Body');
	await page.evaluate(
		(editor) => (editor as any).setTextBlock('body'),
		richTextEditor
	);
	await page.keyboard.press('Enter');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/rich-text-editor.png'
	);
});
