import { RTECore } from './features/core';
import { RTEBoldFeature } from './features/bold';
import { RTEConfig } from './config';
import { RTEFreeformStructure } from './features/freeform';
import { RTETextBlockStructure } from './features/text-block';

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

	it('should initialise with an empty doc by default', () => {
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
		const rte = config.instantiateEditor();
		expect(rte.state.doc.toString()).toBe('doc');
	});

	it('should allow passing an initial doc', () => {
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
		const features = config.instantiateEditor([
			{ type: 'text', text: 'Hello world' },
		]);
		expect(features.state.doc.toString()).toBe('doc("Hello world")');
	});

	it('should serialize HTML based on the schema', () => {
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEBoldFeature(),
		]);
		const features = config.instantiateEditor([
			{ type: 'text', text: 'Hello ' },
			{
				type: 'text',
				text: 'world',
				marks: [
					{
						type: 'bold',
					},
				],
			},
		]);
		expect(config.toHTML(features.getDoc())).toBe(
			'Hello <strong>world</strong>'
		);
	});

	it('should parse HTML based on the schema', () => {
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEBoldFeature(),
		]);
		expect(config.parseHTML('Hello <strong>world</strong>')).toEqual([
			{ type: 'text', text: 'Hello ' },
			{
				type: 'text',
				text: 'world',
				marks: [
					{
						type: 'bold',
					},
				],
			},
		]);
	});
});
