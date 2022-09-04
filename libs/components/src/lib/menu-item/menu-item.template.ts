import { html, when } from '@microsoft/fast-element';
import { MenuItemRole } from '@microsoft/fast-foundation';
import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { MenuItem } from './menu-item';

const getClasses = ({
	disabled, checked, expanded, startColumnCount
}: MenuItem) =>	classNames(
	'control',
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
 * @public
 */
export function MenuItemTemplate<T extends MenuItem>(
	options: MenuItemOptions
) {
	// const anchoredRegionTag = tagFor(options.anchoredRegion);
	return html<T>`
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
		x => x.role === MenuItemRole.menuitemcheckbox,
		html<MenuItem>`
										<div part="input-container" class="input-container">
												<span part="checkbox" class="checkbox">
														<slot name="checkbox-indicator">
																${options.checkboxIndicator ?? ''}
														</slot>
												</span>
										</div>
								`
	)}
						${when(
		x => x.role === MenuItemRole.menuitemradio,
		html<MenuItem>`
										<div part="input-container" class="input-container">
												<span part="radio" class="radio">
														<slot name="radio-indicator">
																${options.radioIndicator ?? ''}
														</slot>
												</span>
										</div>
								`
	)}

				<span class="content" part="content">
						${x => x.textContent}
				</span>
				${when(
		x => x.hasSubmenu,
		html<T>`
								<div
										part="expand-collapse-glyph-container"
										class="expand-collapse-glyph-container"
								>
										<span part="expand-collapse" class="expand-collapse">
												<slot name="expand-collapse-indicator">
														${options.expandCollapseGlyph ?? ''}
												</slot>
										</span>
								</div>
						`
	)}
		</div>
	</template>
	`;
}
