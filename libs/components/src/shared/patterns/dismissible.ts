import { attr, html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';


/**
	* A mixin class implementing prefix elements.
	* These are generally used to decorate text elements with icons or other visual indicators.
	*
	* @public
	*/
export class Dismissible {
	/**
		* A decorative icon the custom element should have.
		*
		* @public
		* @remarks
		* HTML Attribute: dismissible
		*/
	@attr({ mode: 'boolean' }) dismissible = false;
	@attr({mode: 'boolean'}) open = false;
}

/**
 *
 */
function renderDismissButton() {
	return html<Banner>`
    <vwc-button
				    size="base-small"
			      class="dismiss-button"
			      icon="close-line"
			      @click="${x => x.open = false}">
    </vwc-button>`;
}

/**
	* The template for the prefixed element.
	* For use with {@link AffixIcon}
	*
	* @param context
	* @param icon
	* @public
	*/
export const dismissibleTemplate: (context: ElementDefinitionContext, icon?: string) =>
ViewTemplate<AffixIcon> = (context: ElementDefinitionContext, icon?: string) => {
	return html`${when(x => x.dismissible, renderDismissButton())}`;
};
