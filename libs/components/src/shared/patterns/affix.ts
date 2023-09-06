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

export const AFFIX_ICON_SLOTTED_STATE = {
	SLOTTED: false,
	SPAN_WRAPPED_ICON: true
};

/**
 * The template for the prefixed element.
 * For use with {@link AffixIcon}
 *
 * @param context - element definition context
 * @param slottedState - set the icon in a span with class "icon", defaults to false
 * @public
 */
export const affixIconTemplateFactory: (context: ElementDefinitionContext) =>
(icon?: string, notSlotted?: boolean) => ViewTemplate<AffixIcon> | null = (context: ElementDefinitionContext) => {

	const iconTag = context.tagFor(Icon);
	return (icon?: string, slottedState = AFFIX_ICON_SLOTTED_STATE.SPAN_WRAPPED_ICON) => {
		if (!icon && !slottedState) {
			return html`<slot name="icon"></slot>`;
		}
		if (!icon && slottedState) {
			return null;
		}

		const iconTemplate = html`<${iconTag} :name="${() => icon}"></${iconTag}>`;


		// eslint-disable-next-line max-len
		return slottedState ? html`<span class="icon rachel">${iconTemplate}</span>` :  html`<slot class="icon slot" name="icon">${iconTemplate}</slot>`;
	};
};
