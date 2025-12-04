import { RteFeatureImpl } from '../../feature';

export type RteTextStyleFeatureConfig = {
	onBlocks?: Array<{ node: string }>;
};

export abstract class RteTextStyleFeatureImpl extends RteFeatureImpl {
	protected abstract markName: string;

	constructor(protected config?: RteTextStyleFeatureConfig) {
		super();
	}

	override getTextblockMarks() {
		if (this.config?.onBlocks) {
			return this.config.onBlocks.map((block) =>
				this.contribution({
					markName: this.markName,
					onNodeName: block.node,
				})
			);
		}
		return [
			this.contribution({
				markName: this.markName,
			}),
		];
	}
}
