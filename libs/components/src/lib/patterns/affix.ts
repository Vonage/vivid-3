import { attr, html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';

/**
 * A mixin class implementing affix elements.
 * These are generally used to decorate text elements with icons or other visual indicators.
 *
 * @public
 */
export class Affix {
	/**
	 * A decorative icon the custom element should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: icon
	 */
	@attr icon?: string;
}

/**
 * A mixin class implementing icon affix alignment.
 *
 * @public
 */
export class Suffix {
	/**
	 * Indicates the icon affix alignment.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: icon-trailing
	 */
	@attr({
		mode: 'boolean',
		attribute: 'icon-trailing',
	}) iconTrailing = false;
}

export const affixTemplate: (context: ElementDefinitionContext) => ViewTemplate<Affix> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="icon"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
};
