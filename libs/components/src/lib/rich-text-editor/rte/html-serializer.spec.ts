import { RteConfig } from './config';
import { RteCore } from './features/core';
import { RteFreeformStructure } from './features/freeform';
import { RteBoldFeature } from './features/bold';
import { RteLinkFeature } from './features/link';
import { docFactories } from './__tests__/doc-factories';
import { RteHtmlSerializer } from './html-serializer';
import { RteInlineImageFeature } from './features/inline-image';

const config = new RteConfig([
	new RteCore(),
	new RteFreeformStructure(),
	new RteBoldFeature(),
	new RteLinkFeature(),
	new RteInlineImageFeature(),
]);

const { doc, textLine: line, text, bold, inlineImage: img } = docFactories;

describe('RteHtmlSerializer', () => {
	it('should serialize HTML from fragment', async () => {
		const serializer = new RteHtmlSerializer(config);

		expect(
			serializer.serializeFragment([
				line(text.marks(bold())('Hello'), text(' world!')),
			])
		).toBe('<div><strong>Hello</strong> world!</div>');
	});

	it('should serialize HTML from document', async () => {
		const serializer = new RteHtmlSerializer(config);

		expect(
			serializer.serializeDocument(
				doc(line(text.marks(bold())('Hello'), text(' world!')))
			)
		).toBe('<div><strong>Hello</strong> world!</div>');
	});

	it('should allow specifying custom serializers', async () => {
		const serializer = new RteHtmlSerializer(config, {
			serializers: {
				nodes: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					inlineImage: (node) => [
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
		const serializer = new RteHtmlSerializer(config);

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
