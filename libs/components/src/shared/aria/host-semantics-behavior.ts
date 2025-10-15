import type { ViewBehavior, ViewController } from '@microsoft/fast-element';
import { oneWay } from '@microsoft/fast-element';
import { AttributeBindingBehavior } from '../templating/attribute-binding-behaviour';
import { ariaAttributeName, type AriaPropertyName } from './aria-mixin';
import type { HostSemanticsElement } from './host-semantics';

type BoundValue = string | null | undefined | boolean | number;

type AriaBinding<T> = BoundValue | ((x: T) => BoundValue);

export type BoundAriaProperties<T> = Partial<{
	[Property in AriaPropertyName]: AriaBinding<T>;
}>;

export class HostSemanticsBehavior<T> implements ViewBehavior {
	private readonly boundProperties: BoundAriaProperties<T>;
	private target: HTMLElement | null = null;

	constructor(
		target: HTMLElement | null,
		params: {
			boundProperties: BoundAriaProperties<T>;
			forwardedProperties: Set<AriaPropertyName>;
		}
	) {
		this.target = target;
		this.boundProperties = params.boundProperties;
	}

	bind(controller: ViewController) {
		const source = controller.source as HostSemanticsElement;
		// if (!this.target) {
		// 	this.target = source as HTMLElement;
		// }
		if (this.target !== source) {
			throw new Error('Target element must be the same as the source element');
		}
		this.bindPropertiesToTarget(source, this.boundProperties, this.target);
	}

	// unbind(controller: ViewController) {
	// 	const source = controller.source as HostSemanticsElement;
	// 	this.releasePropertyBindings(source);
	// }

	private bindingBehaviours: ViewBehavior[] = [];

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
					oneWay(bindingFn),
					true,
					ariaAttributeName(property)
				)
			);
		}
		for (const behavior of this.bindingBehaviours) {
			(behavior as any).bind({
				source,
				context: source.$fastController.context,
			} as any);
		}
	}

	// private releasePropertyBindings(source: HostSemanticsElement) {
	// 	for (const behavior of this.bindingBehaviours) {
	// 		(behavior as any).unbind();
	// 	}
	// 	this.bindingBehaviours = [];
	// }
}
