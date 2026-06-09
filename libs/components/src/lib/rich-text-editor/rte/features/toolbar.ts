import { Plugin } from 'prosemirror-state';
import { createDivider, UiCtx } from '../utils/ui';
import type { RteInstanceImpl } from '../instance';
import { featureFacade, RteFeatureImpl, sortedContributions } from '../feature';
import { FeatureState } from '../utils/feature-state';
import type { RteToolbarPublicInterface } from '../public-interface';
import toolbarCss from './toolbar.style.scss?inline';
import type { RteCoreImpl } from './internal/core';

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
						let focusCameFromEditorWithMouse = false;

						const ctx = new UiCtx(view, rte, {
							popupPlacement:
								this.config?.popupDirection === 'outward' ? 'bottom' : 'top',
							menuOffset: 8,
							disabled: () => core.disabled.getValue(rte),
							shouldReturnFocusToEditor: () => focusCameFromEditorWithMouse,
						});

						const toolbar = (
							view.dom.getRootNode() as ShadowRoot
						).querySelector('.toolbar')!;

						// Track whether focus on the toolbar arrived from the editor via a
						// mouse click, so that toolbar actions can optionally refocus the
						// editor. Comparing the timestamp prevents the focusin that follows
						// the same mousedown from clearing the flag.
						let mouseDownTime = -Infinity;

						const onMouseDown = () => {
							if (view.hasFocus()) {
								focusCameFromEditorWithMouse = true;
							}
							mouseDownTime = Date.now();
						};

						const onFocusIn = () => {
							if (Date.now() - mouseDownTime > 250) {
								focusCameFromEditorWithMouse = false;
							}
						};

						const onFocusOut = (e: FocusEvent) => {
							if (!toolbar.contains(e.relatedTarget as Node)) {
								focusCameFromEditorWithMouse = false;
							}
						};

						toolbar.addEventListener('mousedown', onMouseDown, {
							capture: true,
						});
						toolbar.addEventListener('focusin', onFocusIn);
						toolbar.addEventListener('focusout', onFocusOut as EventListener);

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
								toolbar.removeEventListener('mousedown', onMouseDown, {
									capture: true,
								} as EventListenerOptions);
								toolbar.removeEventListener('focusin', onFocusIn);
								toolbar.removeEventListener(
									'focusout',
									onFocusOut as EventListener
								);
								focusCameFromEditorWithMouse = false;
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
