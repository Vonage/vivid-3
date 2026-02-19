import { Plugin } from 'prosemirror-state';
import { RteFeatureImpl } from '../../feature';
import type { RteInstanceImpl } from '../../instance';
import { impl } from '../../utils/impl';

export class RteForeignHtmlFeatureImpl extends RteFeatureImpl {
	name = 'RteForeignHtmlFeature';

	override getPlugins(rte: RteInstanceImpl) {
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
