import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {FoundationElementTemplate } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { BreadcrumbItem } from './breadcrumb-item';
import '../icon';
import '../anchor';

const getClasses = (_: BreadcrumbItem) =>
	classNames(
		'control',
	);

/**
 * The template for the {@link @microsoft/fast-foundation#BreadcrumbItem} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const BreadcrumbItemTemplate: FoundationElementTemplate<
ViewTemplate<BreadcrumbItem>
> = () => html`<div roll="listitem" part="listitem" class="${getClasses}">
  ${when(x => x.text && !x.href,
		html<BreadcrumbItem>`${x => x.text}`)}

  ${when(x => x.text && x.href && x.href.length > 0,
		html<BreadcrumbItem>`<vwc-anchor href="${x => x.href}">${x => x.text}</vwc-anchor>`)}

  ${when(x => x.separator && x.href, html<BreadcrumbItem>`<vwc-icon type="chevron-right-line"></vwc-icon>`)}
</div>`;
