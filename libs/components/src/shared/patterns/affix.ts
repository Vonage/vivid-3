import { attr, html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../../lib/icon/icon';

/**
	* A mixin class implementing prefix elements.
	* These are generally used to decorate text elements with icons or other visual indicators.
	*
	* @public
	*/
export class Prefix {
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
export class PrefixOrSuffix extends Prefix {
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
	* For use with {@link Prefix}
	*
	* @param context
	* @public
	*/
export const prefixTemplate: (context: ElementDefinitionContext) => ViewTemplate<Prefix> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="icon"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
};

/**
	* The template for the affixed (prefixed or suffixed) element.
	* For use with {@link PrefixOrSuffix}
	*
	* @param context
	* @public
	*/
export const prefixOrSuffixTemplate: (context: ElementDefinitionContext) => ViewTemplate<PrefixOrSuffix> =
	(context: ElementDefinitionContext) => {
		const iconTag = context.tagFor(Icon);

		const classes = ({
			iconTrailing,
		}: PrefixOrSuffix) => classNames(
			'icon',
			['icon-trailing', iconTrailing],
		);

		return html`<span class="${classes}"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
	};
