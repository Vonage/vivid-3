import { elements, html, slotted } from '@microsoft/fast-element';

export const breadcrumbTemplate = html`
	<nav aria-label="breadcrumbs" class="base">
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
