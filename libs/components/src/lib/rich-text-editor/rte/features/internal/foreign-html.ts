import { Plugin } from 'prosemirror-state';
import { RTEFeature } from '../../feature';
import type { RTEInstance } from '../../instance';
import { impl } from '../../utils/impl';

export class RTEForeignHtmlFeature extends RTEFeature {
	protected name = 'RTEHtmlConversionFeature';

	override getPlugins(rte: RTEInstance) {
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
