import { html, InlineTemplateDirective, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import {
	affixIconTemplateFactory,
	IconAriaHidden,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Alert } from './alert';

const getClasses = ({ connotation }: Alert) =>
	classNames('base', [`connotation-${connotation}`, Boolean(connotation)]);

const getControlClasses = ({ open, placement, strategy }: Alert) =>
	classNames(
		'control',
		['open', open],
		[`placement-${placement}`, Boolean(placement)],
		[`strategy-${strategy}`, Boolean(strategy)]
	);

function renderIcon(c: VividElementDefinitionContext, x: Alert) {
	const affixIconTemplate = affixIconTemplateFactory(c);
	const icon = x.conditionedIcon;

	const announcement =
		!x.icon && x.connotation
			? {
					label: x.locale.connotationAnnoncement[`${x.connotation}Icon`],
					announceOnUpdate: true,
			  }
			: undefined;

	return affixIconTemplate(
		icon,
		IconWrapper.Slot,
		IconAriaHidden.Hidden,
		announcement
	);
}

function renderDismissButton(buttonTag: InlineTemplateDirective) {
	return html`
		<${buttonTag}
			aria-label="${(x) =>
				x.dismissButtonAriaLabel || x.locale.alert.dismissButtonLabel}"
			size="condensed"
			type="button"
			class="dismiss-button"
			icon="close-line"
			@click="${(x) => (x.open = false)}">
		</${buttonTag}>`;
}

export const AlertTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);

	return html<Alert>`
	<${elevationTag} class="elevation" dp='8' exportparts="vvd-theme-alternate">
		<div class="${getControlClasses}">
			<div
				part="vvd-theme-alternate"
				class="${getClasses}"
				role="alert"
				aria-hidden="${(x) => (x.open ? 'false' : 'true')}"
				${(x) => (!x.open ? 'hidden' : '')}
			>
				${(x) => renderIcon(context, x)}
				<div class="alert-text">
					${when((x) => x.headline, html`<h2 class="headline">${(x) => x.headline}</h2>`)}
					${when((x) => x.text, html`<div class="main-text">${(x) => x.text}</div>`)}
					<slot name="main"></slot>
				</div>
				<slot class="action-items" name="action-items"></slot>
				${when((x) => x.removable, renderDismissButton(buttonTag))}
			</div>
		</div>
	</${elevationTag}>
	`;
};
