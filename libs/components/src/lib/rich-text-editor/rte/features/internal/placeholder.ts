import { type MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { RTEFeature } from '../../feature';
import type { RTEInstance } from '../../instance';
import type { FontSizeSpec } from '../font-size';
import placeholderCss from './placeholder.style.scss?inline';

export class RTEPlaceholderFeature extends RTEFeature {
	override getStyles() {
		return [{ css: placeholderCss }];
	}

	override getPlugins(rte: RTEInstance) {
		const placeholderPlugin = new Plugin({
			props: {
				decorations: (state) => {
					const placeholderText = rte.hostState().placeholder;
					if (!placeholderText) return null;

					// Placeholder should appear only when the editor is empty
					if (state.doc.nodeSize === 4) {
						const fontSizeMark = state.schema.marks.fontSize as
							| MarkType
							| undefined;
						const storedSize = fontSizeMark?.isInSet(state.storedMarks ?? [])
							?.attrs.size;
						const storedFontSize = storedSize
							? fontSizeMark.spec.fontSizes.find(
									(fs: FontSizeSpec) => fs.value === storedSize
							  )!.size
							: null;

						// Placeholder style should be affected by the block type and font size, not by other text styles
						// Placing decoration into block will inherit block styles
						return DecorationSet.create(state.doc, [
							Decoration.widget(1, () => {
								const placeholder = document.createElement('span');
								placeholder.className = 'placeholder';
								placeholder.dataset.placeholder = placeholderText;
								if (storedFontSize) {
									placeholder.style.setProperty(
										'--placeholder-font-size',
										storedFontSize
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

		return [{ plugin: placeholderPlugin }];
	}
}
