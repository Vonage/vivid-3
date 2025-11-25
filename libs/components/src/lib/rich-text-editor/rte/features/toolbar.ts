import { Plugin } from 'prosemirror-state';
import { createDivider, UiCtx } from '../utils/ui';
import { RTEInstanceImpl } from '../instance';
import { featureFacade, RTEFeatureImpl, sortedContributions } from '../feature';
import toolbarCss from './toolbar.style.scss?inline';

export interface ToolbarItemSpec {
	section: 'history' | 'font' | 'text-style' | 'textblock' | 'insert';
	render(ctx: UiCtx): HTMLElement | DocumentFragment;
}

export interface RTEToolbarFeatureConfig {
	/**
	 * Whether tooltips and other popups prefer to open towards or away from the main text-editing area.
	 * Default: 'inward'
	 */
	popupDirection?: 'inward' | 'outward';
}

export class RTEToolbarFeatureImpl extends RTEFeatureImpl {
	protected name = 'RTEToolbarFeature';

	constructor(protected config?: RTEToolbarFeatureConfig) {
		super();
	}

	override getStyles() {
		return [this.contribution(toolbarCss)];
	}

	override getPlugins(rte: RTEInstanceImpl) {
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
						const ctx = new UiCtx(view, rte, {
							popupPlacement:
								this.config?.popupDirection === 'outward' ? 'bottom' : 'top',
						});

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

export const RTEToolbarFeature = featureFacade(RTEToolbarFeatureImpl);
