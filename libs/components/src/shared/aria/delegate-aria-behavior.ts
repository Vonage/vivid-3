import type { ViewBehavior, ViewController } from '@microsoft/fast-element';
import { Observable, oneWay } from '@microsoft/fast-element';
import { AttributeBindingBehavior } from '../templating/attribute-binding-behaviour';
import {
	subscribeToAriaPropertyChanges,
	// unsubscribeFromAriaPropertyChanges,
} from './aria-change-subscription';
import type { DelegatesAriaElement } from './delegates-aria';
import {
	ariaAttributeName,
	type AriaMixinElement,
	type AriaPropertyName,
} from './aria-mixin';

type BoundValue = string | null | undefined | boolean | number;
type AriaBinding<T> = BoundValue | ((x: T) => BoundValue);

export type BoundAriaProperties<T> = Partial<{
	[Property in AriaPropertyName]: AriaBinding<T>;
}>;

export class DelegateAriaBehavior<T> implements ViewBehavior {
	private readonly boundProperties: BoundAriaProperties<T>;
	private readonly forwardedProperties: Set<AriaPropertyName>;
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
		this.forwardedProperties = params.forwardedProperties;
	}

	// private source: DelegatesAriaElement | null = null;

	bind(controller: ViewController) {
		const source = controller.source as DelegatesAriaElement;
		// this.source = source;

		// Don't override the target - use the one passed in constructor
		// The target should be the element that the directive is attached to
		// if (!this.target) {
		// 	throw new Error(
		// 		'Target element must be provided to DelegateAriaBehavior'
		// 	);
		// }

		this.bindPropertiesToTarget(source, this.boundProperties, this.target!);
		this.startForwardingPropertiesToTarget(
			source,
			this.forwardedProperties,
			this.target!
		);
	}

	// unbind() {
	// 	if (this.source === null) {
	// 		return;
	// 	}
	// 	this.releasePropertyBindings(this.source);
	// 	this.stopForwardingPropertiesToTarget(this.source);
	// 	this.source = null;
	// }

	private bindingBehaviours: AttributeBindingBehavior[] = [];

	private bindPropertiesToTarget(
		source: DelegatesAriaElement,
		boundProperties: BoundAriaProperties<T>,
		target: HTMLElement
	) {
		for (const [property, binding] of Object.entries(boundProperties) as [
			AriaPropertyName,
			AriaBinding<T>
		][]) {
			const bindingFn = binding instanceof Function ? binding : () => binding;

			this.bindingBehaviours.push(
				new AttributeBindingBehavior(
					target,
					oneWay(bindingFn),
					Observable.isVolatileBinding(bindingFn),
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

	// private releasePropertyBindings(source: DelegatesAriaElement) {
	// 	for (const behavior of this.bindingBehaviours) {
	// 		(behavior as any).unbind(); // TODO: fix type
	// 	}
	// 	this.bindingBehaviours = [];
	// }

	private startForwardingPropertiesToTarget(
		source: DelegatesAriaElement,
		delegatedProperties: Set<AriaPropertyName>,
		target: HTMLElement
	) {
		// Only forward properties that are NOT bound (bound properties take precedence)
		for (const key of delegatedProperties) {
			/* v8 ignore else -- @preserve */
			if (!(key in this.boundProperties)) {
				this.forwardPropertyToTarget(target, key, source[key]);
			}
		}

		subscribeToAriaPropertyChanges(
			source as AriaMixinElement,
			this.onSourceAriaPropertyChanged
		);
	}

	// private stopForwardingPropertiesToTarget(source: DelegatesAriaElement) {
	// 	unsubscribeFromAriaPropertyChanges(
	// 		source as AriaMixinElement,
	// 		this.onSourceAriaPropertyChanged
	// 	);
	// }

	private onSourceAriaPropertyChanged = (
		source: AriaMixinElement,
		property: AriaPropertyName
	) => {
		// Only forward properties that are NOT bound (bound properties take precedence)
		// Bound properties should never be forwarded, even when they change
		if (
			!this.forwardedProperties.has(property) ||
			property in this.boundProperties
		) {
			return;
		}

		this.forwardPropertyToTarget(this.target!, property, source[property]);
	};

	private forwardPropertyToTarget(
		target: HTMLElement,
		property: AriaPropertyName,
		value: BoundValue
	) {
		if (value === null || value === undefined || value === false) {
			target.removeAttribute(ariaAttributeName(property));
		} else {
			target.setAttribute(ariaAttributeName(property), String(value));
		}
	}
}
