import type {
	Constructable,
	PartialFASTElementDefinition,
	ViewTemplate,
} from '@microsoft/fast-element';

export type TemplateOrResolveFn =
	| ViewTemplate
	| ((context: VividElementDefinitionContext) => ViewTemplate);

export type VividElementDefinitionContext = {
	/**
	 * Gets the prefixed tag name for a dependency.
	 */
	tagFor(type: Constructable): string;
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
	type: Constructable;
	template: TemplateOrResolveFn;
	dependencies: VividComponentDefinition[];
	options: Options;
};

export const defineVividComponent = (
	name: string,
	type: Constructable,
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
