import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['rich-text-editor'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-rich-text-editor></vwc-rich-text-editor>`;
	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
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

test('should show text area and attachments slot with the same scroll', async ({
	page,
}: {
	page: Page;
}) => {
	async function isActuallyVisible() {
		const attachmentsBox = await attachments!.boundingBox();
		const scrollBox = await scrollContainer!.boundingBox();

		const attachmentsBottom = attachmentsBox!.y + attachmentsBox!.height;
		const scrollTop = scrollBox!.y;
		const scrollBottom = scrollBox!.y + scrollBox!.height;

		return attachmentsBottom <= scrollBottom && attachmentsBox!.y >= scrollTop;
	}
	const template = `
        <vwc-rich-text-editor style="height:300px; display:block;">
            <div slot="attachments" id="test-attachments" style="height:60px; background:#eee;">Attachments Area</div>
        </vwc-rich-text-editor>
    `;
	await loadComponents({ page, components });
	await renderTemplate({ page, template });

	await page.waitForLoadState('networkidle');

	const rte = await page.$('vwc-rich-text-editor');
	const shadow = await rte!.evaluateHandle((el) => (el as any).shadowRoot);

	await rte?.evaluate((el: any) => {
		el.value = Array(50).fill('<p>Line</p>').join('');
	});

	const testWrapper = await page.$('#wrapper');

	const scrollContainer = await shadow.$('#editor');
	const attachments = await shadow.$('#attachments-wrapper');

	const isVisibleBeforeScroll = await isActuallyVisible();
	await scrollContainer?.evaluate((el: HTMLElement) => {
		el.scrollTop = el.scrollHeight;
	});

	const isVisibleAfterScroll = await isActuallyVisible();

	expect(isVisibleBeforeScroll).toBe(false);
	expect(isVisibleAfterScroll).toBe(true);

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/rich-text-editor-scroll-attachments.png'
	);
});
