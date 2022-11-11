import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Select } from './select';

const getClasses = (_: Select) => classNames(
	'control-base'
);

/**
 * The template for the {@link @microsoft/fast-foundation#Select} component.
 *
 * @param
 * @public
 */
export const SelectTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Select> = () => html`
	<div
	class="${getClasses}"
	>
		<div class="button-container">
			<div aria-hidden="true" class="indicator" >
				<vwc-icon type='chevron-up-solid'></vwc-icon>
			</div>
		</div>
		<div class="selected-value">
			the option that is selected
		</div>
		<vwc-listbox class="list-box">
			<slot></slot>
		</vwc-listbox>
</div>`;
