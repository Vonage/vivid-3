import { html, ViewTemplate, when } from '@microsoft/fast-element';
import { ElementDefinitionContext, MenuItemRole } from '@microsoft/fast-foundation';
import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
// import { Icon } from '../icon/icon';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { MenuItem } from './menu-item';
import { focusTemplateFactory } from './../../shared/patterns/focus';


const getClasses = ({
	disabled, checked, expanded, role, text, textSecondary
}: MenuItem) =>	classNames(
	'base',
	['disabled', Boolean(disabled)],
	['selected', role !== MenuItemRole.menuitem && Boolean(checked)],
	['expanded', Boolean(expanded)],
	['item-checkbox', role === MenuItemRole.menuitemcheckbox],
	['item-radio', role === MenuItemRole.menuitemradio],
	['two-lines', Boolean(text?.length) && Boolean(textSecondary?.length)]
);

/**
 * Generates a template for the {@link @microsoft/fast-foundation#(MenuItem:class)} component using
 * the provided prefix.
 *
 * @param options
 * @param context
 * @param definition
 * @public
 */
export const MenuItemTemplate:  (
	context: ElementDefinitionContext,
	definition: MenuItemOptions
) => ViewTemplate<MenuItem> = (
	context: ElementDefinitionContext,
	definition: MenuItemOptions
) => {
	// const iconTag = context.tagFor(Icon);
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	// const anchoredRegionTag = tagFor(options.anchoredRegion);
	return html<MenuItem>`
	<template
		aria-haspopup="${x => (x.hasSubmenu ? 'menu' : void 0)}"
		aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
		aria-disabled="${x => x.disabled}"
		aria-expanded="${x => x.expanded}"
		@keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
		@click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
		@mouseover="${(x, c) => x.handleMouseOver(c.event as MouseEvent)}"
		@mouseout="${(x, c) => x.handleMouseOut(c.event as MouseEvent)}"
	>
		<div class="${getClasses}">

				${when(
		x => x.hasSubmenu,
		html<MenuItem>`
								<div
										class="expand-collapse-glyph-container"
								>
										<span class="expand-collapse">
												<slot name="expand-collapse-indicator">
														${definition.expandCollapseGlyph || ''}
												</slot>
										</span>
								</div>
						`
	)}
			${() => focusTemplate}

			${when(x => x.role === MenuItemRole.menuitemcheckbox,
		html`${x => affixIconTemplate(x.checked ? 'checkbox-checked-line' : 'checkbox-unchecked-line')}`)}

			${when(x => x.role === MenuItemRole.menuitemradio,
		html`${x => affixIconTemplate(x.checked ? 'radio-checked-line' : 'radio-unchecked-line')}`)}

			${when(x => x.role === MenuItemRole.menuitem && x.icon,
		html`${x => affixIconTemplate(x.icon)}`)}

			${when(x => x.text || x.textSecondary, html`<span class="text">
				${when(x => x.text, html`<span class="text-primary">${x => x.text}</span>`)}
				${when(x => x.textSecondary, html`<span class="text-secondary">${x => x.textSecondary}</span>`)}
			</span>`)
}



		</div>
	</template>
	`;
};
