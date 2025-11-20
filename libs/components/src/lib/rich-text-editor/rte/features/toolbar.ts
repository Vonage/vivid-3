import { Plugin } from 'prosemirror-state';
import {
	createDivider,
	ToolbarCtx,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature, sortedContributions } from '../feature';
import toolbarCss from './toolbar.style.scss?inline';

export class RTEToolbarFeature extends RTEFeature {
	protected name = 'RTEToolbarFeature';

	override getStyles() {
		return [this.contribution(toolbarCss)];
	}

	override getPlugins(rte: RTEInstance) {
		const sections = [
			'history',
			'font',
			'text-style',
			'textblock',
			'insert',
		] as const;
		const itemsBySection = new Map(
			sections.map((section) => [section, [] as ToolbarItemSpec[]])
		);

		for (const toolbarItem of sortedContributions(
			rte.features.flatMap((f) => f.getToolbarItems(rte))
		)) {
			itemsBySection.get(toolbarItem.section)!.push(toolbarItem);
		}

		return [
			this.contribution(
				new Plugin({
					view: (view) => {
						const ctx = new ToolbarCtx(view, rte);

						const toolbar = (
							view.dom.getRootNode() as ShadowRoot
						).querySelector('.toolbar')!;

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

						return {
							update() {
								ctx.updateBindings();
							},
							destroy() {
								toolbar.innerHTML = '';
							},
						};
					},
				})
			),
		];
	}
}
