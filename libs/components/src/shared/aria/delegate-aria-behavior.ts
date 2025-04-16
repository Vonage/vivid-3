import { type Behavior, DOM, Observable } from '@microsoft/fast-element';
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

type BoundValue = string | null | undefined | boolean | number;
type AriaBinding<T> = BoundValue | ((x: T) => BoundValue);

export type BoundAriaProperties<T> = Partial<{
	[Property in AriaPropertyName]: AriaBinding<T>;
}>;

export class DelegateAriaBehavior<T> implements Behavior {
	private readonly boundProperties: BoundAriaProperties<T>;
	private readonly forwardedProperties: Set<AriaPropertyName>;
	private readonly isMitigationDisabled: boolean;

	constructor(
		private target: HTMLElement,
		params: {
			boundProperties: BoundAriaProperties<T>;
			forwardedProperties: Set<AriaPropertyName>;
			disableAccessibilityMitigation: boolean;
		}
	) {
		this.boundProperties = params.boundProperties;
		this.forwardedProperties = params.forwardedProperties;
		this.isMitigationDisabled = params.disableAccessibilityMitigation;
	}

	bind(source: DelegatesAriaElement) {
		this.bindPropertiesToTarget(source, this.boundProperties, this.target);
		this.startForwardingPropertiesToTarget(
			source,
			this.forwardedProperties,
			this.target
		);
		this.mitigateAccessibilityIssues(source);
	}

	unbind(source: DelegatesAriaElement) {
		this.releasePropertyBindings(source);
		this.stopForwardingPropertiesToTarget(source);
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
			this.bindingBehaviours.push(
				new AttributeBindingBehavior(
					target,
					bindingFn,
					Observable.isVolatileBinding(bindingFn),
					ariaAttributeName(property)
				)
			);
		}
		source.$fastController.addBehaviors(this.bindingBehaviours);
	}

	private releasePropertyBindings(source: DelegatesAriaElement) {
		source.$fastController.removeBehaviors(this.bindingBehaviours);
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
		this.mitigateAccessibilityIssues(source);

		if (!this.forwardedProperties.has(property)) {
			return;
		}

		this.forwardPropertyToTarget(this.target, property, source[property]);
	};

	private forwardPropertyToTarget(
		target: HTMLElement,
		property: AriaPropertyName,
		value: BoundValue
	) {
		DOM.setAttribute(target, ariaAttributeName(property), value);
	}

	/**
	 * Sets role to presentation unless there are properties present that prohibit it.
	 * Using role="presentation" will cause non-global states or properties to be ignored.
	 * See: https://www.w3.org/TR/wai-aria-1.3/#conflict_resolution_presentation_none
	 */
	private mitigateAccessibilityIssues(source: AriaMixinElement) {
		if (this.isMitigationDisabled) {
			return;
		}

		const hasProhibitedProperties = Boolean(
			source.ariaLabel || source.ariaBrailleLabel || source.ariaChecked
		);
		if (hasProhibitedProperties) {
			source.removeAttribute('role');
		} else {
			source.setAttribute('role', 'presentation');
		}
	}
}
