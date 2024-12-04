import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Button } from '../button/button';
import type { Banner } from './banner';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

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

export const BannerTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const buttonTag = context.tagFor(Button);

	return html<Banner>`
		<div class="${getClasses}">
			<header class="header">
				<div class="content">
					${(x) => affixIconTemplate(x.conditionedIcon, IconWrapper.Slot)}
					<div
						class="banner-message"
						role="${(x) => (x.role ? x.role : 'status')}"
						aria-live="${(x) => (x.ariaLive ? x.ariaLive : 'polite')}"
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
