import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {textAnchorTemplate} from '../text-anchor/text-anchor.template';
import type { BreadcrumbItem } from './breadcrumb-item';

const getClasses = (_: BreadcrumbItem) =>
	classNames(
		'control', 'breadcrumb-item'
	);

/**
 * The template for the {@link @microsoft/fast-foundation#BreadcrumbItem} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const BreadcrumbItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<BreadcrumbItem> =
  (context: ElementDefinitionContext, definition: FoundationElementDefinition) => html`
      <div roll="listitem" part="listitem" class="${getClasses}">
        ${when(x => x.text && !x.href,
		html<BreadcrumbItem>`${x => x.text}`)}

  ${when(x => x.text && x.href && x.href.length > 0,
		html<BreadcrumbItem>`${textAnchorTemplate(context, definition)}`)}

        ${when(x => x.separator,
		html<BreadcrumbItem>`<vwc-icon type="chevron-right-solid"></vwc-icon>`)}
      </div>`;
