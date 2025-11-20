import { RTEConfig } from './config';
import { RTECore } from './features/core';
import { RTEFreeformStructure } from './features/freeform';
import { RTEBoldFeature } from './features/bold';
import { RTELinkFeature } from './features/link';
import { docFactories } from './__tests__/doc-factories';
import { RTEHtmlSerializer } from './html-serializer';
import { RTEInlineImageFeature } from './features/inline-image';

const config = new RTEConfig([
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEBoldFeature(),
	new RTELinkFeature(),
	new RTEInlineImageFeature(),
]);

const { doc, text_line: line, text, bold, inline_image: img } = docFactories;

describe('RTEHtmlSerializer', () => {
	it('should serialize HTML from fragment', async () => {
		const serializer = new RTEHtmlSerializer(config);

		expect(
			serializer.serializeFragment([
				line(text.marks(bold())('Hello'), text(' world!')),
			])
		).toBe('<div><strong>Hello</strong> world!</div>');
	});

	it('should serialize HTML from document', async () => {
		const serializer = new RTEHtmlSerializer(config);

		expect(
			serializer.serializeDocument(
				doc(line(text.marks(bold())('Hello'), text(' world!')))
			)
		).toBe('<div><strong>Hello</strong> world!</div>');
	});

	it('should allow specifying custom serializers', async () => {
		const serializer = new RTEHtmlSerializer(config, {
			serializers: {
				nodes: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					inline_image: (node) => [
						'img',
						{
							src: node.attrs.imageUrl,
							'data-attachment-id': `${new URL(node.attrs.imageUrl).hostname}`,
							alt: node.attrs.alt,
						},
					],
				},
				marks: {
					bold: () => ['span', { 'data-bold': '' }, 0],
				},
			},
		});

		expect(
			serializer.serializeFragment([
				line(
					text.marks(bold())('Hello'),
					img.attrs({
						imageUrl: 'attachment://1',
						alt: 'Image',
					})()
				),
			])
		).toMatchInlineSnapshot(
			`"<div><span data-bold="">Hello</span><img src="attachment://1" data-attachment-id="1" alt="Image"></div>"`
		);
	});

	it('should serialize DOM modified by modifyDom', async () => {
		const serializer = new RTEHtmlSerializer(config);

		expect(
			serializer.serializeFragment(
				[
					img.attrs({
						imageUrl: 'attachment://1',
					})(),
				],
				{
					modifyDom: (dom) => {
						for (const img of dom.querySelectorAll('img[src]').values()) {
							const url = new URL(img.getAttribute('src')!);
							img.setAttribute('data-attachment-id', url.hostname);
						}
					},
				}
			)
		).toMatchInlineSnapshot(
			`"<img src="attachment://1" alt="" data-attachment-id="1">"`
		);
	});
});
