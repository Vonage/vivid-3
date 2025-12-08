import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
} from '../feature';

export class RteFreeformStructureImpl extends RteFeatureImpl {
	protected name = 'RteFreeformStructure';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				nodes: {
					text: {
						group: 'inline',
					},
					// Since block and inline elements cannot be mixed, create a block for lines of text
					textLine: {
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

export const RteFreeformStructure = featureFacade(RteFreeformStructureImpl);
