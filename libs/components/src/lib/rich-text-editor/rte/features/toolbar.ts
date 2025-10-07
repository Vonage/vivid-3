import { Plugin } from 'prosemirror-state';
import {
	createDivider,
	ToolbarCtx,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature } from '../feature';
import toolbarCss from './toolbar.style.scss?inline';

export class RTEToolbarFeature extends RTEFeature {
	override getStyles() {
		return [{ css: toolbarCss }];
	}

	override getPlugins(rte: RTEInstance) {
		const sections = ['history', 'font', 'text-style', 'textblock'] as const;
		const itemsBySection = new Map(
			sections.map((section) => [section, [] as ToolbarItemSpec[]])
		);

		for (const toolbarItem of rte.features.flatMap((f) =>
			f.getToolbarItems(rte)
		)) {
			itemsBySection.get(toolbarItem.section)!.push(toolbarItem);
		}

		for (const section of itemsBySection.values()) {
			section.sort((a, b) => a.order - b.order);
		}

		return [
			{
				plugin: new Plugin({
					view: (view) => {
						const ctx = new ToolbarCtx(view, rte);

						const toolbar = document.createElement('div');
						toolbar.className = 'toolbar';

						let openSection = false;
						for (const section of sections) {
							const items = itemsBySection.get(section)!;

							if (items.length && openSection) {
								toolbar.appendChild(createDivider(ctx));
								openSection = false;
							}

							for (const toolbarItemSpec of items) {
								toolbar.appendChild(toolbarItemSpec.render(ctx));
								openSection = true;
							}
						}
						view.dom.parentElement!.after(toolbar);

						return {
							update() {
								ctx.updateBindings();
							},
							destroy() {
								toolbar.remove();
							},
						};
					},
				}),
			},
		];
	}
}
