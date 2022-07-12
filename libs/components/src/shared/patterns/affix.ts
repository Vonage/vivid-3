import { attr, html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { Icon } from '../../lib/icon/icon';

/**
	* A mixin class implementing prefix elements.
	* These are generally used to decorate text elements with icons or other visual indicators.
	*
	* @public
	*/
export class AffixIcon {
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
	* A mixin class implementing icon affix (prefix or suffix) alignment.
	*
	* @public
	*/
export class AffixIconWithTrailing extends AffixIcon {
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

/**
 * The template for the prefixed element.
 * For use with {@link AffixIcon}
 *
 * @param context
 * @param icon
 * @public
 */
export const affixIconTemplateFactory: (context: ElementDefinitionContext) =>
(icon?: string) => ViewTemplate<AffixIcon> | null = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	return (icon?: string) => icon
		? html`<span class="icon"><${iconTag} :type="${() => icon}"></${iconTag}></span>`
		: null;
};
