import { html, ViewTemplate, when } from '@microsoft/fast-element';
import { ElementDefinitionContext, MenuItemRole } from '@microsoft/fast-foundation';
import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { MenuItem } from './menu-item';
import { focusTemplateFactory } from './../../shared/patterns/focus';


const getClasses = ({
	disabled, checked, expanded, startColumnCount
}: MenuItem) =>	classNames(
	'base',
	`indent-${startColumnCount}`,
	['disabled', Boolean(disabled)],
	['selected', Boolean(checked)],
	['expanded', Boolean(expanded)]
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
	const iconTag = context.tagFor(Icon);
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

						${when(x => x.role === MenuItemRole.menuitemcheckbox,
		html<MenuItem>`<${iconTag}
		size="medium"
							class="indicator"
		type="${x => x.checked
		? 'checkbox-checked-line'
		: 'checkbox-unchecked-line'
}"></${iconTag}>`)}

						${when(
		x => x.role === MenuItemRole.menuitemradio,
		html<MenuItem>`<${iconTag}
		size="medium"
							class="indicator"
		type="${x => x.checked
		? 'radio-checked-line'
		: 'radio-unchecked-line'
}"></${iconTag}>`
	)}

				<span class="content" part="content">
						${x => x.textContent}
				</span>
				${when(
		x => x.hasSubmenu,
		html<MenuItem>`
								<div
										part="expand-collapse-glyph-container"
										class="expand-collapse-glyph-container"
								>
										<span part="expand-collapse" class="expand-collapse">
												<slot name="expand-collapse-indicator">
														${definition.expandCollapseGlyph ?? ''}
												</slot>
										</span>
								</div>
						`
	)}
		${() => focusTemplate}
		</div>
	</template>
	`;
};
