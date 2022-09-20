import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import initials from 'initials';
import { classNames } from '@microsoft/fast-web-utilities';
import type { AvatarInitials } from './avatar-initials';


const getClasses = (_: AvatarInitials) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#Initials} component.

 * @param root0
 * @param root0.text
 */

const InitialTrim = ({
	text}: AvatarInitials) => {
	const theName = text;
	return initials(`${theName}`);
};

export const avatarInitialsTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AvatarInitials> = () => html`
	<abbr class="${getClasses}" title="${(x) => x.text}">${InitialTrim}</abbr>
`;


