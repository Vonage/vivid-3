import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Divider } from './divider';

const getClasses = ({orientation}: Divider) => classNames(
	'base',
	[`${orientation}`, Boolean(orientation)],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Divider} component.
 *
 * @param definition
 * @public
 */
export const DividerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Divider> = () => html` 
  <span
  class="${getClasses}"
  	orientation="${(x) => x.orientation}"
  	role="${(x) => x.role}"
  ></span>`;
