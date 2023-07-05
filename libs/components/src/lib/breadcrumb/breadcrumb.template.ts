import {elements, html, slotted} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {FoundationElementTemplate} from '@microsoft/fast-foundation';
import type {Breadcrumb} from './breadcrumb';

/**
 * The template for the Breadcrumb component.
 *
 * @param context - element definition context
 * @param definition
 * @public
 */
export const breadcrumbTemplate: FoundationElementTemplate<ViewTemplate<Breadcrumb>> = () => html`
	<nav aria-label="breadcrumbs" class="base">
    <div role="list" class="list">
      <slot
        ${slotted({
		property: 'slottedBreadcrumbItems',
		filter: elements()
	})}
      ></slot>
    </div>
	</nav>
`;
