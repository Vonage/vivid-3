import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import { Icon } from '../icon/icon';
import type { BreadcrumbItem } from './breadcrumb-item';

const getClasses = (_: BreadcrumbItem) =>
	classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#BreadcrumbItem} component.
 *
 * @param ElementDefinitionContext - ElementDefinitionContext - context element definition
 * @param FoundationElementDefinition - definition element foundation
 * @returns HTMLElement - template
 */
export const BreadcrumbItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<BreadcrumbItem> =
	(context: ElementDefinitionContext, definition: FoundationElementDefinition) => {
		const iconTag = context.tagFor(Icon);

		return html`
	<div role="listitem" class="${getClasses}">
		${when(x => x.text && !x.href,
		html<BreadcrumbItem>`${x => x.text}`)}

		${when(x => x.text && x.href && x.href.length > 0,
		html<BreadcrumbItem>`${textAnchorTemplate(context, definition)}`)}

		${when(x => x.separator,
		html<BreadcrumbItem>`<${iconTag} class="separator" name="chevron-right-solid"></${iconTag}>`)}
	</div>`;
	};