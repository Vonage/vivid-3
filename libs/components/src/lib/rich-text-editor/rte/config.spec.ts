import { RteCore } from './features/core';
import { RteBoldFeature } from './features/bold';
import { RteConfig } from './config';
import { RteFreeformStructure } from './features/freeform';
import { RteTextBlockStructure } from './features/text-block';
import { RteAlignmentFeature } from './features/alignment';
import { docFactories } from './__tests__/doc-factories';
import { impl } from './utils/impl';
import { basicTextBlocks } from './__tests__/text-blocks';

const { doc, textLine: line } = docFactories;

describe('RteConfig', () => {
	it('should throw an error when required core feature is missing', () => {
		expect(() => new RteConfig([new RteBoldFeature()])).toThrow(
			'RteCore feature is required'
		);
	});

	it('should throw an error when a feature is provided multiple times', () => {
		expect(
			() =>
				new RteConfig([
					new RteCore(),
					new RteBoldFeature(),
					new RteBoldFeature(),
				])
		).toThrow('Duplicate feature: RteBoldFeature');
	});

	it('should throw an error when no structure is provided', () => {
		expect(() => new RteConfig([new RteCore()])).toThrow(
			'Either RteTextBlockStructure or RteFreeformStructure feature is required'
		);
	});

	it('should throw an error when multiple structures are provided', () => {
		expect(
			() =>
				new RteConfig([
					new RteCore(),
					new RteFreeformStructure(),
					new RteTextBlockStructure({ blocks: basicTextBlocks }),
				])
		).toThrow(
			'Either RteTextBlockStructure or RteFreeformStructure feature is required'
		);
	});

	it('should throw an error when both RteFreeformStructure and RteAlignmentFeature are provided', () => {
		expect(
			() =>
				new RteConfig([
					new RteCore(),
					new RteFreeformStructure(),
					new RteAlignmentFeature(),
				])
		).toThrow('RteAlignmentFeature cannot be used with RteFreeformStructure');
	});

	describe('instantiateEditor', () => {
		it('should initialise with an empty document by default', () => {
			const config = new RteConfig([new RteCore(), new RteFreeformStructure()]);
			const instance = config.instantiateEditor()[impl];
			expect(instance.state.doc.toString()).toBe('doc(textLine)');
		});
		it('should allow passing instance options', () => {
			const config = new RteConfig([new RteCore(), new RteFreeformStructure()]);
			const instance = config.instantiateEditor({
				initialDocument: doc(line('Hello world')),
			})[impl];
			expect(instance.state.doc.toString()).toBe(
				'doc(textLine("Hello world"))'
			);
		});
	});
});
