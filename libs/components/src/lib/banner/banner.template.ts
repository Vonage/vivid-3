import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import '../button';
import {Connotation} from '../enums';
import type { Banner } from './banner';

export const connotationIconMap = new Map([
	[Connotation.Info, 'info-solid'],
	[Connotation.Announcement, 'megaphone-solid'],
	[Connotation.Success, 'check-circle-solid'],
	[Connotation.Warning, 'warning-solid'],
	[Connotation.Alert, 'error-solid']
]);

const getClasses = (_: Banner) => classNames(
	'control',
	[`${_.connotation}`, !!_.connotation]);

/**
 *
 */
function renderDismissButton() {
	return html<Banner>`
    <vwc-button
      class="dismiss-button"
      icon="close-line"
      @click="${x => x.dismissible = false}">
    </vwc-button>`;
}

/**
 * @param banner
 */
function getIcon(banner: Banner) {
	return banner.icon ? banner.icon : banner.connotation ? connotationIconMap.get(banner.connotation) : 'info-solid';
}

/**
 *
 */
function renderIcon() {
	return html<Banner>`
    <vwc-icon class="icon" type="${x => getIcon(x)}"></vwc-icon>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Banner} component.
 *
 * @param context
 * @public
 */
export const BannerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Banner> = () => html<Banner>`
      <div class="banner ${getClasses}" tabindex="0">
				<header class="header">
					<span class="user-content">
            ${renderIcon()}
						<div class="banner--message"
                 role="${x => x.role ? x.role : 'status'}"
                 aria-live="${x => x.ariaLive ? x.ariaLive : 'polite'}">
              ${x => x.message}
            </div>
					</span>
            ${when(x => x.dismissible, renderDismissButton())}
        </header>
      </div>
`;
