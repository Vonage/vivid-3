import { RteBase } from './features/base';
import { RteBoldFeature } from './features/bold';
import { RteConfig } from './config';
import { docFactories } from './__tests__/doc-factories';
import { impl } from './utils/impl';
import { RteLinkFeature } from './features/link';

const { doc, paragraph: p } = docFactories;

describe('RteConfig', () => {
	it('should throw an error when required base feature is missing', () => {
		expect(() => new RteConfig([new RteBoldFeature()])).toThrow(
			'RteBase feature is required'
		);
	});

	it('should throw an error when link feature is present without toolbar', () => {
		expect(() => new RteConfig([new RteBase(), new RteLinkFeature()])).toThrow(
			'RteToolbarFeature is required for RteLinkFeature'
		);
	});

	it('should throw an error when a feature is provided multiple times', () => {
		expect(
			() =>
				new RteConfig([
					new RteBase(),
					new RteBoldFeature(),
					new RteBoldFeature(),
				])
		).toThrow('Duplicate feature: RteBoldFeature');
	});

	it('should throw an mark features reference unknown nodes', () => {
		expect(
			() =>
				new RteConfig([
					new RteBase(),
					new RteBoldFeature({
						onBlocks: [{ node: 'nonExistentNode' }],
					}),
				])
		).toThrow('Unknown node "nonExistentNode"');
	});

	describe('instantiateEditor', () => {
		it('should initialise with an empty document by default', () => {
			const config = new RteConfig([new RteBase()]);
			const instance = config.instantiateEditor()[impl];
			expect(instance.state.doc.toString()).toBe('doc(paragraph)');
		});
		it('should allow passing instance options', () => {
			const config = new RteConfig([new RteBase()]);
			const instance = config.instantiateEditor({
				initialDocument: doc(p('Hello world')),
			})[impl];
			expect(instance.state.doc.toString()).toBe(
				'doc(paragraph("Hello world"))'
			);
		});
	});
});
