import {
	type Constructable,
	html,
	type ViewTemplate,
} from '@microsoft/fast-element';
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

			// Register dependencies before the component itself
			// Order is important when elements are upgraded as the component might rely on its dependencies being registered
			// at the time of upgrade
			for (const dependency of componentDefinition.dependencies) {
				registerComponent(dependency);
			}

			const tagByDependencyType = new Map([
				[componentDefinition.type, tag] as [Constructable, string],
				...componentDefinition.dependencies.map(
					(dependency) =>
						[dependency.type, prefixed(dependency.name)] as [
							Constructable,
							string
						]
				),
			]);

			const elementDefinitionContext = {
				tagFor(type: Constructable) {
					if (!tagByDependencyType.has(type)) {
						throw new Error(
							`Could not get tag for ${type.name} as it is not a dependency of ${componentDefinition.name}.`
						);
					}
					return html.partial(tagByDependencyType.get(type)!);
				},
				tagForNonDependency(name: string) {
					return prefixed(name);
				},
			};

			type.define({
				...componentDefinition.options,
				template: resolve(
					componentDefinition.template,
					elementDefinitionContext
				),
				name: `${prefix}-${componentDefinition.name}`,
			});
		};

		registerComponent(definition);
	};
