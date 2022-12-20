import { html, ViewTemplate, when } from '@microsoft/fast-element';
import { ElementDefinitionContext, MenuItemRole } from '@microsoft/fast-foundation';
import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { resolveIcon } from '../icon/icon';
// import { Icon } from '../icon/icon';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { MenuItem } from './menu-item';
import { focusTemplateFactory } from './../../shared/patterns/focus';


const getClasses = ({
	disabled, checked, expanded, role
}: MenuItem) =>	classNames(
	'base',
	['disabled', Boolean(disabled)],
	['selected', role !== MenuItemRole.menuitem && Boolean(checked)],
	['expanded', Boolean(expanded)],
	['item-checkbox', role === MenuItemRole.menuitemcheckbox],
	['item-radio', role === MenuItemRole.menuitemradio]
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
	['checkbox-checked-line', 'checkbox-unchecked-line', 'radio-checked-line', 'radio-unchecked-line'].forEach(i => resolveIcon(i));

	// const anchoredRegionTag = tagFor(options.anchoredRegion);
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

			${when(x => x.role === MenuItemRole.menuitemcheckbox,
		html`${x => affixIconTemplate(x.checked ? 'checkbox-checked-line' : 'checkbox-unchecked-line')}`)}

			${when(x => x.role === MenuItemRole.menuitemradio,
		html`${x => affixIconTemplate(x.checked ? 'radio-checked-line' : 'radio-unchecked-line')}`)}

			${when(x => x.role === MenuItemRole.menuitem && x.icon,
		html`${x => affixIconTemplate(x.icon)}`)}

			<span class="text">
				${x => x.text}
			</span>
		</div>
	</template>
	`;
};
