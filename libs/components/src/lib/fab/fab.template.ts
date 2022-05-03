import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Fab } from './fab';

const getClasses = ({ }: Fab) => classNames(
	'control');

/**
 * The template for the {@link @microsoft/fast-foundation#Fab} component.
 *
 * @param context
 * @public
 */
export const FabTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Fab> = () => {
	return html`
	<vwc-elevation dp='8'>
		<div class="${getClasses}" exportparts="vvd-theme-alternate">
			<vwc-button 
				appearance='filled' 
				label=${(x) => x.label} 
				size='base-large' 
				icon=${(x) => x.icon} 
				icon-trailing=${(x) => x.iconTrailing}
				connotation=${(x) => x.connotation} 
				shape='pill'
				?disabled=${(x) => x.disabled}
				part="${(x) => x.disabled ? '' : 'vvd-theme-alternate'}">
			</vwc-button>
		</div>
	</vwc-elevation>`;
};
