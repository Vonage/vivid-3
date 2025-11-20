import {
	featureFacade,
	RTEFeatureImpl,
	type SchemaContribution,
} from '../feature';

export class RTEFreeformStructureImpl extends RTEFeatureImpl {
	protected name = 'RTEFreeformStructure';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
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
			}),
		];
	}
}

export const RTEFreeformStructure = featureFacade(RTEFreeformStructureImpl);
