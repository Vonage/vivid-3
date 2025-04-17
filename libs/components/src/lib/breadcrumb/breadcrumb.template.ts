import { elements, html, slotted } from '@microsoft/fast-element';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Breadcrumb } from './breadcrumb';

export const breadcrumbTemplate = html<Breadcrumb>`
	<nav
		class="base"
		${delegateAria({
			ariaLabel: (x) => x.ariaLabel || 'breadcrumbs',
		})}
	>
		<div role="list" class="list">
			<slot
				${slotted({
					property: 'slottedBreadcrumbItems',
					filter: elements(),
				})}
			></slot>
		</div>
	</nav>
`;
