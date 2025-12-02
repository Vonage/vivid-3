import { RteHtmlParser } from './html-parser';
import { RteConfig } from './config';
import { RteCore } from './features/core';
import { RteFreeformStructure } from './features/freeform';
import { RteBoldFeature } from './features/bold';
import { RteLinkFeature } from './features/link';
import { docFactories } from './__tests__/doc-factories';
import { RteItalicFeature } from './features/italic';
import { RteInlineImageFeature } from './features/inline-image';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
} from './feature';

const config = new RteConfig([
	new RteCore(),
	new RteFreeformStructure(),
	new RteBoldFeature(),
	new RteItalicFeature(),
	new RteLinkFeature(),
	new RteInlineImageFeature(),
]);

const {
	doc,
	textLine: line,
	text,
	inlineImage: img,
	bold,
	italic,
} = docFactories;

describe('RteHtmlParser', () => {
	it('should parse HTML into fragment', async () => {
		const parser = new RteHtmlParser(config);

		expect(parser.parseFragment('<strong>Hello</strong> world!')).toEqual([
			text.marks(bold())('Hello'),
			text(' world!'),
		]);
	});

	it('should parse HTML into document', async () => {
		const parser = new RteHtmlParser(config);

		expect(
			parser.parseDocument('<div><strong>Hello</strong> world!</div>')
		).toEqual(doc(line(text.marks(bold())('Hello'), text(' world!'))));
	});

	it('should sanitize HTML', async () => {
		const parser = new RteHtmlParser(config);

		expect(
			parser.parseFragment(
				`<div><a href="javascript:alert('xss')">Evil</a></div>`
			)
		).toEqual([line(text('Evil'))]);
	});

	it('should parse empty HTML into empty fragment', async () => {
		const parser = new RteHtmlParser(config);

		expect(parser.parseFragment('')).toEqual([]);
	});

	it('should apply parse rules modified by modifyParseRules', async () => {
		const parser = new RteHtmlParser(config, {
			modifyParseRules: (rules) => {
				rules.marks.bold = [];
				rules.marks.italic.push({
					tag: 'span.italic',
				});
			},
		});

		expect(
			parser.parseFragment(
				'<strong>bold</strong><span class="italic">italic</span>'
			)
		).toEqual([text('bold'), text.marks(italic())('italic')]);
	});

	it('should apply priority of parse rules', async () => {
		const parser = new RteHtmlParser(config, {
			modifyParseRules: (rules) => {
				rules.marks.italic.push({
					priority: 100,
					tag: 'strong',
				});
			},
		});

		expect(parser.parseFragment('<strong>italic</strong>')).toEqual([
			text.marks(italic())('italic'),
		]);
	});

	it('should default nodes and marks with no default parse to an empty array', async () => {
		class DummyFeatureImpl extends RteFeatureImpl {
			protected name = 'DummyFeature';

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
		const DummyFeature = featureFacade(DummyFeatureImpl);
		let parseRules;
		// eslint-disable-next-line no-new
		new RteHtmlParser(
			new RteConfig([
				new RteCore(),
				new RteFreeformStructure(),
				new DummyFeature(),
			]),
			{
				modifyParseRules: (rules) => {
					parseRules = rules;
				},
			}
		);

		expect(parseRules!.nodes['dummyNode']).toEqual([]);
		expect(parseRules!.marks['dummyMark']).toEqual([]);
	});

	it('should parse DOM modified by modifyDom', async () => {
		const parser = new RteHtmlParser(config);

		expect(
			parser.parseFragment('<img data-attachment-id="1">', {
				modifyDom: (dom) => {
					for (const img of dom
						.querySelectorAll('img[data-attachment-id]')
						.values()) {
						img.setAttribute(
							'src',
							`attachment://${img.getAttribute('data-attachment-id')}`
						);
					}
				},
			})
		).toEqual([
			img.attrs({
				imageUrl: 'attachment://1',
				alt: '',
				naturalHeight: null,
				naturalWidth: null,
				size: null,
			})(),
		]);
	});
});
