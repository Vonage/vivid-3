import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconAriaHidden,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Banner } from './banner';

const getClasses = (_: Banner) =>
	classNames('control', [`connotation-${_.connotation}`, !!_.connotation]);

function renderDismissButton(buttonTag: string) {
	return html<Banner>`
	  <${buttonTag}
	  		aria-label="${(x) =>
					x.dismissButtonAriaLabel || x.locale.banner.dismissButtonLabel}"
			part="${(x) => (x.connotation === 'warning' ? '' : 'vvd-theme-alternate')}"
			size="condensed"
			class="dismiss-button"
			icon="close-line"
			@click="${(x) => x.remove()}">
	  </${buttonTag}>`;
}

const renderIcon = (c: VividElementDefinitionContext, x: Banner) => {
	const affixIconTemplate = affixIconTemplateFactory(c);
	const icon = x.conditionedIcon;
	const announcement =
		!x.icon && x.connotation
			? {
					label: x.locale.connotationAnnoncement[`${x.connotation}Icon`],
					announceOnUpdate: false,
			  }
			: undefined;

	return affixIconTemplate(
		icon,
		IconWrapper.Slot,
		IconAriaHidden.Hidden,
		announcement
	);
};

export const BannerTemplate = (context: VividElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);

	return html<Banner>`
		<div class="${getClasses}">
			<header class="header">
				<div class="content">
					${(x) => renderIcon(context, x)}
					<div
						class="banner-message"
						${delegateAria({
							role: (x) => (x.role ? x.role : 'status'),
							ariaLive: (x) => (x.ariaLive ? x.ariaLive : 'polite'),
						})}
					>
						${(x) => x.text}
					</div>
					<slot
						class="action-items"
						${slotted('actionItemsSlottedContent')}
						name="action-items"
					></slot>
				</div>

				${when((x) => x.removable, renderDismissButton(buttonTag))}
			</header>
		</div>
	`;
};
