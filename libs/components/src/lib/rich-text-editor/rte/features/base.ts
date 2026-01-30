import { featureFacade, RteFeatureImpl } from '../feature';
import { RteCoreImpl } from './internal/core';
import { RteBasicTextBlocksImpl } from './internal/basic-text-blocks';
import { RteInputRulesFeatureImpl } from './internal/input-rules';

export type RteBaseConfig = {
	heading1?: boolean;
	heading2?: boolean;
	heading3?: boolean;
	paragraph?: boolean;
};

export class RteBaseImpl extends RteFeatureImpl {
	protected name = 'RteBase';

	constructor(protected config?: RteBaseConfig) {
		super();
	}

	override getSchema() {
		return [
			this.contribution({
				nodes: {
					doc: {
						content: 'block+',
					},
					text: {
						group: 'inline',
					},
				},
			}),
		];
	}

	override getFeatures(): RteFeatureImpl[] {
		return [
			this,
			new RteCoreImpl(),
			new RteBasicTextBlocksImpl({
				heading1: this.config?.heading1 ?? false,
				heading2: this.config?.heading2 ?? false,
				heading3: this.config?.heading3 ?? false,
				paragraph: this.config?.paragraph ?? true,
			}),
			new RteInputRulesFeatureImpl(),
		];
	}
}

export const RteBase = featureFacade(RteBaseImpl);
