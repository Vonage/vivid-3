import {
	type Constructable,
	InlineTemplateDirective,
	type PartialFASTElementDefinition,
	type ViewTemplate,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

export type TemplateOrResolveFn =
	| ViewTemplate
	| ((context: VividElementDefinitionContext) => ViewTemplate);

export type VividElementDefinitionContext = {
	/**
	 * Gets the prefixed tag name for a dependency.
	 */
	tagFor(type: Constructable): InlineTemplateDirective;
	/**
	 * Gets the prefixed tag name without creating a dependency on the other element.
	 */
	tagForNonDependency(name: string): string;
};

export type Options = Pick<
	PartialFASTElementDefinition,
	'styles' | 'attributes' | 'shadowOptions' | 'elementOptions'
>;

export type VividComponentDefinition = {
	name: string;
	type: typeof VividElement;
	template: TemplateOrResolveFn;
	dependencies: VividComponentDefinition[];
	options: Options;
};

export const defineVividComponent = (
	name: string,
	type: typeof VividElement,
	template: TemplateOrResolveFn,
	dependencies: VividComponentDefinition[],
	options: Options
): VividComponentDefinition => ({
	name,
	type,
	template,
	dependencies,
	options,
});
