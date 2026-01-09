import { elementUpdated, fixture } from '@repo/shared';
import { RichTextView } from '../../rich-text-view/rich-text-view';
import '../../rich-text-view';
import { RteConfig } from './config';
import { RteBase } from './features/base';
import { RteBoldFeature } from './features/bold';
import { RteItalicFeature } from './features/italic';
import { RteUnderlineFeature } from './features/underline';
import { RteLinkFeature } from './features/link';
import { RteToolbarFeature } from './features/toolbar';
import { docFactories } from './__tests__/doc-factories';
import { RteHtmlSerializer } from './html-serializer';
import type { RteView } from './view';
import { RteInlineImageFeature } from './features/inline-image';
import { RteListFeature } from './features/list';
import type { RteDocument } from './document';

const config = new RteConfig([
	new RteBase({
		heading1: true,
	}),
	new RteToolbarFeature(),
	new RteBoldFeature(),
	new RteItalicFeature(),
	new RteUnderlineFeature(),
	new RteLinkFeature(),
	new RteInlineImageFeature(),
	new RteListFeature({
		bulletList: true,
		numberedList: true,
	}),
]);

const {
	doc,
	heading1,
	paragraph: p,
	text,
	bold,
	italic,
	link,
	inlineImage: img,
	bulletList: ul,
	numberedList: ol,
	listItem: li,
} = docFactories;

describe('convertToView', () => {
	describe('HTML structure equivalence', () => {
		const normalizeDom = (dom: ParentNode) => {
			// Remove styling related attributes
			for (const el of dom.querySelectorAll('*')) {
				el.removeAttribute('part');
				el.removeAttribute('class');
				el.removeAttribute('style');
			}
		};

		const getViewHtmlStructure = async (view: RteView) => {
			const element = (await fixture(
				`<vwc-rich-text-view></vwc-rich-text-view>`
			)) as RichTextView;
			element.view = view;
			await elementUpdated(element);

			const contentEl = element
				.shadowRoot!.querySelector('.content')!
				.cloneNode(true) as HTMLDivElement;
			normalizeDom(contentEl);
			return contentEl.innerHTML;
		};

		const getSerializedHtmlStructure = (document: RteDocument) => {
			const serializer = new RteHtmlSerializer(config);
			return serializer.serializeDocument(document, {
				modifyDom: normalizeDom,
			});
		};

		it('should produce an identical structure to HTML serialization', async () => {
			const document = doc(
				heading1('heading'),
				p(
					text('text '),
					text.marks(bold())('bold '),
					text.marks(bold(), italic())('bold italic '),
					text.marks(
						link({ href: 'https://example.com' }),
						bold()
					)('bold link '),
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
						size: '100%',
						naturalWidth: 100,
						naturalHeight: 200,
					})()
				),
				ul(li('Item 1'), ul(li('Nested Item 2'))),
				ol(li('Item 1'), ol(li('Nested Item 2')))
			);

			const renderedHtml = await getViewHtmlStructure(
				config.instantiateView(document)
			);
			const serializedHtml = getSerializedHtmlStructure(document);

			expect(renderedHtml).toBe(serializedHtml);
		});

		it('should respect schema rank to determine mark order', async () => {
			const document = doc(
				p(text.marks(italic(), bold())('original')),
				p(text.marks(bold(), italic())('different mark order'))
			);

			const renderedHtml = await getViewHtmlStructure(
				config.instantiateView(document)
			);
			const serializedHtml = getSerializedHtmlStructure(document);

			expect(renderedHtml).toBe(serializedHtml);
		});

		it('should merge adjacent marks respecting schema rank', async () => {
			const document = doc(
				p(
					text.marks(link({ href: 'https://example.com' }))('our '),
					text.marks(link({ href: 'https://example.com' }), bold())('great '),
					text.marks(link({ href: 'https://example.com' }))('website')
				),
				p(
					text.marks(link({ href: 'https://example.com' }))('our '),
					text.marks(link({ href: 'https://example.com' }), bold())('website'),
					text.marks(bold())(' is great')
				),
				p(
					text.marks(bold())('our '),
					text.marks(link({ href: 'https://example.com' }), bold())('great '),
					text.marks(link({ href: 'https://example.com' }))('website')
				)
			);

			const renderedHtml = await getViewHtmlStructure(
				config.instantiateView(document)
			);
			const serializedHtml = getSerializedHtmlStructure(document);

			expect(renderedHtml).toBe(serializedHtml);
		});

		it('should not merge adjacent marks with different attributes', async () => {
			const document = doc(
				p(
					text.marks(link({ href: 'https://first.com' }))('first '),
					text.marks(link({ href: 'https://second.com' }))('second')
				)
			);

			const renderedHtml = await getViewHtmlStructure(
				config.instantiateView(document)
			);
			const serializedHtml = getSerializedHtmlStructure(document);

			expect(renderedHtml).toBe(serializedHtml);
		});
	});
});
