import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { NavDisclosure } from './nav-disclosure';

function getAriaCurrent(ariaCurrent: string | null, open: boolean) {
	return ariaCurrent && !open;
}

const getClasses = ({ appearance, connotation }: NavDisclosure) =>
	classNames(
		'control',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`connotation-${connotation}`, Boolean(connotation)]
	);

/**
 * The template for the Nav component.
 *
 * @param context - element definition context
 * @public
 */
export const NavDisclosureTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<NavDisclosure> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html`<details class="base" ${ref('details')} ?open=${(x) => x.open}>
        <summary class="${getClasses}"
            role="button"
            aria-controls="disclosure-content"
			aria-expanded="${(x) => x.open}"
			?aria-current=${(x) => getAriaCurrent(x.ariaCurrent, x.open)}>
					${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
            ${(x) => x.label}
						<slot name="meta"></slot>
					<${iconTag} class="toggleIcon" name=${(x) =>
		x.open ? 'chevron-up-solid' : 'chevron-down-solid'}
											aria-hidden="true"></${iconTag}>
        </summary>
        <div class="content" id="disclosure-content">
			<slot></slot>
		</div>
    </details>
	`;
};
