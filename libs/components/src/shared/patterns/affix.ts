import { attr, html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { Icon } from '../../lib/icon/icon';
import type { VividElementDefinitionContext } from '../design-system/defineVividComponent';

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
	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@attr({ mode: 'fromView' }) iconSlottedContent?: HTMLElement[];
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
	})
	iconTrailing = false;
}

export const IconWrapper = {
	Slot: false,
	Span: true,
};

export const IconAriaHidden = {
	Hidden: 'true',
	Visible: 'false',
};

type affixIconTemplateFactoryReturnType = (
	context: VividElementDefinitionContext
) => (
	icon?: string,
	slottedState?: boolean,
	ariaHidden?: string
) => ViewTemplate<AffixIcon> | null;
/**
 * The template for the prefixed element.
 * For use with {@link AffixIcon}
 *
 * @param context - element definition context
 * @public
 */
export const affixIconTemplateFactory: affixIconTemplateFactoryReturnType = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return (
		icon?: string,
		slottedState = IconWrapper.Span,
		ariaHidden = IconAriaHidden.Hidden
	) => {
		if (!icon && !slottedState) {
			return html`<slot
				name="icon"
				aria-hidden="${() => ariaHidden}"
				${slotted('iconSlottedContent')}
			></slot>`;
		}
		if (!icon && slottedState) {
			return null;
		}

		const iconTemplate = html`<${iconTag} :name="${() => icon}"></${iconTag}>`;

		return slottedState
			? html`<span class="icon" aria-hidden="${() => ariaHidden}"
					>${iconTemplate}</span
			  >`
			: html`<slot name="icon" aria-hidden="${() => ariaHidden}"
					>${iconTemplate}</slot
			  >`;
	};
};
