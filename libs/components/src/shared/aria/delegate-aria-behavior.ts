import {
	DOM,
	Observable,
	oneWay,
	type ViewBehavior,
	type ViewController,
} from '@microsoft/fast-element';
import { AttributeBindingBehavior } from '../templating/attribute-binding-behaviour';
import {
	subscribeToAriaPropertyChanges,
	unsubscribeFromAriaPropertyChanges,
} from './aria-change-subscription';
import type { DelegatesAriaElement } from './delegates-aria';
import {
	ariaAttributeName,
	type AriaMixinElement,
	type AriaPropertyName,
} from './aria-mixin';

export type { AriaPropertyName };

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

	private source: DelegatesAriaElement | null = null;

	bind(controller: ViewController) {
		const source = controller.source as DelegatesAriaElement;
		this.source = source;

		// Set target if not already set
		if (!this.target) {
			this.target = source;
		}

		this.bindPropertiesToTarget(source, this.boundProperties, this.target);
		this.startForwardingPropertiesToTarget(
			source,
			this.forwardedProperties,
			this.target
		);
	}

	unbind() {
		if (this.source === null) {
			return;
		}
		this.releasePropertyBindings(this.source);
		this.stopForwardingPropertiesToTarget(this.source);
		this.source = null;
	}

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
			const behavior = new AttributeBindingBehavior(
				target,
				oneWay(bindingFn),
				Observable.isVolatileBinding(bindingFn),
				ariaAttributeName(property)
			);
			this.bindingBehaviours.push(behavior);
			// Bind the behavior directly to the source
			behavior.bind({ source, context: source.$fastController.context } as any);
		}
	}

	private releasePropertyBindings(source: DelegatesAriaElement) {
		for (const behavior of this.bindingBehaviours) {
			behavior.unbind();
		}
		this.bindingBehaviours = [];
	}

	private startForwardingPropertiesToTarget(
		source: DelegatesAriaElement,
		delegatedProperties: Set<AriaPropertyName>,
		target: HTMLElement
	) {
		for (const key of delegatedProperties) {
			this.forwardPropertyToTarget(target, key, source[key]);
		}

		subscribeToAriaPropertyChanges(source, this.onSourceAriaPropertyChanged);
	}

	private stopForwardingPropertiesToTarget(source: DelegatesAriaElement) {
		unsubscribeFromAriaPropertyChanges(
			source,
			this.onSourceAriaPropertyChanged
		);
	}

	private onSourceAriaPropertyChanged = (
		source: AriaMixinElement,
		property: AriaPropertyName
	) => {
		if (!this.forwardedProperties.has(property)) {
			return;
		}

		this.forwardPropertyToTarget(this.target!, property, source[property]);
	};

	private forwardPropertyToTarget(
		target: HTMLElement,
		property: AriaPropertyName,
		value: BoundValue
	) {
		DOM.setAttribute(target, ariaAttributeName(property), value);
	}
}
