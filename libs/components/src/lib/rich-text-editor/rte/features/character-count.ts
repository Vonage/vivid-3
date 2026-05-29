import type { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { featureFacade, RteFeatureImpl } from '../feature';
import type { RteInstanceImpl } from '../instance';
import type { RteCharacterCountPublicInterface } from '../public-interface';

export type RteCharacterCountConfig = {
	/**
	 * Maximum number of characters allowed.
	 * When set, input that would exceed the limit is blocked.
	 * Pasted content is truncated to fit within the limit.
	 * If not set, characters are counted but not limited.
	 */
	limit?: number;
};

const countCharacters = (doc: Node) =>
	doc.textBetween(0, doc.content.size, undefined, ' ').length;

export class RteCharacterCountFeatureImpl extends RteFeatureImpl {
	name = 'RteCharacterCountFeature';

	constructor(protected config?: RteCharacterCountConfig) {
		super();
	}

	override getPlugins() {
		const limit = this.config?.limit;
		if (limit === undefined) {
			return [];
		}

		return [
			this.contribution(
				new Plugin({
					filterTransaction: (transaction, state) => {
						if (!transaction.docChanged) {
							return true;
						}

						const oldSize = countCharacters(state.doc);
						const newSize = countCharacters(transaction.doc);

						// Within limit
						if (newSize <= limit) {
							return true;
						}

						// If old doc was over limit we allow reducing it but not adding to it
						if (oldSize > limit) {
							return newSize <= oldSize;
						}

						const isPaste = transaction.getMeta('paste');

						// Block all exceeding transactions that were not pasted.
						if (!isPaste) {
							return false;
						}

						// For pasted content, try to remove the exceeding content.
						const pos = transaction.selection.$head.pos;
						const over = newSize - limit;
						const from = pos - over;
						const to = pos;

						transaction.deleteRange(from, to);

						const updatedSize = countCharacters(transaction.doc);

						// In some situations, the limit will continue to be exceeded after trimming.
						// If this is the case, prevent the transaction completely.
						return updatedSize <= limit;
					},
				})
			),
		];
	}

	override getPublicInterface(
		rte: RteInstanceImpl
	): RteCharacterCountPublicInterface {
		const limit = this.config?.limit;
		return {
			get characters() {
				return countCharacters(rte.state.doc);
			},
			get limit() {
				return limit;
			},
		};
	}
}

export const RteCharacterCountFeature = featureFacade(
	RteCharacterCountFeatureImpl
);
