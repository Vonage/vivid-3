import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import type * as rte from './definition';

let RteConfig!: typeof rte.RteConfig;
let RteBase!: typeof rte.RteBase;
let RteTextBlockPickerFeature!: typeof rte.RteTextBlockPickerFeature;
let RteToolbarFeature!: typeof rte.RteToolbarFeature;
let RtePlaceholderFeature!: typeof rte.RtePlaceholderFeature;
let RteFontSizePickerFeature!: typeof rte.RteFontSizePickerFeature;
let RteBoldFeature!: typeof rte.RteBoldFeature;
let RteItalicFeature!: typeof rte.RteItalicFeature;
let RteUnderlineFeature!: typeof rte.RteUnderlineFeature;
let RteStrikethroughFeature!: typeof rte.RteStrikethroughFeature;
let RteMonospaceFeature!: typeof rte.RteMonospaceFeature;
let RteTextColorPickerFeature!: typeof rte.RteTextColorPickerFeature;
let RteListFeature!: typeof rte.RteListFeature;
let RteAlignmentFeature!: typeof rte.RteAlignmentFeature;
let RteLinkFeature!: typeof rte.RteLinkFeature;
let RteInlineImageFeature!: typeof rte.RteInlineImageFeature;
let RteToolbarButtonFeature!: typeof rte.RteToolbarButtonFeature;
let RteAtomFeature!: typeof rte.RteAtomFeature;

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
			vwc-rich-text-editor {
				--rich-text-editor-padding-inline: 24px;
				--rich-text-editor-padding-block: 12px;
			}
			::part(node--mention) {
				background-color: var(--vvd-color-cta-100);
				color: var(--vvd-color-cta-800);
				font-weight: bold;
				border-radius: 4px;
				padding: 2px 4px;
			}
		`,
	});
	await page.addScriptTag({
		type: 'module',
		content: `
			import * as rte from "/libs/components/dist/rich-text-editor/index.js";
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
				const config = new RteConfig([
					new RteBase({
						heading1: true,
						heading2: true,
						heading3: true,
					}),
					new RteTextBlockPickerFeature({
						options: [
							{
								node: 'heading1',
								label: 'Heading 1',
							},
							{
								node: 'heading2',
								label: 'Heading 2',
							},
							{
								node: 'heading3',
								label: 'Heading 3',
							},
							{
								node: 'paragraph',
								label: 'Paragraph',
							},
						],
					}),
					new RteToolbarFeature(),
					new RteFontSizePickerFeature({
						options: [
							{ label: 'Extra Large', size: '24px' },
							{ label: 'Large', size: '18px' },
							{ label: 'Normal', size: '14px' },
							{ label: 'Small', size: '12px' },
						],
					}),
					new RteBoldFeature(),
					new RteItalicFeature(),
					new RteUnderlineFeature(),
					new RteStrikethroughFeature(),
					new RteMonospaceFeature(),
					new RteTextColorPickerFeature(),
					new RteListFeature({
						bulletList: true,
						numberedList: true,
					}),
					new RteAlignmentFeature(),
					new RteLinkFeature(),
					new RteInlineImageFeature(),
					new RteToolbarButtonFeature('greeting', {
						label: 'Insert greeting',
						icon: 'waving-line',
						action: { type: 'insert-text', text: 'Hello, how are you?' },
					}),
					new RteAtomFeature('mention', {
						resolveValue: (value: string) => `@${value}`,
					}),
				]);
				rteElement.instance = config.instantiateEditor({
					initialDocument: {
						type: 'doc',
						content: [
							{
								type: 'heading1',
								content: [{ type: 'text', text: 'heading1' }],
							},
							{
								type: 'heading2',
								content: [{ type: 'text', text: 'heading2' }],
							},
							{
								type: 'heading3',
								content: [{ type: 'text', text: 'heading3' }],
							},
							{
								type: 'paragraph',
								content: [{ type: 'text', text: 'paragraph' }],
							},
							{
								type: 'paragraph',
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
								type: 'paragraph',
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
								type: 'bulletList',
								content: [
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [{ type: 'text', text: 'Nested Item 2' }],
											},
											{
												type: 'bulletList',
												content: [
													{
														type: 'listItem',
														content: [{ type: 'text', text: 'Nested Item 3' }],
													},
												],
											},
										],
									},
								],
							},
							{
								type: 'numberedList',
								content: [
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'numberedList',
										content: [
											{
												type: 'listItem',
												content: [{ type: 'text', text: 'Nested Item 2' }],
											},
											{
												type: 'numberedList',
												content: [
													{
														type: 'listItem',
														content: [{ type: 'text', text: 'Nested Item 3' }],
													},
												],
											},
										],
									},
								],
							},
							{
								type: 'paragraph',
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
								type: 'paragraph',
								content: [
									{ type: 'text', text: 'Mention: ' },
									{ type: 'mention', attrs: { value: 'John Doe' } },
								],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'inlineImage',
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
		template: `
			<div style="display: flex; gap: 16px; padding: 16px; align-items: flex-start;">
				<div style="width: 200px;">
					<div>Default (grows)</div>
					<vwc-rich-text-editor id="rte-default">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
				<div style="width: 200px;">
					<div>block-size: 260px</div>
					<vwc-rich-text-editor id="rte-fixed" style="block-size: 260px;">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
				<div style="width: 200px;">
					<div>max-block-size: 260px</div>
					<vwc-rich-text-editor id="rte-max" style="max-block-size: 260px;">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
				<div style="width: 200px;">
					<div>min-block-size: 500px</div>
					<vwc-rich-text-editor id="rte-min" style="min-block-size: 500px;">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
				<div style="width: 200px;">
					<div>scroll min-block-size: 500px</div>
					<style> #rte-min-scrollable::part(editor-scrollable-area) { min-block-size: 500px } </style>
					<vwc-rich-text-editor id="rte-min-scrollable">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
				<div style="width: 200px;">
					<div>editor min-block-size: 500px</div>
					<style> #rte-min-editor::part(editor) { min-block-size: 500px } </style>
					<vwc-rich-text-editor id="rte-min-editor">
						<div slot="editor-before" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Before Content</div>
						<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
						<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
						<div slot="editor-after" style="background-color: var(--vvd-color-information-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor After Content</div>
					</vwc-rich-text-editor>
				</div>
			</div>
		`,
		setup: async () => {
			await page.evaluate(() => {
				const initialDoc = {
					type: 'doc' as const,
					content: Array.from({ length: 6 }, (_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
				};
				for (const id of [
					'rte-default',
					'rte-fixed',
					'rte-max',
					'rte-min',
					'rte-min-scrollable',
					'rte-min-editor',
				]) {
					const el = document.getElementById(id)!;
					const config = new RteConfig([
						new RteBase(),
						new RteToolbarFeature(),
					]);
					(el as any).instance = config.instantiateEditor({
						initialDocument: initialDoc,
					});
				}
			});
		},
	});

	await takeScreenshot(page, 'rich-text-editor-block-sizes');

	await renderTemplate({
		page,
		template: `<vwc-rich-text-editor style="width: 400px"></vwc-rich-text-editor>`,
		setup: async () => {
			await page.evaluate(() => {
				const rteElement = document.querySelector('vwc-rich-text-editor')!;
				const config = new RteConfig([
					new RteBase({
						heading1: true,
					}),
					new RtePlaceholderFeature({ text: 'Placeholder text...' }),
					new RteAlignmentFeature(),
				]);
				rteElement.instance = config.instantiateEditor({
					initialDocument: {
						type: 'doc',
						content: [
							{
								type: 'heading1',
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
					type: 'heading1',
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
					type: 'heading1',
					attrs: { textAlign: 'right' },
					content: [],
				},
			],
		});
	});

	await takeScreenshot(page, 'placeholder-heading-right');

	await renderTemplate({
		page,
		template: `
			<div style="display: flex; gap: 16px; padding: 16px; align-items: flex-start;">
				<div style="width: 300px;">
					<div>Disabled</div>
					<vwc-rich-text-editor id="rte-disabled" style="width: 300px;"></vwc-rich-text-editor>
				</div>
				<div style="width: 300px;">
					<div>Disabled (placeholder)</div>
					<vwc-rich-text-editor id="rte-disabled-placeholder" style="width: 300px;"></vwc-rich-text-editor>
				</div>
			</div>
		`,
		setup: async () => {
			await page.evaluate(() => {
				const initialDoc = {
					type: 'doc' as const,
					content: [
						{
							type: 'paragraph',
							content: [{ type: 'text', text: 'Some text content' }],
						},
					],
				};

				const emptyDoc = { type: 'doc' as const, content: [] };

				const makeConfig = () =>
					new RteConfig([
						new RteBase(),
						new RtePlaceholderFeature({ text: 'Placeholder text...' }),
						new RteToolbarFeature(),
						new RteBoldFeature(),
					]);

				const disabledEl = document.getElementById('rte-disabled')!;
				const disabledConfig = makeConfig();
				const disabledInstance = disabledConfig.instantiateEditor({
					initialDocument: initialDoc,
				});
				(disabledEl as any).instance = disabledInstance;
				disabledInstance.feature(RteBase).disabled = true;

				const disabledPlaceholderEl = document.getElementById(
					'rte-disabled-placeholder'
				)!;
				const disabledPlaceholderConfig = makeConfig();
				const disabledPlaceholderInstance =
					disabledPlaceholderConfig.instantiateEditor({
						initialDocument: emptyDoc,
					});
				(disabledPlaceholderEl as any).instance = disabledPlaceholderInstance;
				disabledPlaceholderInstance.feature(RteBase).disabled = true;
			});
		},
	});

	await takeScreenshot(page, 'rich-text-editor-disabled');

	// 400x300 test image
	const svgImageUrl =
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE5NzZEMiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkltYWdlIDQwMHgzMDA8L3RleHQ+PC9zdmc+';

	await renderTemplate({
		page,
		template: `<vwc-rich-text-editor style="width: 500px; block-size: 250px"></vwc-rich-text-editor>`,
		setup: async () => {
			await page.evaluate((imageUrl) => {
				const rteElement = document.querySelector('vwc-rich-text-editor')!;
				const config = new RteConfig([
					new RteBase(),
					new RteInlineImageFeature(),
				]);
				const paragraphs = (start: number) =>
					Array.from({ length: 8 }, (_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${start + i}` }],
					}));
				rteElement.instance = config.instantiateEditor({
					initialDocument: {
						type: 'doc',
						content: [
							...paragraphs(1),
							{
								type: 'paragraph',
								content: [
									{
										type: 'inlineImage',
										attrs: {
											imageUrl,
											alt: 'Image 400x300',
											naturalWidth: 400,
											naturalHeight: 300,
										},
									},
								],
							},
							...paragraphs(9),
						],
					},
				});
			}, svgImageUrl);
		},
	});

	// Playwright will scroll the editor's scroll area to bring the image into view before clicking.
	await page.locator('img.inline-image').click();

	const waitForReposition = () =>
		page.evaluate(
			() =>
				new Promise<void>((resolve) =>
					requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
				)
		);

	// Compute the three scroll positions relative to the image's position in the scroll area
	const scrollPositions = await page.evaluate(() => {
		const host = document.querySelector('vwc-rich-text-editor')!;
		const scrollArea = host.shadowRoot!.querySelector(
			'.editor-scroll-area'
		) as HTMLElement;
		const img = host.shadowRoot!.querySelector(
			'img.inline-image'
		) as HTMLElement;
		const imgOffsetTop =
			img.getBoundingClientRect().top -
			scrollArea.getBoundingClientRect().top +
			scrollArea.scrollTop;
		const imgHeight = img.offsetHeight; // 300px (set via naturalHeight attr)
		const viewportHeight = scrollArea.clientHeight; // ~250px
		return [
			// 1. A few paragraphs visible, top of image just entering the bottom of the viewport
			Math.max(0, imgOffsetTop - viewportHeight + 20),
			// 2. Viewport looking at the middle of the image
			Math.round(imgOffsetTop + imgHeight / 2 - viewportHeight / 2),
			// 3. End of the image at the top of the viewport, then paragraphs below
			Math.round(imgOffsetTop + imgHeight - 20),
		] as [number, number, number];
	});

	const scrollPositionLabels = [
		'image-entering-bottom',
		'image-middle',
		'image-leaving-top',
	] as const;

	for (const [i, scrollTop] of scrollPositions.entries()) {
		await page.evaluate((top) => {
			const host = document.querySelector('vwc-rich-text-editor')!;
			(
				host.shadowRoot!.querySelector('.editor-scroll-area') as HTMLElement
			).scrollTop = top;
		}, scrollTop);
		await waitForReposition();

		await takeScreenshot(
			page,
			`rich-text-editor-image-popover-${scrollPositionLabels[i]}`
		);
	}
});
