import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Initials } from './initials';

const getClasses = (_: Initials) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#Initials} component.

 */
const InitialTrim = ({
	text}: Initials) => {
	const theName = text;
	const initials = theName.split(' ')[0].charAt(0).toUpperCase() + theName.split(' ')[1].charAt(0).toUpperCase();
	return initials.toString();
};


export const InitialsTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Initials> = () => html`
	<abbr class="${getClasses}" title="${(x) => x.text}">${InitialTrim()}</abbr>
`;


