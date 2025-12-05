import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	BASE_URL,
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import type * as rte from './definition';

let RTEConfig!: typeof rte.RTEConfig;
let RTECore!: typeof rte.RTECore;
let RTETextBlockStructure!: typeof rte.RTETextBlockStructure;
let RTEToolbarFeature!: typeof rte.RTEToolbarFeature;
let RTEFontSizeFeature!: typeof rte.RTEFontSizeFeature;
let RTEBoldFeature!: typeof rte.RTEBoldFeature;
let RTEItalicFeature!: typeof rte.RTEItalicFeature;
let RTEUnderlineFeature!: typeof rte.RTEUnderlineFeature;
let RTEStrikethroughFeature!: typeof rte.RTEStrikethroughFeature;
let RTEMonospaceFeature!: typeof rte.RTEMonospaceFeature;
let RTETextColorFeature!: typeof rte.RTETextColorFeature;
let RTEListFeature!: typeof rte.RTEListFeature;
let RTEAlignmentFeature!: typeof rte.RTEAlignmentFeature;
let RTELinkFeature!: typeof rte.RTELinkFeature;
let RTEInlineImageFeature!: typeof rte.RTEInlineImageFeature;

const components = ['rich-text-editor'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});
	await page.addStyleTag({
		content: `
			#wrapper {
				display: inline-block;
			}
		`,
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
		template: `<vwc-rich-text-editor style="width: 500px"></vwc-rich-text-editor>`,
		setup: async () => {
			await page.evaluate(() => {
				const rteElement = document.querySelector('vwc-rich-text-editor')!;
				const config = new RTEConfig([
					new RTECore(),
					new RTETextBlockStructure({
						blocks: [
							{
								id: 'title',
								label: 'Title',
								semanticRole: 'heading-1',
								stylePreset: 'h5',
							},
							{
								id: 'subtitle',
								label: 'Subtitle',
								semanticRole: 'heading-2',
								stylePreset: 'h6',
							},
							{
								id: 'body',
								label: 'Body',
								semanticRole: 'paragraph',
								stylePreset: 'body-2',
								marksAllowed: true,
							},
						],
					}),
					new RTEToolbarFeature(),
					new RTEFontSizeFeature({
						options: [
							{ label: 'Extra Large', size: '24px' },
							{ label: 'Large', size: '18px' },
							{ label: 'Normal', size: '14px' },
							{ label: 'Small', size: '12px' },
						],
						defaultSize: '14px',
					}),
					new RTEBoldFeature(),
					new RTEItalicFeature(),
					new RTEUnderlineFeature(),
					new RTEStrikethroughFeature(),
					new RTEMonospaceFeature(),
					new RTETextColorFeature({ defaultColor: '#000000' }),
					new RTEListFeature(),
					new RTEAlignmentFeature(),
					new RTELinkFeature(),
					new RTEInlineImageFeature(),
				]);
				rteElement.instance = config.instantiateEditor({
					initialDocument: {
						type: 'doc',
						content: [
							{
								type: 'title',
								content: [{ type: 'text', text: 'title' }],
							},
							{
								type: 'subtitle',
								content: [{ type: 'text', text: 'subtitle' }],
							},
							{
								type: 'body',
								content: [{ type: 'text', text: 'body' }],
							},
							{
								type: 'body',
								content: [
									{ type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
									{ type: 'text', text: ' ' },
									{ type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'underline',
										marks: [{ type: 'underline' }],
									},
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'strikethrough',
										marks: [{ type: 'strikethrough' }],
									},
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'monospace',
										marks: [{ type: 'monospace' }],
									},
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'link',
										marks: [
											{
												type: 'link',
												attrs: { href: 'https://vonage.com' },
											},
										],
									},
								],
							},
							{
								type: 'body',
								content: [
									{
										type: 'text',
										text: 'small',
										marks: [{ type: 'fontSize', attrs: { size: '12px' } }],
									},
									{ type: 'text', text: ' ' },
									{ type: 'text', text: 'normal' },
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'large',
										marks: [{ type: 'fontSize', attrs: { size: '18px' } }],
									},
									{ type: 'text', text: ' ' },
									{
										type: 'text',
										text: 'extra large',
										marks: [{ type: 'fontSize', attrs: { size: '24px' } }],
									},
								],
							},
							{
								type: 'bullet_list',
								content: [
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'bullet_list',
										content: [
											{
												type: 'list_item',
												content: [{ type: 'text', text: 'Nested Item 2' }],
											},
											{
												type: 'bullet_list',
												content: [
													{
														type: 'list_item',
														content: [{ type: 'text', text: 'Nested Item 3' }],
													},
												],
											},
										],
									},
								],
							},
							{
								type: 'numbered_list',
								content: [
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'numbered_list',
										content: [
											{
												type: 'list_item',
												content: [{ type: 'text', text: 'Nested Item 2' }],
											},
											{
												type: 'numbered_list',
												content: [
													{
														type: 'list_item',
														content: [{ type: 'text', text: 'Nested Item 3' }],
													},
												],
											},
										],
									},
								],
							},
							{
								type: 'body',
								content: [
									{
										type: 'text',
										text: 'Red ',
										marks: [{ type: 'textColor', attrs: { color: '#E61D1D' } }],
									},
									{
										type: 'text',
										text: 'Yellow ',
										marks: [{ type: 'textColor', attrs: { color: '#FA9F00' } }],
									},
									{
										type: 'text',
										text: 'Green',
										marks: [{ type: 'textColor', attrs: { color: '#1C8731' } }],
									},
								],
							},
							{
								type: 'body',
								content: [
									{
										type: 'inline_image',
										attrs: {
											imageUrl:
												'data:image/png;base64,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',
											alt: 'Vivid Logo',
											naturalWidth: 64,
											naturalHeight: 64,
										},
									},
								],
							},
						],
					},
				});
			});
		},
	});

	await takeScreenshot(page, 'rich-text-editor');

	await renderTemplate({
		page,
		template: `<vwc-rich-text-editor style="width: 400px" placeholder="Placeholder text..."></vwc-rich-text-editor>`,
		setup: async () => {
			await page.evaluate(() => {
				const rteElement = document.querySelector('vwc-rich-text-editor')!;
				const config = new RTEConfig([
					new RTECore(),
					new RTETextBlockStructure({
						blocks: [
							{
								id: 'title',
								label: 'Title',
								semanticRole: 'heading-1',
								stylePreset: 'h5',
							},
						],
					}),
					new RTEAlignmentFeature(),
				]);
				rteElement.instance = config.instantiateEditor({
					initialDocument: {
						type: 'doc',
						content: [
							{
								type: 'title',
								content: [],
							},
						],
					},
				});
			});
		},
	});

	await takeScreenshot(page, 'placeholder-heading-left');

	await page.evaluate(() => {
		const rteElement = document.querySelector('vwc-rich-text-editor')!;
		rteElement.instance!.replaceDocument({
			type: 'doc',
			content: [
				{
					type: 'title',
					attrs: { textAlign: 'center' },
					content: [],
				},
			],
		});
	});

	await takeScreenshot(page, 'placeholder-heading-center');

	await page.evaluate(() => {
		const rteElement = document.querySelector('vwc-rich-text-editor')!;
		rteElement.instance!.replaceDocument({
			type: 'doc',
			content: [
				{
					type: 'title',
					attrs: { textAlign: 'right' },
					content: [],
				},
			],
		});
	});

	await takeScreenshot(page, 'placeholder-heading-right');
});
