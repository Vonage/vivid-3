import { Plugin } from 'prosemirror-state';
import { createDivider, UiCtx } from '../utils/ui';
import { RteInstanceImpl } from '../instance';
import { featureFacade, RteFeatureImpl, sortedContributions } from '../feature';
import { FeatureState } from '../utils/feature-state';
import toolbarCss from './toolbar.style.scss?inline';
import { RteCoreImpl } from './internal/core';

export interface ToolbarItemSpec {
	section: 'history' | 'font' | 'text-style' | 'textblock' | 'insert';
	render(ctx: UiCtx): HTMLElement | DocumentFragment;
}

export interface RteToolbarConfig {
	/**
	 * Whether tooltips and other popups prefer to open towards or away from the main text-editing area.
	 * Default: 'inward'
	 */
	popupDirection?: 'inward' | 'outward';
}

export interface RteToolbarPublicInterface {
	/**
	 * Whether the toolbar is hidden.
	 */
	hidden: boolean;
}
declare module '../feature' {
	export function getPublicInterface(
		facade: typeof RteToolbarFeature
	): RteToolbarPublicInterface;
}

export class RteToolbarFeatureImpl extends RteFeatureImpl {
	name = 'RteToolbarFeature';

	hidden = new FeatureState(false);

	constructor(protected config?: RteToolbarConfig) {
		super();
	}

	override getStyles() {
		return [this.contribution(toolbarCss)];
	}

	override getPlugins(rte: RteInstanceImpl) {
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

		const core = rte.getFeature<RteCoreImpl>('RteCore');

		return [
			this.contribution(this.hidden.plugin),
			this.contribution(
				new Plugin({
					view: (view) => {
						const ctx = new UiCtx(view, rte, {
							popupPlacement:
								this.config?.popupDirection === 'outward' ? 'bottom' : 'top',
							menuOffset: 8,
							disabled: () => core.disabled.getValue(rte),
						});

						const toolbar = (
							view.dom.getRootNode() as ShadowRoot
						).querySelector('.toolbar')!;
						ctx.bindProp(
							() => this.hidden.getValue(rte),
							(hidden) => {
								toolbar.classList.toggle('toolbar--hidden', hidden);
							}
						);

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

	override getPublicInterface(rte: RteInstanceImpl): RteToolbarPublicInterface {
		const hidden = this.hidden;
		return {
			get hidden() {
				return hidden.getValue(rte);
			},
			set hidden(value: boolean) {
				hidden.setValue(rte, value);
			},
		};
	}
}

export const RteToolbarFeature = featureFacade(RteToolbarFeatureImpl);
