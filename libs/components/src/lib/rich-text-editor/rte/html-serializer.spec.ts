import { RteConfig } from './config';
import { RteBase } from './features/base';
import { RteBoldFeature } from './features/bold';
import { RteLinkFeature } from './features/link';
import { docFactories } from './__tests__/doc-factories';
import { RteHtmlSerializer } from './html-serializer';
import { RteInlineImageFeature } from './features/inline-image';
import { RteToolbarFeature } from './features/toolbar';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
} from './feature';

const config = new RteConfig([
	new RteBase({
		heading1: true,
	}),
	new RteToolbarFeature(),
	new RteBoldFeature(),
	new RteLinkFeature(),
	new RteInlineImageFeature(),
]);

const { doc, paragraph: p, text, bold, inlineImage: img } = docFactories;

describe('RteHtmlSerializer', () => {
	it('should serialize HTML from fragment', async () => {
		const serializer = new RteHtmlSerializer(config);

		expect(
			serializer.serializeFragment([
				p(text.marks(bold())('Hello'), text(' world!')),
			])
		).toBe('<p><strong>Hello</strong> world!</p>');
	});

	it('should serialize HTML from document', async () => {
		const serializer = new RteHtmlSerializer(config);

		expect(
			serializer.serializeDocument(
				doc(p(text.marks(bold())('Hello'), text(' world!')))
			)
		).toBe('<p><strong>Hello</strong> world!</p>');
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
				p(
					text.marks(bold())('Hello'),
					img.attrs({
						imageUrl: 'attachment://1',
						alt: 'Image',
					})()
				),
			])
		).toMatchInlineSnapshot(
			`"<p><span data-bold="">Hello</span><img src="attachment://1" data-attachment-id="1" alt="Image"></p>"`
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

	it('should ignore nodes and marks without serializers', async () => {
		const DummyFeature = featureFacade(
			class extends RteFeatureImpl {
				name = 'DummyFeature';

				override getSchema(): SchemaContribution[] {
					return [
						this.contribution({
							nodes: {
								dummyNode: {},
							},
							marks: {
								dummyMark: {},
							},
						}),
					];
				}
			}
		);

		expect(
			() =>
				new RteHtmlSerializer(
					new RteConfig([new RteBase(), new DummyFeature()])
				)
		).not.toThrow();
	});
});
