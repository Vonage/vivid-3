import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { BreadcrumbItem } from './breadcrumb-item';

const getClasses = ({
	text
}: BreadcrumbItem) =>
	classNames(
		'control',
		['text', Boolean(text)],
	);

/**
 * The template for the {@link @microsoft/fast-foundation#BreadcrumbItem} component.
 *
 * @param context
 * @public
 */
export const BreadcrumbItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<BreadcrumbItem> = () => html` <span class="${getClasses}"> </span>`;
