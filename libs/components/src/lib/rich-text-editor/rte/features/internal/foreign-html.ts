import { Plugin } from 'prosemirror-state';
import { RTEFeatureImpl } from '../../feature';
import type { RTEInstanceImpl } from '../../instance';
import { impl } from '../../utils/impl';

export class RTEForeignHtmlFeatureImpl extends RTEFeatureImpl {
	protected name = 'RTEForeignHtmlFeature';

	override getPlugins(rte: RTEInstanceImpl) {
		return [
			this.contribution(
				new Plugin({
					props: {
						transformPastedHTML: (html: string) =>
							rte.foreignHtmlParser[impl].transform(html),
						// ProseMirror uses the clipboard parser/serializer for both clipboard and drag-and-drop operations:
						clipboardParser: rte.foreignHtmlParser[impl].parser,
						clipboardSerializer: rte.foreignHtmlSerializer[impl].serializer,
					},
				})
			),
		];
	}
}
