import { RTECore } from './features/core';
import { RTEBoldFeature } from './features/bold';
import { RTEConfig } from './config';
import { RTEFreeformStructure } from './features/freeform';
import { RTETextBlockStructure } from './features/text-block';
import { RTEAlignmentFeature } from './features/alignment';
import { docFactories } from './__tests__/doc-factories';
import { impl } from './utils/impl';

const { doc, text_line: line } = docFactories;

describe('RTEConfig', () => {
	it('should throw an error when required core feature is missing', () => {
		expect(() => new RTEConfig([new RTEBoldFeature()])).toThrow(
			'RTECore feature is required'
		);
	});

	it('should throw an error when a feature is provided multiple times', () => {
		expect(
			() =>
				new RTEConfig([
					new RTECore(),
					new RTEBoldFeature(),
					new RTEBoldFeature(),
				])
		).toThrow('Duplicate feature: RTEBoldFeature');
	});

	it('should throw an error when no structure is provided', () => {
		expect(() => new RTEConfig([new RTECore()])).toThrow(
			'Either RTETextBlockStructure or RTEFreeformStructure feature is required'
		);
	});

	it('should throw an error when multiple structures are provided', () => {
		expect(
			() =>
				new RTEConfig([
					new RTECore(),
					new RTEFreeformStructure(),
					new RTETextBlockStructure(),
				])
		).toThrow(
			'Either RTETextBlockStructure or RTEFreeformStructure feature is required'
		);
	});

	it('should throw an error when both RTEFreeformStructure and RTEAlignmentFeature are provided', () => {
		expect(
			() =>
				new RTEConfig([
					new RTECore(),
					new RTEFreeformStructure(),
					new RTEAlignmentFeature(),
				])
		).toThrow('RTEAlignmentFeature cannot be used with RTEFreeformStructure');
	});

	describe('instantiateEditor', () => {
		it('should initialise with an empty document by default', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor()[impl];
			expect(instance.state.doc.toString()).toBe('doc(text_line)');
		});

		it('should allow passing instance options', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor({
				initialDocument: doc(line('Hello world')),
			})[impl];
			expect(instance.state.doc.toString()).toBe(
				'doc(text_line("Hello world"))'
			);
		});
	});
});
