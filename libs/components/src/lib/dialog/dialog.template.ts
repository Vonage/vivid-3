import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import type { Dialog } from './dialog';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = ({
	iconPlacement,
	bodySlottedContent,
	footerSlottedContent,
	actionItemsSlottedContent,
	_openedAsModal,
}: Dialog) =>
	classNames(
		'base',
		[`icon-placement-${iconPlacement}`, Boolean(iconPlacement)],
		['hide-body', !bodySlottedContent?.length],
		[
			'hide-footer',
			!(footerSlottedContent?.length || actionItemsSlottedContent?.length),
		],
		['modal', _openedAsModal]
	);

function icon(iconTag: string) {
	return html<Dialog>`
		<${iconTag} class="icon" name="${(x) => x.icon}"></${iconTag}>
	`;
}

function headline() {
	return html<Dialog>` <div class="headline">${(x) => x.headline}</div> `;
}

function subtitle() {
	return html<Dialog>` <div class="subtitle">${(x) => x.subtitle}</div> `;
}

function renderDismissButton(buttonTag: string) {
	return html<Dialog>`
	<${buttonTag}
		aria-label="${(x) =>
			x.dismissButtonAriaLabel || x.locale.dialog.dismissButtonLabel}"
		size="condensed"
		class="dismiss-button"
		icon="close-line"
		@click="${(x) => x._handleCloseRequest()}"
	></${buttonTag}>`;
}

export const DialogTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const iconTag = context.tagFor(Icon);
	const buttonTag = context.tagFor(Button);

	return html<Dialog>`
	<${elevationTag} dp="8">
		<dialog class="${getClasses}"
				@keydown="${(x, c) => x._onKeyDown(c.event as KeyboardEvent)}"
				@cancel="${(_, c) => c.event.preventDefault()}"
				aria-label="${(x) => x.ariaLabel}"
				?aria-modal="${(x) => x._openedAsModal}"
		>
			<slot name="main">
				<div class="main-wrapper">
					<div class="header ${(x) => (x.subtitle ? 'border' : '')}">
							<slot name="graphic">
								${when((x) => x.icon, icon(iconTag))}
							</slot>
							${when((x) => x.headline, headline())}
							${when((x) => x.subtitle, subtitle())}
							${when((x) => x._showDismissButton, renderDismissButton(buttonTag))}
					</div>
					<div class="body ${(x) => (x.fullWidthBody ? 'full-width' : '')}" >
						<slot name="body" ${slotted('bodySlottedContent')}></slot>
					</div>
					<div class="footer">
						<div>
							<slot name="footer" ${slotted('footerSlottedContent')}></slot>
						</div>
						<div class="actions">
							<slot name="action-items" ${slotted('actionItemsSlottedContent')}></slot>
						</div>
					</div>
				</div>
			</slot>
		</dialog>
	</${elevationTag}>`;
};
