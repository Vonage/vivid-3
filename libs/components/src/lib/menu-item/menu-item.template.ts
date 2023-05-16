import { html, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import { ElementDefinitionContext, MenuItemRole } from '@microsoft/fast-foundation';
import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { MenuItem } from './menu-item';
import { focusTemplateFactory } from './../../shared/patterns/focus';

const getCheckIcon = (affixIconTemplate: any, x: MenuItem, iconType: string) => {
	const iconStatus = x.checked ? 'checked' : 'unchecked';
	const icon = `${iconType}-${iconStatus}-line`;
	return affixIconTemplate(icon, x.icon ? 'trailing' : '');
};

const getClasses = ({
	disabled, checked, expanded, role, text, textSecondary, icon, metaSlottedContent
}: MenuItem) =>	classNames(
	'base',
	['disabled', Boolean(disabled)],
	['selected', role !== MenuItemRole.menuitem && Boolean(checked)],
	['trailing', role !== MenuItemRole.menuitem && Boolean(icon)],
	['expanded', Boolean(expanded)],
	['item-checkbox', role === MenuItemRole.menuitemcheckbox],
	['item-radio', role === MenuItemRole.menuitemradio],
	['two-lines', Boolean(text?.length) && Boolean(textSecondary?.length)],
	['has-meta', Boolean(metaSlottedContent?.length)]
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
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<MenuItem>`
	<template
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
			${when(x => (x.role !== MenuItemRole.menuitemcheckbox && x.role !== MenuItemRole.menuitemradio),
		html`<slot name="meta" ${slotted('metaSlottedContent')}></slot>`)}
			${when(x => x.role === MenuItemRole.menuitemcheckbox,
		html`<span class="action">${x => getCheckIcon(affixIconTemplate, x, 'checkbox')}</span>`)}

			${when(x => x.role === MenuItemRole.menuitemradio,
		html`<span class="action">${x => getCheckIcon(affixIconTemplate, x, 'radio')}</span>`)}

			${when(x => x.icon,
		html`<span class="decorative">${x => affixIconTemplate(x.icon)}</span>`)}

			${when(x => x.text || x.textSecondary, html`<span class="text">
				${when(x => x.text, html`<span class="text-primary">${x => x.text}</span>`)}
				${when(x => x.textSecondary, html`<span class="text-secondary">${x => x.textSecondary}</span>`)}
			</span>`)
}



		</div>
	</template>
	`;
};
