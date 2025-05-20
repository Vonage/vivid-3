import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Dialog } from './dialog';

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
	return html<Dialog>` <h2 class="headline">${(x) => x.headline}</h2> `;
}

function subtitle() {
	return html<Dialog>` <h3 class="subtitle">${(x) => x.subtitle}</h3> `;
}

function renderHeaderText() {
	return html<Dialog>`
		<div class="header-text">${headline()} ${subtitle()}</div>
	`;
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
	<${elevationTag} dp="8" not-relative>
		<dialog class="${getClasses}"
				@keydown="${(x, c) => x._onKeyDown(c.event as KeyboardEvent)}"
				@cancel="${(_, c) => c.event.preventDefault()}"
				${delegateAria({
					ariaModal: (x) => String(x._openedAsModal),
				})}
		>
			<slot name="main">
				<div class="main-wrapper">
					<div class="header ${(x) => (x.subtitle ? 'border' : '')}">
							<slot name="graphic">
								${when((x) => x.icon, icon(iconTag))}
							</slot>
							${when((x) => x.headline && x.subtitle, renderHeaderText())}
							${when((x) => x.headline && !x.subtitle, headline())}
							${when((x) => x.subtitle && !x.headline, subtitle())}
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
