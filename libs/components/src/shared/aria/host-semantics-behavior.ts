import type { Behavior } from '@microsoft/fast-element';
import { AttributeBindingBehavior } from '../templating/attribute-binding-behaviour';
import { ariaAttributeName, type AriaPropertyName } from './aria-mixin';
import type { HostSemanticsElement } from './host-semantics';

type BoundValue = string | null | undefined | boolean | number;

type AriaBinding<T> = BoundValue | ((x: T) => BoundValue);

export type BoundAriaProperties<T> = Partial<{
	[Property in AriaPropertyName]: AriaBinding<T>;
}>;

export class HostSemanticsBehavior<T> implements Behavior {
	private readonly boundProperties: BoundAriaProperties<T>;

	constructor(
		private target: HTMLElement,
		params: {
			boundProperties: BoundAriaProperties<T>;
			forwardedProperties: Set<AriaPropertyName>;
		}
	) {
		this.boundProperties = params.boundProperties;
	}

	bind(source: HostSemanticsElement) {
		if (this.target !== source) {
			throw new Error('Target element must be the same as the source element');
		}
		this.bindPropertiesToTarget(source, this.boundProperties, this.target);
	}

	unbind(source: HostSemanticsElement) {
		this.releasePropertyBindings(source);
	}

	private bindingBehaviours: Behavior[] = [];

	private bindPropertiesToTarget(
		source: HostSemanticsElement,
		boundProperties: BoundAriaProperties<T>,
		target: HTMLElement
	) {
		for (const [property, binding] of Object.entries(boundProperties) as [
			AriaPropertyName,
			AriaBinding<T>
		][]) {
			const bindingFn =
				binding instanceof Function
					? binding
					: (x: any) => x[property] ?? binding;

			this.bindingBehaviours.push(
				new AttributeBindingBehavior(
					target,
					bindingFn,
					true,
					ariaAttributeName(property)
				)
			);
		}
		source.$fastController.addBehaviors(this.bindingBehaviours);
	}

	private releasePropertyBindings(source: HostSemanticsElement) {
		source.$fastController.removeBehaviors(this.bindingBehaviours);
		this.bindingBehaviours = [];
	}
}
