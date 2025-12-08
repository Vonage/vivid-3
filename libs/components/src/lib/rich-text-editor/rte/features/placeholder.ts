import { type MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { featureFacade, RteFeatureImpl } from '../feature';
import placeholderCss from './placeholder.style.scss?inline';

export type RtePlaceholderConfig = {
	text: string;
};

export class RtePlaceholderFeatureImpl extends RteFeatureImpl {
	protected name = 'RtePlaceholderFeature';

	constructor(protected config: RtePlaceholderConfig) {
		super();
	}

	override getStyles() {
		return [this.contribution(placeholderCss)];
	}

	override getPlugins() {
		const placeholderPlugin = new Plugin({
			props: {
				decorations: (state) => {
					// Placeholder should appear only when the editor is empty
					if (state.doc.nodeSize === 4) {
						const fontSizeMark = state.schema.marks.fontSize as
							| MarkType
							| undefined;
						const storedSize = fontSizeMark?.isInSet(state.storedMarks ?? [])
							?.attrs.size;

						// Placeholder style should be affected by the block type and font size, not by other text styles
						// Placing decoration into block will inherit block styles
						return DecorationSet.create(state.doc, [
							Decoration.widget(1, () => {
								const placeholder = document.createElement('span');
								placeholder.className = 'placeholder';
								placeholder.dataset.placeholder = this.config.text;
								if (storedSize) {
									placeholder.style.setProperty(
										'--placeholder-font-size',
										storedSize
									);
								}
								return placeholder;
							}),
						]);
					}
					return null;
				},
			},
		});

		return [this.contribution(placeholderPlugin)];
	}
}

export const RtePlaceholderFeature = featureFacade(RtePlaceholderFeatureImpl);
