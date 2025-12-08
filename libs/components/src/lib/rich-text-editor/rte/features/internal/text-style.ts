import { RteFeatureImpl } from '../../feature';

export type RteTextStyleConfig = {
	onBlocks?: Array<{ node: string }>;
};

export abstract class RteTextStyleFeatureImpl extends RteFeatureImpl {
	protected abstract markName: string;

	constructor(protected config?: RteTextStyleConfig) {
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
