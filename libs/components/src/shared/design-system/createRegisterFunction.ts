import {
	type Constructable,
	FASTElementDefinition,
	html,
	type ViewTemplate,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import type {
	TemplateOrResolveFn,
	VividComponentDefinition,
	VividElementDefinitionContext,
} from './defineVividComponent';

function resolve(
	templateOrResolveFunction: TemplateOrResolveFn | undefined,
	ctx: VividElementDefinitionContext
): ViewTemplate | undefined {
	if (templateOrResolveFunction instanceof Function) {
		return templateOrResolveFunction(ctx);
	} else {
		return templateOrResolveFunction;
	}
}

// All tags that have been registered by this instance of the library
const registeredTags = new Set<string>();
// Map of registered class instances to the tag they were registered with
const tagByType = new Map<Constructable, string>();
// Global map of all registered component types to their tags
const globalTagByType = new Map<Constructable, string>();

/**
 * Creates a function that registers a component and its dependencies with the given prefix.
 */
export const createRegisterFunction =
	(definition: VividComponentDefinition) =>
	(prefix = 'vwc') => {
		const prefixed = (name: string) => `${prefix}-${name}`;

		const registerComponent = (
			componentDefinition: VividComponentDefinition
		) => {
			const tag = prefixed(componentDefinition.name);
			let type = componentDefinition.type;
			(type as typeof VividElement).componentName = componentDefinition.name;

			if (registeredTags.has(tag)) {
				// Component has already been registered
				return;
			} else if (tagByType.has(type) && tagByType.get(type) !== tag) {
				// This class instance is already registered with a different tag
				// Class instances can only be registered once. Therefore, we create an anonymous subclass to be able to
				// register it again.
				type = class extends type {};
			}
			registeredTags.add(tag);
			tagByType.set(type, tag);
			globalTagByType.set(type, tag);

			// Register dependencies before the component itself
			// Order is important when elements are upgraded as the component might rely on its dependencies being registered
			// at the time of upgrade
			for (const dependency of componentDefinition.dependencies) {
				registerComponent(dependency);
			}

			FASTElementDefinition.compose(type as Constructable<HTMLElement>, {
				...componentDefinition.options,
				template: resolve(componentDefinition.template, {
					// @ts-expect-error - expected to return a string
					tagFor(type: Constructable) {
						// First check if this type is registered globally
						if (globalTagByType.has(type)) {
							return html.partial(globalTagByType.get(type)!);
						}
						// If not found globally, check if it's a dependency of this component
						const dependency = componentDefinition.dependencies.find(
							(dep) => dep.type === type
						);
						if (dependency) {
							return prefixed(dependency.name);
						}
						throw new Error(
							`Could not get tag for ${type.name} as it is not registered or a dependency of ${componentDefinition.name}.`
						);
					},
					tagForNonDependency(name: string) {
						return prefixed(name);
					},
				}),
				name: `${prefix}-${componentDefinition.name}`,
			}).define();
		};

		registerComponent(definition);
	};
