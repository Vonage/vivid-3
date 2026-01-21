import type {
	Constructable,
	InlineTemplateDirective,
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
	tagFor<T extends boolean = false>(
		type: Constructable,
		convertToString?: T
	): T extends true ? string : InlineTemplateDirective;
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
