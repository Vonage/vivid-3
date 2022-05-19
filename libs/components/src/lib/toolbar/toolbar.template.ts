import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Toolbar } from './toolbar';


const getClasses = ({
	connotation, appearance, shape,
}: Toolbar) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],

);

/**
 * The template for the {@link @microsoft/fast-foundation#Toolbar} component.
 *
 * @param context
 * @public
 */
export const ToolbarTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition

) => ViewTemplate<Toolbar> = () => html`
<div class="${getClasses}" part="${(x) => x.alternate ? 'vvd-theme-alternate' : ''}">
  <slot @slotchange="${x => x.handleContentChange()}" ></slot>
</div>`;

// part="vvd-theme-alternate"
