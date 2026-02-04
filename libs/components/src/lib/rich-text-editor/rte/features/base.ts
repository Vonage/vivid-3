import { featureFacade, RteFeatureImpl } from '../feature';
import type { RteInstanceImpl } from '../instance';
import { RteCoreImpl } from './internal/core';
import { RteBasicTextBlocksImpl } from './internal/basic-text-blocks';
import { RteInputRulesFeatureImpl } from './internal/input-rules';

export type RteBaseConfig = {
	heading1?: boolean;
	heading2?: boolean;
	heading3?: boolean;
	paragraph?: boolean;
};

export interface RteBasePublicInterface {
	/**
	 * Whether the editor is disabled. When disabled, user input is prevented and UI elements are disabled.
	 */
	disabled: boolean;
}
declare module '../feature' {
	export function getPublicInterface(
		facade: typeof RteBase
	): RteBasePublicInterface;
}

export class RteBaseImpl extends RteFeatureImpl {
	name = 'RteBase';

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

	override getPublicInterface(rte: RteInstanceImpl): RteBasePublicInterface {
		const core = rte.getFeature<RteCoreImpl>('RteCore');
		return {
			get disabled() {
				return core.disabled.getValue(rte);
			},
			set disabled(value: boolean) {
				core.disabled.setValue(rte, value);
			},
		};
	}
}

export const RteBase = featureFacade(RteBaseImpl);
