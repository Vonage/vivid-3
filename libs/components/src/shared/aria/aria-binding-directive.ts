import {
	ariaAttributeName,
	type AriaIdrefsPropertyName,
	type AriaMixinElement,
	type AriaPropertyName,
	type AriaValuePropertyName,
} from './aria-mixin';
import {
	DOM,
	type DOMPolicy,
	HTMLBindingDirective,
	HTMLDirective,
	oneWay,
	StatelessAttachedAttributeDirective,
	type ViewBehavior,
	type ViewController,
} from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import {
	subscribeToAriaPropertyChanges,
	unsubscribeFromAriaPropertyChanges,
} from './aria-change-subscription';
import { IdrefsController } from './idrefs-controller';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

const setAriaAttribute = (
	target: HTMLElement,
	property: AriaPropertyName,
	value: unknown
) =>
	DOM.setAttribute(
		target,
		ariaAttributeName(property),
		value === false ? null : value // Allow false to remove the attribute
	);

type BoundValue = string | null | undefined | boolean | number;
type AriaBinding<T> = BoundValue | ((x: T) => BoundValue);

export type BoundAriaProperties<T> = Partial<{
	[Property in AriaPropertyName]: AriaBinding<T>;
}>;

type AriaBindingDirectiveOptions<T> = {
	/** Aria attributes set by the component template */
	boundProperties: BoundAriaProperties<T>;
	/** Value attributes forwarded from the host to the target */
	forwardedValueProperties: Set<AriaValuePropertyName>;
	/** Idrefs attributes forwarded from the host to the target */
	forwardedIdrefsProperties: Set<AriaIdrefsPropertyName>;
	/** Whether the directive must be used on the host */
	requireHost?: boolean;
};

/**
 * Directive for both delegate and host semantics.
 */
export class AriaBindingDirective<
	T,
> extends StatelessAttachedAttributeDirective<AriaBindingDirectiveOptions<T>> {
	// Properties that will be set on us
	targetNodeId?: string;
	policy?: DOMPolicy;

	// Lazily create HTMLBindingDirectives for bound properties
	private _propertyBindingBehaviours?: ViewBehavior[];
	private get propertyBindingBehaviours() {
		if (!this._propertyBindingBehaviours) {
			this._propertyBindingBehaviours = (
				Object.entries(this.options.boundProperties) as [
					AriaPropertyName,
					AriaBinding<T>,
				][]
			).map(([property, binding]) => {
				const bindingFn = binding instanceof Function ? binding : () => binding;

				const attributeBindingDirective = new HTMLBindingDirective(
					oneWay(bindingFn)
				);
				attributeBindingDirective.id = uniqueId();
				attributeBindingDirective.targetNodeId = this.targetNodeId!;
				attributeBindingDirective.policy = this.policy!;
				HTMLDirective.assignAspect(
					attributeBindingDirective,
					ariaAttributeName(property)
				);
				return attributeBindingDirective.createBehavior();
			});
		}

		return this._propertyBindingBehaviours!;
	}

	bind(controller: ViewController<AriaMixinElement>) {
		const source = controller.source;
		const target = controller.targets[this.targetNodeId!] as HTMLElement;

		if (this.options.requireHost && target !== source) {
			throw new Error('Target element must be the same as the source element');
		}

		for (const behaviour of this.propertyBindingBehaviours) {
			behaviour.bind(controller);
		}

		for (const key of this.options.forwardedValueProperties) {
			setAriaAttribute(target, key, source[key]);
		}

		const setIdrefElementsOnTarget = (property: AriaIdrefsPropertyName) => {
			(target as any)[`${property}Elements`] =
				IdrefsController.resolvedElements(source as VividElement, property);
		};

		for (const key of this.options.forwardedIdrefsProperties) {
			setIdrefElementsOnTarget(key);
		}

		const onAriaPropertyChange = (
			source: AriaMixinElement,
			property: AriaPropertyName
		) => {
			if (
				this.options.forwardedValueProperties.has(
					property as AriaValuePropertyName
				)
			) {
				setAriaAttribute(target, property, source[property]);
			}
			if (
				this.options.forwardedIdrefsProperties.has(
					property as AriaIdrefsPropertyName
				)
			) {
				setIdrefElementsOnTarget(property as AriaIdrefsPropertyName);
			}
		};
		subscribeToAriaPropertyChanges(source, onAriaPropertyChange);
		controller.onUnbind({
			unbind: () =>
				unsubscribeFromAriaPropertyChanges(source, onAriaPropertyChange),
		});
	}
}

HTMLDirective.define(AriaBindingDirective);
