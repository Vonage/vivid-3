import { RTEFeature, type SchemaContribution } from '../feature';

export class RTEFreeformStructure extends RTEFeature {
	override getSchema(): SchemaContribution[] {
		return [
			{
				schema: {
					nodes: {
						text: {
							group: 'inline',
						},
						// Since block and inline elements cannot be mixed, create a block for lines of text
						text_line: {
							group: 'block',
							content: 'inline*',
							parseDOM: [{ tag: 'div' }],
							toDOM() {
								return ['div', 0];
							},
						},
						doc: { content: 'block+' },
					},
				},
			},
		];
	}

	override getPlugins() {
		return [];
	}
}
